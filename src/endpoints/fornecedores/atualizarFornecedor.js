const Fornecedor = require('./Fornecedor')
module.exports = async (id, dadosParaAtualizar) => {
  const fornecedor = await Fornecedor.findOne({
    where: { id },
    attributes: ['id']
  })

  if (!fornecedor) {
    return false
  }

  await Fornecedor.update(
    dadosParaAtualizar,
    {
      where: {
        id: fornecedor.id
      }
    }
  )

  return true
}
