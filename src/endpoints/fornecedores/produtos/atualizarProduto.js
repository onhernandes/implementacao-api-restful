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

  const dados = {}

  if (contexto.request.body.titulo) {
    dados.titulo = contexto.request.body.titulo
  }

  if (contexto.request.body.preco) {
    dados.preco = contexto.request.body.preco
  }

  if (!dados) {
    contexto.status = 400
    contexto.body = 'Sem dados para atualizar!'
    return
  }

  await Produto.update(dados, { where: instrucoes })
  contexto.status = 204
}
