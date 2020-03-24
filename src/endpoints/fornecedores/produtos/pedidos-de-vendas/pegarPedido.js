module.exports = async contexto => {
  const Pedido = contexto.db.model('pedido')

  const pedido = await Pedido.findOne({
    where: {
      produto: contexto.query.produto,
      id: contexto.query.id
    }
  })

  if (!pedido) {
    contexto.status = 404
    contexto.body = 'Pedido não encontrado!'
    return
  }

  const ultimaVezModificado = (new Date(pedido.updatedAt)).getTime()
  contexto.set('Last-Modified', ultimaVezModificado)
  contexto.set('ETag', pedido.version)
  contexto.body = pedido
}
