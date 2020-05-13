const Produto = require('./Produto')
const ErroAPI = require('../../../ErroAPI')

module.exports = async (idFornecedor, idProduto) => {
  const instrucoes = {
    id: idProduto,
    fornecedor: idFornecedor
  }

  const produto = await Produto.findOne({
    where: instrucoes
  })

  if (!produto) {
    throw new ErroAPI(404, 'Produto não encontrado!', 0)
  }

  return Produto.destroy({ where: instrucoes })
}
