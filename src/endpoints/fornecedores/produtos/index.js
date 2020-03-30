const roteador = require('express').Router()

const listarProdutos = require('./listarProdutos')
roteador.get('/', (requisicao, resposta) => {
  listarProdutos(requisicao.params.fornecedor, requisicao.query.categoria)
    .then(lista => {
      resposta.status(200)
      resposta.end(JSON.stringify(lista))
    })
})
/*
roteador.head('/', listarProdutos)

const criarProduto = require('./criarProduto')
roteador.post('/', criarProduto)

const pegarProduto = require('./pegarProduto')
roteador.get('/:id', pegarProduto)
roteador.head('/:id', pegarProduto)

const atualizarProduto = require('./atualizarProduto')
roteador.put('/:id', atualizarProduto)

const apagarProduto = require('./apagarProduto')
roteador.delete('/:id', apagarProduto)

const diminuirEstoque = require('./diminuirEstoque')
roteador.post('/:id/diminuir-estoque', diminuirEstoque)
*/

module.exports = roteador
