module.exports = async contexto => {
  const Fornecedor = contexto.db.model('fornecedor')
  const fornecedor = await Fornecedor.findOne({
    where: {
      id: contexto.query.id
    }
  })

  if (!fornecedor) {
    contexto.status = 404
    contexto.body = 'Fornecedor não encontrado'
    return
  }

  const ultimaVezModificado = (new Date(fornecedor.updatedAt)).getTime()
  contexto.set('Last-Modified', ultimaVezModificado)
  contexto.set('ETag', fornecedor.version)
  contexto.body = fornecedor
}
