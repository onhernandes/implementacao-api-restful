const roteador = require('koa-router')({ prefix: '/api/fornecedores' })

const criarFornecedor = require('./criarFornecedor')
roteador.post('/', criarFornecedor)

const listarFornecedores = require('./listarFornecedores')
roteador.get('/', listarFornecedores)
roteador.head('/', listarFornecedores)

const pegarFornecedor = require('./pegarFornecedor')
roteador.get('/:id', pegarFornecedor)
roteador.head('/:id', pegarFornecedor)

const atualizarFornecedor = require('./atualizarFornecedor')
roteador.put('/:id', atualizarFornecedor)

const apagarFornecedor = require('./apagarFornecedor')
roteador.delete('/:id', apagarFornecedor)

const roteadorProdutos = require('./produtos')
roteador.use('/:fornecedor/produtos', roteadorProdutos.routes())

module.exports = roteador
