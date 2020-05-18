const models = [
  require('../endpoints/fornecedores/ModeloTabelaFornecedor').sync(),
  require('../endpoints/fornecedores/produtos/ModeloTabelaProduto').sync()
]

Promise.all(models)
  .then(() => console.log('Sincronizado!'))
  .then(() => process.exit())
  .catch(console.log)
