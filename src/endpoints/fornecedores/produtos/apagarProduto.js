module.exports = async contexto => {
  const Produto = contexto.db.model('produto')
  const instrucoes = {
    id: contexto.query.id,
    fornecedor: contexto.query.fornecedor
  }

  const produto = await Produto.findOne({
    where: instrucoes
  })

  if (!produto) {
    contexto.status = 404
    contexto.body = 'Produto não encontrado!'
    return
  }

  await Produto.destroy({ where: instrucoes })
  contexto.status = 204
}
