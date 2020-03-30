const Fornecedor = require('./Fornecedor')
module.exports = async id => {
  const fornecedor = await Fornecedor.findOne({
    where: { id },
    attributes: ['id']
  })

  if (!fornecedor) {
    return false
  }

  await Fornecedor.destroy({
    where: { id }
  })

  return true
}
