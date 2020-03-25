module.exports = async contexto => {
  const Fornecedor = contexto.db.model('fornecedor')
  contexto.body = await Fornecedor.findAll()
  contexto.status = 200
}
