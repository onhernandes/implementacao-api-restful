const ProdutosNoCarrinho = require('./ProdutosNoCarrinho')

module.exports = async cliente => ProdutosNoCarrinho
  .findAll({
    where: { cliente }
  })
