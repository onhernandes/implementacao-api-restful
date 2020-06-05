const jsontoxml = require('jsontoxml')

class Serializador {
  filtrarObjeto (item) {
    const camposFiltrados = {}

    this.camposPublicos.forEach(campo => {
      const possuiCampo = Object
        .prototype
        .hasOwnProperty
        .apply(item, [campo])

      if (possuiCampo) {
        camposFiltrados[campo] = item[campo]
      }
    })

    return camposFiltrados
  }

  filtrar (dadosParaSerializar) {
    if (Array.isArray(dadosParaSerializar)) {
      dadosParaSerializar = dadosParaSerializar.map(item => this.filtrarObjeto(item))
    } else {
      dadosParaSerializar = this.filtrarObjeto(dadosParaSerializar)
    }

    return dadosParaSerializar
  }

  json (dadosParaSerializar) {
    dadosParaSerializar = this.filtrar(dadosParaSerializar)

    return JSON.stringify(dadosParaSerializar)
  }

  xml (dadosParaSerializar) {
    dadosParaSerializar = this.filtrar(dadosParaSerializar)

    if (Array.isArray(dadosParaSerializar)) {
      return jsontoxml({
        [this.tagPlural]: dadosParaSerializar.map(item => ({ [this.tagSingular]: item }))
      })
    }

    return jsontoxml({
      [this.tagSingular]: dadosParaSerializar
    })
  }

  serializar (dadosParaSerializar) {
    if (this.contentType === 'application/json') {
      return this.json(dadosParaSerializar)
    }

    if (this.contentType === 'application/xml') {
      return this.xml(dadosParaSerializar)
    }
  }
}

class SerializadorFornecedor extends Serializador {
  constructor (contentType, camposExtras) {
    super()
    this.tagPlural = 'fornecedores'
    this.tagSingular = 'fornecedor'
    this.camposPublicos = [
      'id',
      'empresa',
      'categoria'
    ].concat(camposExtras || [])
    this.contentType = contentType
  }
}

class SerializadorProduto extends Serializador {
  constructor (contentType, camposExtras) {
    super()
    this.tagPlural = 'produtos'
    this.tagSingular = 'produto'
    this.camposPublicos = [
      'id',
      'titulo',
      'categoria'
    ].concat(camposExtras || [])
    this.contentType = contentType
  }
}

class SerializadorErro extends Serializador {
  constructor (contentType, camposExtras) {
    super()
    this.tagPlural = 'erros'
    this.tagSingular = 'erro'
    this.camposPublicos = [
      'idErro',
      'mensagem'
    ].concat(camposExtras || [])
    this.contentType = contentType
  }
}

module.exports = {
  SerializadorFornecedor,
  SerializadorProduto,
  SerializadorErro,
  formatosAceitos: [
    'application/json',
    'application/xml'
  ]
}
