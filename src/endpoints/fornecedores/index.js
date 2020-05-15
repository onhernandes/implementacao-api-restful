const roteador = require('express').Router()
const Fornecedor = require('./Fornecedor')
const TabelaFornecedor = require('./TabelaFornecedor')

roteador.get('/:fornecedor', async (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  try {
    const fornecedor = new Fornecedor({ id: requisicao.params.fornecedor })
    await fornecedor.carregar()

    resposta.status(200)
    const ultimaVezModificado = (new Date(fornecedor.updatedAt)).getTime()
    resposta.setHeader('Last-Modified', ultimaVezModificado)
    resposta.setHeader('ETag', fornecedor.version)
    resposta.end(JSON.stringify(fornecedor))
  } catch (e) {
    proximo(e)
  }
})

roteador.head('/:fornecedor', async (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  try {
    const fornecedor = new Fornecedor({ id: requisicao.params.fornecedor })
    await fornecedor.carregar()
    resposta.status(200)
    const ultimaVezModificado = (new Date(fornecedor.updatedAt)).getTime()
    resposta.setHeader('Last-Modified', ultimaVezModificado)
    resposta.setHeader('ETag', fornecedor.version)
    resposta.end()
  } catch (e) {
    proximo(e)
  }
})

roteador.post('/', async (requisicao, resposta, proximo) => {
  try {
    const fornecedor = new Fornecedor(requisicao.body)
    await fornecedor.criar()

    resposta.status(201)
    resposta.setHeader('Location', `/api/fornecedores/${fornecedor.id}`)
    resposta.setHeader('Content-Type', 'application/json')
    resposta.setHeader('ETag', fornecedor.version)
    resposta.end(JSON.stringify(fornecedor))
  } catch (e) {
    proximo(e)
  }
})

roteador.get('/', async (requisicao, resposta, proximo) => {
  try {
    const lista = await TabelaFornecedor.listar(requisicao.query.categoria)
    resposta.status(200)
    resposta.setHeader('Content-Type', 'application/json')
    resposta.end(JSON.stringify(lista))
  } catch (e) {
    proximo(e)
  }
})

roteador.head('/', async (requisicao, resposta, proximo) => {
  try {
    resposta.status(200)
    resposta.setHeader('Content-Type', 'application/json')
    resposta.end()
  } catch (e) {
    proximo(e)
  }
})

roteador.put('/:fornecedor', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.fornecedor
    const dados = Object.assign({}, requisicao.body, { id })
    const fornecedor = new Fornecedor(dados)
    await fornecedor.atualizar()
    await fornecedor.carregar()

    resposta.setHeader('Content-Type', 'application/json')
    const ultimaVezModificado = (new Date(fornecedor.updatedAt)).getTime()
    resposta.setHeader('Last-Modified', ultimaVezModificado)
    resposta.setHeader('ETag', fornecedor.version)
    resposta.status(204)
    resposta.end()
  } catch (e) {
    proximo(e)
  }
})

roteador.delete('/:fornecedor', async (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  try {
    const id = requisicao.params.fornecedor
    const fornecedor = new Fornecedor({ id })
    await fornecedor.remover()
    resposta.status(204)
    resposta.end()
  } catch (e) {
    proximo(e)
  }
})

const verificarFornecedor = require('./verificarSeExisteMiddleware')

const roteadorProdutos = require('./produtos')
roteador.use('/:fornecedor/produtos', verificarFornecedor, roteadorProdutos)

module.exports = roteador
