const Produto = require('./Produto')

module.exports = (fornecedor, categoria) => {
  const instrucoes = { fornecedor }

  if (categoria) {
    instrucoes.categoria = categoria
  }

  return Produto.findAll({ where: instrucoes })
}
