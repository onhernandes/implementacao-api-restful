module.exports = async contexto => {
  const Produto = contexto.db.model('produto')
  const produto = await Produto.findOne({
    where: {
      fornecedor: contexto.query.fornecedor,
      id: contexto.query.id
    }
  })

  if (!produto) {
    contexto.status = 404
    contexto.body = 'Produto não encontrado!'
    return
  }

  const ultimaVezModificado = (new Date(produto.updatedAt)).getTime()
  contexto.set('Last-Modified', ultimaVezModificado)
  contexto.set('ETag', produto.version)
  contexto.body = produto
}
