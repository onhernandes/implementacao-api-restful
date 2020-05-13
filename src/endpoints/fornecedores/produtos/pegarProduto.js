const Produto = require('./Produto')
const ErroAPI = require('../../../ErroAPI')

module.exports = async (idFornecedor, idProduto) => {
  const produto = await Produto.findOne({
    where: {
      fornecedor: idFornecedor,
      id: idProduto
    }
  })

  if (!produto) {
    throw new ErroAPI(404, 'Produto não encontrado!', 0)
  }

  return produto
}
