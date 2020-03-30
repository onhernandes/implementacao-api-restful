const roteador = require('express').Router()

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
      resposta.end(JSON.stringify(lista))
    })
})

roteador.head('/', (requisicao, resposta) => {
  listarFornecedores()
    .then(lista => {
      resposta.status(200)
      resposta.end()
    })
})

const pegarFornecedor = require('./pegarFornecedor')
roteador.get('/:id', (requisicao, resposta) => {
  pegarFornecedor(requisicao.params.id)
    .then(fornecedor => {
      if (!fornecedor) {
        resposta.status(404)
        resposta.end(JSON.stringify({
          id: 0,
          description: 'Fornecedor não encontrado!'
        }))
        return
      }

      resposta.status(200)

      const ultimaVezModificado = (new Date(fornecedor.updatedAt)).getTime()
      resposta.setHeader('Last-Modified', ultimaVezModificado)
      resposta.setHeader('ETag', fornecedor.version)
      resposta.end(JSON.stringify(fornecedor))
    })
})
roteador.head('/:id', (requisicao, resposta) => {
  pegarFornecedor(requisicao.params.id)
    .then(fornecedor => {
      if (!fornecedor) {
        resposta.status(404)
        resposta.end(JSON.stringify({
          id: 0,
          description: 'Fornecedor não encontrado!'
        }))
        return
      }

      resposta.status(200)

      const ultimaVezModificado = (new Date(fornecedor.updatedAt)).getTime()
      resposta.setHeader('Last-Modified', ultimaVezModificado)
      resposta.setHeader('ETag', fornecedor.version)
      resposta.end(JSON.stringify(fornecedor))
    })
})

const atualizarFornecedor = require('./atualizarFornecedor')
roteador.put('/:id', (requisicao, resposta) => {
  atualizarFornecedor(requisicao.params.id, requisicao.body)
    .then(fornecedor => {
      if (!fornecedor) {
        resposta.status(404)
        resposta.end(JSON.stringify({
          id: 0,
          description: 'Fornecedor não encontrado!'
        }))
        return
      }

      resposta.status(204)
      resposta.end()
    })
})

const apagarFornecedor = require('./apagarFornecedor')
roteador.delete('/:id', (requisicao, resposta) => {
  apagarFornecedor(requisicao.params.id)
    .then(fornecedor => {
      if (!fornecedor) {
        resposta.status(404)
        resposta.end(JSON.stringify({
          id: 0,
          description: 'Fornecedor não encontrado!'
        }))
        return
      }

      resposta.status(204)
      resposta.end()
    })
})

/*
const roteadorProdutos = require('./produtos')
roteador.use('/:fornecedor/produtos', roteadorProdutos.routes())
*/

module.exports = roteador
