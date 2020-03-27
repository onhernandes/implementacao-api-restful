const Fornecedor = require('./Fornecedor')

module.exports = async id => {
  const fornecedor = await Fornecedor.findOne({
    where: {
      id
    }
  })

  return fornecedor
}
