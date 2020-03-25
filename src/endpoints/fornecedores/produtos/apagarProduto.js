module.exports = async contexto => {
  const Produto = contexto.db.model('produto')
  const instrucoes = {
    id: contexto.params.id,
    fornecedor: contexto.params.fornecedor
  }

  const produto = await Produto.findOne({
    where: instrucoes
  })

  if (!produto) {
    contexto.status = 404
    contexto.body = {
      id: 0,
      description: 'Produto não encontrado!'
    }
    return
  }

  await Produto.destroy({ where: instrucoes })
  contexto.status = 204
}
