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
    defaultValue: 'Não categorizado'
  },
  fornecedor: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: require('../Fornecedor'),
      key: 'id'
    }
  }
}

module.exports = instancia.define('produto', colunas, {})
