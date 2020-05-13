const Produto = require('./Produto')
const ErroAPI = require('../../../ErroAPI')

module.exports = async (idFornecedor, idProduto) => {
  const instrucoes = {
    id: idProduto,
    fornecedor: idFornecedor
  }

  const produtoEncontrado = await Produto
    .findOne({ where: instrucoes })

  if (!produtoEncontrado) {
    throw new ErroAPI(404, 'Produto não encontrado!', 0)
  }

  if (produtoEncontrado.estoque === 0) {
    throw new ErroAPI(409, 'Estoque do produto já está zerado!', 2)
  }

  const dados = {
    estoque: produtoEncontrado.estoque - 1
  }

  return Produto.update(dados, { where: instrucoes })
}
