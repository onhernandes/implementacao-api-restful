const Sequelize = require('sequelize')
const config = require('config')

const instance = new Sequelize(
  config.get('mysql.banco'),
  config.get('mysql.usuario'),
  config.get('mysql.senha'),
  {
    host: config.get('mysql.uri'),
    dialect: 'mysql',
    define: {
      version: true
    }
  }
)

module.exports = instance
