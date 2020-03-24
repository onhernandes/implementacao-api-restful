module.exports = async contexto => {
  const Produto = contexto.db.model('produto')
  const instrucoes = {
    id: contexto.query.id,
    fornecedor: contexto.query.fornecedor
  }

  const produtoEncontrado = await Produto
    .findOne({ where: instrucoes })

  if (!produtoEncontrado) {
    contexto.status = 404
    contexto.body = 'Produto não encontrado!'
    return
  }

  const dados = {
    estoque: produtoEncontrado.estoque - 1
  }

  await Produto.update(dados, { where: instrucoes })
  contexto.status = 204
}
