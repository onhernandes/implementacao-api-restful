const Produto = require('./Produto')
const ErroAPI = require('../../../ErroAPI')

module.exports = async (idFornecedor, idProduto, dados) => {
  const instrucoes = {
    id: idProduto,
    fornecedor: idFornecedor
  }

  const produto = await Produto.findOne({
    where: instrucoes
  })

  if (!produto) {
    throw new ErroAPI(404, 'Produto não encontrado!', 0)
  }

  const paraAtualizar = {}

  if (dados.titulo) {
    paraAtualizar.titulo = dados.titulo
  }

  if (dados.preco) {
    paraAtualizar.preco = dados.preco
  }

  if (!paraAtualizar) {
    throw new ErroAPI(400, 'Não há dados para atualizar!', 1)
  }

  return Produto.update(dados, { where: instrucoes })
}
