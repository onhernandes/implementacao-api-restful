const Sequelize = require('sequelize')

module.exports = sequelize => {
  const colunas = {
    nomeCliente: {
      type: Sequelize.STRING,
      allowNull: false
    },
    produto: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: require('./Produto')(sequelize),
        key: 'id'
      }
    }
  }

  return sequelize.define('pedidoDeVenda', colunas, {})
}