const Sequelize = require('sequelize')
const instancia = require('../../../db')

const colunas = {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  preco: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  estoque: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Sem categoria'
  },
  fornecedor: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: require('../ModeloTabelaFornecedor'),
      key: 'id'
    }
  }
}

const opcoes = {
  freezeTableName: true,
  tableName: 'produtos'
}

module.exports = instancia.define('produto', colunas, opcoes)
