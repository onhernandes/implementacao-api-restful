const ProdutosNoCarrinho = require('./ProdutosNoCarrinho')
const ErroAPI = require('../../ErroAPI')

module.exports = async (cliente, sku, dados, cabecalhos) => {
  const instrucoes = {
    cliente,
    sku
  }
  const produtoExiste = await ProdutosNoCarrinho
    .findOne({ where: instrucoes })

  if (!produtoExiste) {
    const produto = Object.assign(
      {},
      dados,
      instrucoes
    )

    const dadosDeRetorno = await ProdutosNoCarrinho.create(produto)

    const dataModificacao = (new Date(dadosDeRetorno.updatedAt)).getTime()
    return {
      status: 201,
      dados: dadosDeRetorno,
      cabecalhos: {
        ETag: dadosDeRetorno.version,
        'Last-Modified': dataModificacao,
        Location: `/api/clientes/${cliente}/carrinho-de-compra/${sku}`
      }
    }
  }

  if (cabecalhos['if-match']) {
    if (parseInt(cabecalhos['if-match']) !== produtoExiste.version) {
      throw new ErroAPI(412, 'Pré-condição de versão não é válida', 3)
    }

    await ProdutosNoCarrinho.update(
      {
        quantidade: dados.quantidade
      },
      {
        where: instrucoes
      }
    )

    const dadosDeRetorno = await ProdutosNoCarrinho.findOne({ where: instrucoes })
    const ultimaModificacao = (new Date(dadosDeRetorno.updatedAt)).getTime()

    return {
      status: 200,
      dados: dadosDeRetorno,
      cabecalhos: {
        ETag: dadosDeRetorno.version,
        'Last-Modified': ultimaModificacao
      }
    }
  }

  if (cabecalhos['if-unmodified-since']) {
    const timestampUltimaModificacao = produtoExiste.updatedAt
    const seModificadoDesde = new Date(parseInt(cabecalhos['if-unmodified-since']))

    if (seModificadoDesde < timestampUltimaModificacao) {
      throw new ErroAPI(412, 'Pré-condição de versão não é válida', 3)
    }

    await ProdutosNoCarrinho.update(
      {
        quantidade: dados.quantidade
      },
      {
        where: instrucoes
      }
    )

    const dadosDeRetorno = await ProdutosNoCarrinho.findOne({ where: instrucoes })
    const ultimaModificacao = (new Date(dadosDeRetorno.updatedAt)).getTime()

    return {
      status: 200,
      dados: dadosDeRetorno,
      cabecalhos: {
        ETag: dadosDeRetorno.version,
        'Last-Modified': ultimaModificacao
      }
    }
  }

  throw new ErroAPI(409, 'Não foi especificado a ação que deverá ser tomada com as informações enviadas (se deve atualizar ou sobreescrever o que existe)', 4)
}
