const models = [
  require('../endpoints/fornecedores/Fornecedor').sync(),
  require('../endpoints/fornecedores/produtos/Produto').sync(),
  require('../endpoints/carrinho-de-compras/ProdutosNoCarrinho').sync()
]

Promise.all(models)
  .then(() => console.log('Sincronizado!'))
  .then(() => process.exit())
  .catch(console.log)
