const Sequelize = require('sequelize')
const instancia = require('../../db')

const colunas = {
  empresa: {
    type: Sequelize.STRING,
    allowNull: false
  },
  categoria: {
    type: Sequelize.ENUM('racao', 'brinquedos'),
    allowNull: false
  }
}

module.exports = instancia.define('fornecedor', colunas, {})
