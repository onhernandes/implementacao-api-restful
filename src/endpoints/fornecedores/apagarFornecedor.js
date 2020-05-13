const Fornecedor = require('./Fornecedor')
const ErroAPI = require('../../ErroAPI')
module.exports = async id => {
  const fornecedor = await Fornecedor.findOne({
    where: { id },
    attributes: ['id']
  })

  if (!fornecedor) {
    throw new ErroAPI(404, 'Fornecedor não encontrado!', 0)
  }

  await Fornecedor.destroy({
    where: { id }
  })

  return true
}
