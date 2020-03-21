const sequelize = require('./index')

sequelize
  .sync()
  .then(() => console.log('Sincronizado!'))
  .then(() => sequelize.close())
  .catch(console.log)
