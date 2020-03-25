module.exports = async contexto => {
  const Fornecedor = contexto.db.model('fornecedor')
  const fornecedor = await Fornecedor.findOne({
    where: {
      id: contexto.params.id
    },
    attributes: ['id']
  })

  if (!fornecedor) {
    contexto.status = 404
    contexto.body = {
      id: 0,
      description: 'Fornecedor não encontrado!'
    }
    return
  }

  await Fornecedor.update(
    contexto.request.body,
    {
      where: {
        id: fornecedor.id
      }
    }
  )

  contexto.status = 204
}
