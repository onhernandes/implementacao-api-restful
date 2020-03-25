module.exports = async contexto => {
  const ProdutosNoCarrinho = contexto.db.model('produtos_carrinho')
  const instrucoes = {
    cliente: contexto.params.cliente,
    sku: contexto.params.sku
  }
  const produtoExiste = await ProdutosNoCarrinho
    .findOne({ where: instrucoes })

  if (!produtoExiste) {
    const produto = Object.assign(
      {},
      contexto.request.body,
      instrucoes
    )

    contexto.status = 201
    contexto.body = await ProdutosNoCarrinho.create(produto)
    contexto.set('etag', contexto.body.version)
    const dataModificacao = (new Date(contexto.body.updatedAt)).getTime()
    contexto.set('Last-Modified', dataModificacao)
    const cliente = contexto.params.cliente
    const sku = contexto.params.sku
    contexto.set('Location', `/api/clientes/${cliente}/carrinho-de-compra/${sku}`)
    return
  }

  const cabecalhos = contexto.request.headers

  if (cabecalhos['if-match']) {
    if (parseInt(cabecalhos['if-match']) !== produtoExiste.version) {
      contexto.status = 412
      contexto.body = {
        id: 3,
        description: 'Pré-condição de versão não é válida'
      }
      return
    }

    await ProdutosNoCarrinho.update(
      {
        quantidade: contexto.request.body.quantidade
      },
      {
        where: instrucoes
      }
    )

    contexto.status = 200
    contexto.body = await ProdutosNoCarrinho.findOne({ where: instrucoes })
    contexto.set('etag', contexto.body.version)
    const ultimaModificacao = (new Date(contexto.body.updatedAt)).getTime()
    contexto.set('Last-Modified', ultimaModificacao)
    return
  }

  if (cabecalhos['if-unmodified-since']) {
    const timestampUltimaModificacao = produtoExiste.updatedAt
    const seModificadoDesde = new Date(parseInt(cabecalhos['if-unmodified-since']))
    if (seModificadoDesde < timestampUltimaModificacao) {
      contexto.status = 412
      contexto.body = {
        id: 3,
        description: 'Pré-condição de versão não é válida'
      }
      return
    }

    await ProdutosNoCarrinho.update(
      {
        quantidade: contexto.request.body.quantidade
      },
      {
        where: instrucoes
      }
    )

    contexto.status = 200
    contexto.body = await ProdutosNoCarrinho.findOne({ where: instrucoes })
    contexto.set('etag', contexto.body.version)
    const ultimaModificacao = (new Date(contexto.body.updatedAt)).getTime()
    contexto.set('Last-Modified', ultimaModificacao)
    return
  }

  contexto.status = 409
  contexto.body = {
    id: 4,
    description: 'Não foi especificado a ação que deverá ser tomada com as informações enviadas (se deve atualizar ou sobreescrever o que existe)'
  }
}
