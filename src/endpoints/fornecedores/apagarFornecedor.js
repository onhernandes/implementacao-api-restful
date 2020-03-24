module.exports = async contexto => {
  const Fornecedor = contexto.db.model('fornecedor')
  const fornecedor = await Fornecedor.findOne({
    where: {
      id: contexto.query.id
    },
    attributes: ['id']
  })

  if (!fornecedor) {
    contexto.status = 404
    contexto.body = 'Fornecedor não encontrado'
    return
  }

  await Fornecedor.destroy({
    where: {
      id: contexto.query.id
    }
  })

  contexto.status = 204
}
