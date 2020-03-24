module.exports = async contexto => {
  const Pedido = contexto.db.model('pedido')

  const pedido = await Pedido.findOne({
    where: {
      fornecedor: contexto.query.fornecedor,
      id: contexto.query.pedido
    },
    attributes: ['id']
  })

  if (!pedido) {
    contexto.status = 404
    contexto.body = 'Pedido não encontrado!'
    return
  }

  const dados = {}
  const instrucoes = {
    id: contexto.query.id,
    pedido: pedido.id
  }

  if (contexto.request.body.nomeCliente) {
    dados.nomeCliente = contexto.request.body.nomeCliente
  }

  if (contexto.request.body.quantidade) {
    dados.quantidade = contexto.request.body.quantidade
  }

  if (!dados) {
    contexto.status = 400
    contexto.body = 'Sem dados para atualizar!'
    return
  }

  await Pedido.update(dados, { where: instrucoes })
  contexto.status = 204
}
