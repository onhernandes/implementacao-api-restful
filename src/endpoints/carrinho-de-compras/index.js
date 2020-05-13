const roteador = require('express').Router()

const inserirOuAtualizarProduto = require('./inserirOuAtualizarProduto')
roteador.put('/:cliente/carrinho-de-compras/:sku', (requisicao, resposta, proximo) => {
  requisicao.setHeader('Content-Type', 'application/json')
  const cliente = requisicao.params.cliente
  const sku = requisicao.params.sku
  const corpoDaRequisicao = requisicao.body
  const cabecalhosDaRequisicao = requisicao.headers

  inserirOuAtualizarProduto(cliente, sku, corpoDaRequisicao, cabecalhosDaRequisicao)
    .then(({ status, dados, cabecalhos }) => {
      resposta.status(status)

      Object
        .keys(cabecalhos)
        .forEach(nome => {
          const valor = cabecalhos[nome]
          resposta.setHeader(nome, valor)
        })

      resposta.end(JSON.stringify(dados))
    })
    .catch(proximo)
})

const listarProdutosDoCarrinho = require('./listarProdutosDoCarrinho')
roteador.get('/:cliente/carrinho-de-compras', (requisicao, resposta, proximo) => {
  requisicao.setHeader('Content-Type', 'application/json')
  listarProdutosDoCarrinho(requisicao.params.cliente)
    .then(lista => {
      resposta.status(200)
      const json = JSON.stringify(lista)
      resposta.end(json)
    })
    .catch(proximo)
})

const removerProdutoDoCarrinho = require('./removerProdutoDoCarrinho')
roteador.delete('/:cliente/carrinho-de-compras/:sku', (requisicao, resposta, proximo) => {
  requisicao.setHeader('Content-Type', 'application/json')
  const cliente = requisicao.params.cliente
  const sku = requisicao.params.sku

  removerProdutoDoCarrinho(cliente, sku)
    .then(() => {
      resposta.status(204)
      resposta.end()
    })
    .catch(proximo)
})

module.exports = roteador
