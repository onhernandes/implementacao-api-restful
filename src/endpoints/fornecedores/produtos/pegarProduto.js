module.exports = async contexto => {
  const Produto = contexto.db.model('produto')
  const produto = await Produto.findOne({
    where: {
      fornecedor: contexto.params.fornecedor,
      id: contexto.params.id
    }
  })

  if (!produto) {
    contexto.status = 404
    contexto.body = {
      id: 0,
      description: 'Produto não encontrado!'
    }
    return
  }

  const ultimaVezModificado = (new Date(produto.updatedAt)).getTime()
  contexto.set('Last-Modified', ultimaVezModificado)
  contexto.set('ETag', produto.version)
  contexto.body = produto
}
