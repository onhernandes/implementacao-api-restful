const Sequelize = require('sequelize')

module.exports = sequelize => {
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

  return sequelize.define('produtos_carrinho', colunas, {})
}
