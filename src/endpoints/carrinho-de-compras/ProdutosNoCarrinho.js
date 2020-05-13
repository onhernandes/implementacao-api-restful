const Sequelize = require('sequelize')
const instancia = require('../../db')

const colunas = {
  cliente: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  sku: {
    type: Sequelize.STRING,
    allowNull: false
  }
}

const opcoes = {
  freezeTableName: true,
  tableName: 'produtos_no_carrinho'
}

module.exports = instancia.define('produtos_no_carrinho', colunas, opcoes)
