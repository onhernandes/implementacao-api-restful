const ProdutosNoCarrinho = require('./ProdutosNoCarrinho')
const ErroAPI = require('../../ErroAPI')

module.exports = async (cliente, sku) => {
  const instrucoes = {
    cliente,
    sku
  }

  const produtoExiste = await ProdutosNoCarrinho
    .findOne({ where: instrucoes })

  if (!produtoExiste) {
    throw new ErroAPI(404, 'Produto não existe no carrinho!', 0)
  }

  await ProdutosNoCarrinho
    .destroy({ where: instrucoes })
}
