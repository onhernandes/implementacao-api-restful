module.exports = async contexto => {
  const Produto = contexto.db.model('produto')
  const instrucoes = {
    id: contexto.params.id,
    fornecedor: contexto.params.fornecedor
  }

  const produtoEncontrado = await Produto
    .findOne({ where: instrucoes })

  if (!produtoEncontrado) {
    contexto.status = 404
    contexto.body = {
      id: 0,
      description: 'Produto não encontrado!'
    }
    return
  }

  if (produtoEncontrado.estoque === 0) {
    contexto.status = 409
    contexto.body = {
      id: 1,
      description: 'Estoque do produto já está zerado!'
    }
    return
  }

  const dados = {
    estoque: produtoEncontrado.estoque - 1
  }

  await Produto.update(dados, { where: instrucoes })
  contexto.status = 204
}
