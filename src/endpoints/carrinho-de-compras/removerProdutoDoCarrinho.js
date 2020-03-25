module.exports = async contexto => {
  const ProdutosNoCarrinho = contexto.db.model('produtos_carrinho')
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

  await ProdutosNoCarrinho
    .destroy({ where: instrucoes })
  contexto.status = 204
}
