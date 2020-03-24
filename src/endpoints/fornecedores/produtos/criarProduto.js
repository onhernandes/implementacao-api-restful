module.exports = async contexto => {
  const Produto = contexto.db.model('produto')
  const Fornecedor = contexto.db.model('fornecedor')
  const idFornecedor = contexto.query.fornecedor

  const fornecedorEncontrado = await Fornecedor
    .findOne({ where: { id: idFornecedor } })

  if (!fornecedorEncontrado) {
    contexto.status = 404
    contexto.body = 'Fornecedor não encontrado!'
    return
  }

  const dadosDoProduto = Object.assign({}, contexto.request.body, { fornecedor: idFornecedor })
  contexto.body = await Produto.create(dadosDoProduto)
  contexto.status = 201
}
