const Sequelize = require('sequelize')
const instancia = require('../../db')

const colunas = {
  empresa: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  categoria: {
    type: Sequelize.ENUM('racao', 'brinquedos'),
    allowNull: false
  }
}

const opcoes = {
  freezeTableName: true,
  tableName: 'fornecedores'
}
module.exports = instancia.define('fornecedor', colunas, opcoes)
