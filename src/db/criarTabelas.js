const models = [
  require('../endpoints/fornecedores/Fornecedor').sync(),
  require('../endpoints/fornecedores/produtos/Produto').sync()
]

Promise.all(models)
  .then(() => console.log('Sincronizado!'))
  .then(() => process.exit())
  .catch(console.log)
