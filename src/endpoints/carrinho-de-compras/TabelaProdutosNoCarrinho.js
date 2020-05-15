const ModeloTabelaProdutosNoCarrinho = require('./ModeloTabelaProdutosNoCarrinho')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
  listar (filtros) {
    let where = {}

    if (filtros) {
      where = filtros
    }

    return ModeloTabelaProdutosNoCarrinho.findAll({ where })
  },
  async contar (criterios) {
    const encontrado = await ModeloTabelaProdutosNoCarrinho.count({
      where: criterios || {}
    })

    return encontrado
  },
  criar (produto) {
    return ModeloTabelaProdutosNoCarrinho.create(produto)
  },
  async atualizar (id, dadosParaAtualizar) {
    await ModeloTabelaProdutosNoCarrinho.update(
      dadosParaAtualizar,
      { where: { id } }
    )
  },
  async remover (id) {
    await ModeloTabelaProdutosNoCarrinho.destroy({
      where: { id }
    })
  },
  async pegarProdutosNoCarrinhoPorId (id) {
    const produto = await ModeloTabelaProdutosNoCarrinho.findOne({
      where: { id },
      raw: true
    })

    if (!produto) {
      throw new NaoEncontrado('produto')
    }

    return produto
  }
}
