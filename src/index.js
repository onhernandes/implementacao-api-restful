const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.use((requisicao, resposta, proximo) => {
  requisicao.comeco = Date.now()
  proximo()
})

app.use('/api/fornecedores', require('./endpoints/fornecedores'))
// app.use('/clientes', require('./endpoints/carrinho-de-compras'))

app.use(function (erro, requisicao, resposta, proximo) {
  resposta.status(erro.status)

  const informacoes = {
    idErro: erro.idErro,
    mensagem: erro.mensagem
  }

  const json = JSON.stringify(informacoes)
  resposta.send(json)
})
app.listen(3000, () => console.log('A API está funcionando!'))
