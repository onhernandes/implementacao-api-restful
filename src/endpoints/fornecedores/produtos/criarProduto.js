module.exports = async contexto => {
  const Produto = contexto.db.model('produto')
  const Fornecedor = contexto.db.model('fornecedor')
  const idFornecedor = contexto.params.fornecedor

  const fornecedorEncontrado = await Fornecedor
    .findOne({ where: { id: idFornecedor } })

  if (!fornecedorEncontrado) {
    contexto.status = 404
    contexto.body = {
      id: 0,
      description: 'Fornecedor não encontrado!'
    }
    return
  }

  const dadosDoProduto = Object.assign({}, contexto.request.body, { fornecedor: idFornecedor })
  contexto.body = await Produto.create(dadosDoProduto)
  contexto.set('Location', `/api/fornecedores/${idFornecedor}/produtos/${contexto.body.id}`)
  contexto.status = 201
}
