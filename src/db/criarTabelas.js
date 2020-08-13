const models = [
  require('../endpoints/fornecedores/ModeloTabelaFornecedor'),
  require('../endpoints/fornecedores/produtos/ModeloTabelaProduto')
];

(async () => {
  for (let i = 0; i < models.length; i++) {
    const model = models[i]
    await model.sync()
  }

  console.log('Sincronizado')
})()
