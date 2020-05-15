const ModeloTabelaFornecedor = require('./ModeloTabelaFornecedor')
const NaoEncontrado = require('../../erros/NaoEncontrado')

module.exports = {
  listar (categoria) {
    const where = {}

    if (categoria) {
      where.categoria = categoria
    }

    return ModeloTabelaFornecedor.findAll({ where })
  },
  async contar (criterios) {
    const encontrado = await ModeloTabelaFornecedor.count({
      where: criterios || {}
    })

    return encontrado
  },
  criar (fornecedor) {
    return ModeloTabelaFornecedor.create(fornecedor)
  },
  async atualizar (id, dadosParaAtualizar) {
    await ModeloTabelaFornecedor.update(
      dadosParaAtualizar,
      { where: { id } }
    )
  },
  async remover (id) {
    await ModeloTabelaFornecedor.destroy({
      where: { id }
    })
  },
  async pegarFornecedorPorId (id) {
    const fornecedor = await ModeloTabelaFornecedor.findOne({
      where: { id },
      raw: true
    })

    if (!fornecedor) {
      throw new NaoEncontrado()
    }

    return fornecedor
  }
}
