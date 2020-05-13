const Produto = require('./Produto')
module.exports = async (idFornecedor, produto) => {
  const dadosDoProduto = Object.assign({}, produto, { fornecedor: idFornecedor })
  return Produto.create(dadosDoProduto)
}
