const roteador = require('koa-router')({ prefix: '/api/clientes' })

const inserirOuAtualizarProduto = require('./inserirOuAtualizarProduto')
roteador.put('/:cliente/carrinho-de-compras/:sku', inserirOuAtualizarProduto)

const removerProdutoDoCarrinho = require('./removerProdutoDoCarrinho')
roteador.delete('/:cliente/carrinho-de-compras/:sku', removerProdutoDoCarrinho)

const listarProdutosDoCarrinho = require('./listarProdutosDoCarrinho')
roteador.delete('/:cliente/carrinho-de-compras', listarProdutosDoCarrinho)

module.exports = roteador
