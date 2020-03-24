module.exports = async contexto => {
  const Fornecedor = contexto.db.model('fornecedor')
  contexto.body = Fornecedor.findAll()
  contexto.status = 200
}
