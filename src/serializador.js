const Fornecedor = require('./endpoints/fornecedores/Fornecedor')
const Produto = require('./endpoints/fornecedores/produtos/Produto')

const filtrarObjeto = (camposPublicos, dados) => {
  const camposFiltrados = {}

  camposPublicos.forEach(campo => {
    const possuiCampo = Object
      .prototype
      .hasOwnProperty
      .apply(dados, [campo])

    if (possuiCampo) {
      camposFiltrados[campo] = dados[campo]
    }
  })

  return camposFiltrados
}

const filtrarFornecedor = (fornecedor, camposExtras) => {
  let camposPublicos = [
    'id',
    'empresa',
    'categoria'
  ]

  if (Array.isArray(camposExtras)) {
    camposPublicos = camposPublicos.concat(camposExtras)
  }

  return filtrarObjeto(camposPublicos, fornecedor)
}

const filtrarProduto = (produto, camposExtras) => {
  let camposPublicos = [
    'id',
    'titulo',
    'categoria',
    'fornecedor'
  ]

  if (Array.isArray(camposExtras)) {
    camposPublicos = camposPublicos.concat(camposExtras)
  }

  return filtrarObjeto(camposPublicos, produto)
}

const validar = (dados, camposExtras) => {
  if (dados instanceof Fornecedor) {
    dados = filtrarFornecedor(dados, camposExtras)
  }

  if (dados instanceof Produto) {
    dados = filtrarProduto(dados, camposExtras)
  }

  return dados
}

const json = (dados, camposExtras) => {
  if (Array.isArray(dados)) {
    dados = dados.map(item => validar(item, camposExtras))
  } else {
    dados = validar(dados, camposExtras)
  }
  return JSON.stringify(dados)
}

const xml = (dados, camposExtras) => {
  dados = validar(dados, camposExtras)
}

module.exports = {
  'application/json': json,
  'application/xml': xml
}
