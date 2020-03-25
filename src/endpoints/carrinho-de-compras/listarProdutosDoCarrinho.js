module.exports = async contexto => {
  const ProdutosNoCarrinho = contexto.db.model('produtos_carrinho')
  const produtos = await ProdutosNoCarrinho
    .findAll({
      where: {
        cliente: contexto.params.cliente
      }
    })

  contexto.status = 200
  contexto.body = produtos
}
