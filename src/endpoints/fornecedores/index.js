const roteador = require('express').Router()

const pegarFornecedor = require('./pegarFornecedor')
const verificarFornecedor = (requisicao, resposta, proximo) => {
  pegarFornecedor(requisicao.params.fornecedor)
    .then(fornecedor => {
      proximo()
    })
    .catch(proximo)
}

roteador.get('/:fornecedor', (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  pegarFornecedor(requisicao.params.fornecedor)
    .then(fornecedor => {
      resposta.status(200)
      const ultimaVezModificado = (new Date(fornecedor.updatedAt)).getTime()
      resposta.setHeader('Last-Modified', ultimaVezModificado)
      resposta.setHeader('ETag', fornecedor.version)
      resposta.end(JSON.stringify(fornecedor))
    })
    .catch(proximo)
})

roteador.head('/:fornecedor', (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  pegarFornecedor(requisicao.params.fornecedor)
    .then(fornecedor => {
      resposta.status(200)
      const ultimaVezModificado = (new Date(fornecedor.updatedAt)).getTime()
      resposta.setHeader('Last-Modified', ultimaVezModificado)
      resposta.setHeader('ETag', fornecedor.version)
      resposta.end()
    })
    .catch(proximo)
})

const criarFornecedor = require('./criarFornecedor')
roteador.post('/', (requisicao, resposta) => {
  criarFornecedor(requisicao.body)
    .then(fornecedor => {
      resposta.status(201)
      resposta.setHeader('Location', `/api/fornecedores/${fornecedor.id}`)
      resposta.setHeader('Content-Type', 'application/json')
      resposta.end(JSON.stringify(fornecedor))
    })
})

const listarFornecedores = require('./listarFornecedores')
roteador.get('/', (requisicao, resposta) => {
  listarFornecedores()
    .then(lista => {
      resposta.status(200)
      resposta.setHeader('Content-Type', 'application/json')
      resposta.end(JSON.stringify(lista))
    })
})

roteador.head('/', (requisicao, resposta) => {
  listarFornecedores()
    .then(lista => {
      resposta.status(200)
      resposta.setHeader('Content-Type', 'application/json')
      resposta.end()
    })
})

const atualizarFornecedor = require('./atualizarFornecedor')
roteador.put('/:fornecedor', verificarFornecedor, (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  atualizarFornecedor(requisicao.params.fornecedor, requisicao.body)
    .then(fornecedor => {
      resposta.setHeader('Content-Type', 'application/json')
      resposta.status(204)
      resposta.end()
    })
    .catch(proximo)
})

const apagarFornecedor = require('./apagarFornecedor')
roteador.delete('/:fornecedor', verificarFornecedor, (requisicao, resposta, proximo) => {
  resposta.setHeader('Content-Type', 'application/json')

  apagarFornecedor(requisicao.params.fornecedor)
    .then(fornecedor => {
      resposta.status(204)
      resposta.end()
    })
    .catch(proximo)
})

const roteadorProdutos = require('./produtos')
roteador.use('/:fornecedor/produtos', verificarFornecedor, roteadorProdutos)

module.exports = roteador
