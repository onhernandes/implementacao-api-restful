module.exports = async contexto => {
  const Produto = contexto.db.model('produto')
  const instrucoes = {
    fornecedor: contexto.params.fornecedor
  }

  if (contexto.query.categoria) {
    instrucoes.categoria = contexto.query.categoria
  }

  contexto.body = await Produto.findAll({ where: instrucoes })
}
