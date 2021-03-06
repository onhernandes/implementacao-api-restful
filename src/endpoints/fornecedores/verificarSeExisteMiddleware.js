const Fornecedor = require('./Fornecedor')
module.exports = async (requisicao, resposta, proximo) => {
  try {
    const id = requisicao.params.fornecedor
    const fornecedor = new Fornecedor({ id })
    await fornecedor.carregar()
    requisicao.fornecedor = fornecedor
  } catch (e) {
    proximo(e)
    return
  }

  proximo()
}
