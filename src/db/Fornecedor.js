const Sequelize = require('sequelize')

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

module.exports = sequelize => sequelize.define('fornecedor', colunas, {})
