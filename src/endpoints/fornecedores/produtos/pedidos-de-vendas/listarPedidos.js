module.exports = async contexto => {
  const Pedido = contexto.db.model('pedido')
  const Produto = contexto.db.model('produto')

  const produto = await Produto.findOne({
    where: {
      fornecedor: contexto.query.fornecedor,
      id: contexto.query.produto
    },
    attributes: ['id']
  })

  if (!produto) {
    contexto.status = 404
    contexto.body = 'Produto não encontrado!'
    return
  }

  const pedidos = await Pedido.findAll({
    where: {
      produto: produto.id
    }
  })
  contexto.body = pedidos
}
