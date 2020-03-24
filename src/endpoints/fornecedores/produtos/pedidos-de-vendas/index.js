const roteador = require('koa-router')()

const listarPedidos = require('./listarPedidos')
roteador.get('/', listarPedidos)
roteador.head('/', listarPedidos)

const criarPedido = require('./criarPedido')
roteador.post('/', criarPedido)

const pegarPedido = require('./pegarPedido')
roteador.get('/:id', pegarPedido)
roteador.head('/:id', pegarPedido)

const atualizarPedido = require('./atualizarPedido')
roteador.put('/:id', atualizarPedido)

roteador.post('/:id/enviar-email', contexto => {
  contexto.status = 202
  contexto.body = 'E-mail será enviado em breve!'
})

module.exports = roteador
