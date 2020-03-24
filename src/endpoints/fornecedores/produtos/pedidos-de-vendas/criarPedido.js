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

  const dadosDoPedido = Object.assign({}, contexto.request.body, { produto: produto.id })
  const pedido = await Pedido.create(dadosDoPedido)
  contexto.body = pedido
  contexto.status = 201
}
