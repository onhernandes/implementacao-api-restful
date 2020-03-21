const router = require('koa-router')({ prefix: '/api/fornecedores' })

const criarFornecedor = require('./criarFornecedor')
router.post('/', async contexto => {
  contexto.body = await criarFornecedor(contexto)
})
