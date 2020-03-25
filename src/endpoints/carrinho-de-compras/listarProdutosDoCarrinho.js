module.exports = async contexto => {
  const ProdutosNoCarrinho = contexto.db.model('produtosNoCarrinho')
  const produtos = await ProdutosNoCarrinho
    .findAll({
      where: {
        cliente: contexto.params.cliente,
        sku: contexto.params.sku
      }
    })

  contexto.status = 200
  contexto.body = produtos
}
