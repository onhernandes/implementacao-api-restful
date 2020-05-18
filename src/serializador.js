const Fornecedor = require('./endpoints/fornecedores/Fornecedor')
const Produto = require('./endpoints/fornecedores/produtos/Produto')
const jsontoxml = require('jsontoxml')

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
  let tagRaiz = 'items'
  let tagItem = 'item'

  const item = Array.isArray(dados) ? dados[0] : dados

  if (item instanceof Fornecedor) {
    tagRaiz = 'fornecedores'
    tagItem = 'fornecedor'
  }

  if (item instanceof Produto) {
    tagRaiz = 'produtos'
    tagItem = 'produto'
  }

  if (Array.isArray(dados)) {
    dados = dados.map(item => validar(item, camposExtras))
  } else {
    dados = validar(dados, camposExtras)
  }
  return jsontoxml({
    [tagRaiz]: dados.map(item => ({ [tagItem]: item }))
  })
}

module.exports = {
  'application/json': json,
  'application/xml': xml
}
