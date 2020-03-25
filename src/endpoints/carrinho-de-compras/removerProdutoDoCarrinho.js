module.exports = async contexto => {
  const ProdutosNoCarrinho = contexto.db.model('produtosNoCarrinho')
  const instrucoes = {
    cliente: contexto.params.cliente,
    sku: contexto.params.sku
  }
  const produtoExiste = await ProdutosNoCarrinho
    .findOne({ where: instrucoes })

  if (!produtoExiste) {
    contexto.status = 404
    contexto.body = 'Produto não existe no carrinho!'
    return
  }

  contexto.status = 200
  contexto.body = produtoExiste
  contexto.set('etag', contexto.body.version)
  const ultimaModificacao = (new Date(contexto.body.updatedAt)).getTime()
  contexto.set('Last-Modified', ultimaModificacao)
}
