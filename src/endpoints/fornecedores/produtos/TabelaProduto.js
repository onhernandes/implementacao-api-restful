const ModeloTabelaProduto = require('./ModeloTabelaProduto')
const NaoEncontrado = require('../../../erros/NaoEncontrado')
const Sequelize = require('sequelize')

module.exports = {
  listar (filtros) {
    let where = {}

    if (filtros) {
      where = filtros
    }

    return ModeloTabelaProduto.findAll({ where })
  },
  async contar (filtros) {
    const encontrado = await ModeloTabelaProduto.count({
      where: filtros || {}
    })

    return encontrado
  },
  criar (dados) {
    return ModeloTabelaProduto.create(dados)
  },
  async atualizar (id, fornecedor, dadosParaAtualizar) {
    await ModeloTabelaProduto.update(
      dadosParaAtualizar,
      { where: { id, fornecedor } }
    )
  },
  async remover (id, fornecedor) {
    await ModeloTabelaProduto.destroy({
      where: { id, fornecedor }
    })
  },
  async pegarProdutoPorId (id, fornecedor) {
    const produto = await ModeloTabelaProduto.findOne({
      where: { id, fornecedor },
      raw: true
    })

    if (!produto) {
      throw new NaoEncontrado('produto')
    }

    return produto
  },
  diminuir (criterios, campo, quantidade) {
    return ModeloTabelaProduto.update(
      { [campo]: Sequelize.literal(`${campo} - ${quantidade}`) },
      { where: criterios }
    )
  }
}
