const roteador = require('express').Router()
const Fornecedor = require('./Fornecedor')
const TabelaFornecedor = require('./TabelaFornecedor')
const { SerializadorFornecedor } = require('../../serializador')

roteador.get('/', async (requisicao, resposta, proximo) => {
  try {
    let lista = await TabelaFornecedor.listar(requisicao.query.categoria)
    lista = lista.map(fornecedor => new Fornecedor(fornecedor))
    resposta.status(200)

    const contentType = resposta.getHeader('Content-Type')
    const serializador = new SerializadorFornecedor(contentType)
    const dadosDaResposta = serializador.serializar(lista)

    resposta.send(dadosDaResposta)
  } catch (e) {
    proximo(e)
  }
})

module.exports = roteador
