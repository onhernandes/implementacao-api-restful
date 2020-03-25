const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(bodyParser())

const sequelize = require('./db')
const descricao = Object.create(null)
descricao.value = sequelize
Object.defineProperty(app.context, 'db', descricao)

app.use(async (contexto, proximo) => {
  const comeco = Date.now()
  await proximo()
  const milisegundos = Date.now() - comeco
  contexto.set('X-Response-Time', `${milisegundos}ms`)
})

app.use(
  require('./endpoints/fornecedores').routes(),
  require('./endpoints/carrinho-de-compras').routes()
)

app.listen(3000)
