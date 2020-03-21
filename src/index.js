const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(bodyParser())

app.use(
  require('./endpoints/fornecedores')
)

app.listen(3000)
