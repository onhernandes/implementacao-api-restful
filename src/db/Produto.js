const Sequelize = require('sequelize')

module.exports = sequelize => {
  const colunas = {
    titulo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    preco: {
      type: Sequelize.DOUBLE,
      allowNull: false
    },
    fornecedor: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: require('./Fornecedor')(sequelize),
        key: 'id'
      }
    }
  }

  return sequelize.define('produto', colunas, {})
}
