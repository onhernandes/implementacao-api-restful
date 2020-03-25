module.exports = async contexto => {
  const Fornecedor = contexto.db.model('fornecedor')
  contexto.body = await Fornecedor.create(contexto.request.body)
  contexto.status = 201
  contexto.set('Location', `/api/fornecedores/${contexto.body.id}`)
}
