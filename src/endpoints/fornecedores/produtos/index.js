const roteador = require('express').Router({ mergeParams: true })
const TabelaProduto = require('./TabelaProduto.js')
const Produto = require('./Produto')
const { SerializadorProduto } = require('../../../serializador')

roteador.get('/', async (requisicao, resposta, proximo) => {
  try {
    let lista = await TabelaProduto.listar(
      requisicao.fornecedor
    )

    lista = lista.map(produto => {
      const dadosDoProduto = Object.assign(produto, { fornecedor: requisicao.fornecedor })
      return new Produto(dadosDoProduto)
    })

    resposta.status(200)

    const contentType = resposta.getHeader('Content-Type')
    const serializador = new SerializadorProduto(contentType)
    const dadosDaResposta = serializador.serializar(lista)

    resposta.end(dadosDaResposta)
  } catch (e) {
    proximo(e)
  }
})

roteador.head('/', (requisicao, resposta, proximo) => {
  resposta.status(200)
  resposta.end()
})

roteador.post('/', async (requisicao, resposta, proximo) => {
  try {
    const fornecedor = requisicao.fornecedor
    const dados = Object.assign({}, requisicao.body, { fornecedor })
    const produto = new Produto(dados)
    await produto.criar()

    resposta.setHeader('Location', `/api/fornecedores/${fornecedor.id}/produtos/${produto.id}`)
    resposta.setHeader('ETag', produto.version)
    resposta.status(200)

    const contentType = resposta.getHeader('Content-Type')
    const serializador = new SerializadorProduto(contentType, ['preco', 'estoque'])
    const dadosDaResposta = serializador.serializar(produto)

    resposta.end(dadosDaResposta)
  } catch (e) {
    proximo(e)
  }
})

roteador.get('/:id', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.id
    const fornecedor = requisicao.fornecedor
    const produto = new Produto({ id, fornecedor })
    await produto.carregar()

    const ultimaVezModificado = (new Date(produto.updatedAt)).getTime()
    resposta.setHeader('Last-Modified', ultimaVezModificado)
    resposta.setHeader('ETag', produto.version)
    resposta.status(200)

    const contentType = resposta.getHeader('Content-Type')
    const serializador = new SerializadorProduto(contentType, ['preco', 'estoque'])
    const dadosDaResposta = serializador.serializar(produto)

    resposta.end(dadosDaResposta)
  } catch (e) {
    proximo(e)
  }
})

roteador.head('/:id', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.id
    const fornecedor = requisicao.fornecedor
    const produto = new Produto({ id, fornecedor })
    await produto.carregar()

    const ultimaVezModificado = (new Date(produto.updatedAt)).getTime()
    resposta.setHeader('Last-Modified', ultimaVezModificado)
    resposta.setHeader('ETag', produto.version)
    resposta.status(200)
    resposta.end()
  } catch (e) {
    proximo(e)
  }
})

roteador.put('/:id', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.id
    const fornecedor = requisicao.fornecedor
    const dados = Object.assign({}, requisicao.body, { id, fornecedor })
    const produto = new Produto(dados)
    await produto.atualizar()
    resposta.status(204)
    const ultimaVezModificado = (new Date(produto.updatedAt)).getTime()
    resposta.setHeader('Last-Modified', ultimaVezModificado)
    resposta.setHeader('ETag', produto.version)
    resposta.end()
  } catch (e) {
    proximo(e)
  }
})

roteador.delete('/:id', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.id
    const fornecedor = requisicao.fornecedor
    const produto = new Produto({ id, fornecedor })
    await produto.remover()
    resposta.status(204)
    resposta.end()
  } catch (e) {
    proximo(e)
  }
})

roteador.post('/:id/diminuir-estoque', async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.id
    const fornecedor = requisicao.fornecedor
    const produto = new Produto({ id, fornecedor })
    await produto.diminuirEstoque()
    resposta.status(204)
    resposta.end()
  } catch (e) {
    proximo(e)
  }
})

module.exports = roteador
