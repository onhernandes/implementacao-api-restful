const roteador = require('express').Router({ mergeParams: true })

const listarProdutos = require('./listarProdutos')
roteador.get('/', (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  listarProdutos(requisicao.params.fornecedor, requisicao.query.categoria)
    .then(lista => {
      resposta.status(200)
      resposta.end(JSON.stringify(lista))
    })
    .catch(proximo)
})

roteador.head('/', (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  listarProdutos(requisicao.params.fornecedor, requisicao.query.categoria)
    .then(lista => {
      resposta.status(200)
      resposta.end()
    })
    .catch(proximo)
})

const criarProduto = require('./criarProduto')
roteador.post('/', (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  criarProduto(requisicao.params.fornecedor, requisicao.body)
    .then(produto => {
      resposta.setHeader('Location', `/api/fornecedores/${produto.fornecedor}/produtos/${produto.id}`)
      resposta.status(200)
      resposta.end(JSON.stringify(produto))
    })
    .catch(proximo)
})

const pegarProduto = require('./pegarProduto')
roteador.get('/:id', (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  pegarProduto(requisicao.params.fornecedor, requisicao.params.id)
    .then(produto => {
      const ultimaVezModificado = (new Date(produto.updatedAt)).getTime()
      resposta.setHeader('Last-Modified', ultimaVezModificado)
      resposta.setHeader('ETag', produto.version)
      resposta.status(200)
      resposta.end(JSON.stringify(produto))
    })
    .catch(proximo)
})

roteador.head('/:id', (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  pegarProduto(requisicao.params.fornecedor, requisicao.params.id)
    .then(produto => {
      const ultimaVezModificado = (new Date(produto.updatedAt)).getTime()
      resposta.setHeader('Last-Modified', ultimaVezModificado)
      resposta.setHeader('ETag', produto.version)
      resposta.status(200)
      resposta.end()
    })
    .catch(proximo)
})

const atualizarProduto = require('./atualizarProduto')
roteador.put('/:id', (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  atualizarProduto(requisicao.params.fornecedor, requisicao.params.id, requisicao.body)
    .then(produto => {
      resposta.status(204)
      resposta.end()
    })
    .catch(proximo)
})

const apagarProduto = require('./apagarProduto')
roteador.delete('/:id', (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  apagarProduto(requisicao.params.fornecedor, requisicao.params.id)
    .then(produto => {
      resposta.status(204)
      resposta.end()
    })
    .catch(proximo)
})

const diminuirEstoque = require('./diminuirEstoque')
roteador.post('/:id/diminuir-estoque', (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  diminuirEstoque(requisicao.params.fornecedor, requisicao.params.id)
    .then(produto => {
      resposta.status(204)
      resposta.end()
    })
    .catch(proximo)
})

module.exports = roteador
