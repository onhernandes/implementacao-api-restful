module.exports = async contexto => {
  const Fornecedor = contexto.db.model('fornecedor')
  contexto.body = await Fornecedor.create(contexto.request.body)
  contexto.status = 201
}
