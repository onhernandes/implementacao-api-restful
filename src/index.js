const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { tiposAceitos } = require('./serializador.js')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')

app.use(bodyParser.json())

app.use((requisicao, resposta, proximo) => {
  try {
    const formatoRequisitado = requisicao.header('Accept')

    if (tiposAceitos.indexOf(formatoRequisitado) === -1) {
      resposta.status(406)
      resposta.end()
      return
    }

    const formatoResposta = formatoRequisitado === '*/*' ? 'application/json' : formatoRequisitado
    resposta.setHeader('Content-Type', formatoResposta)
    proximo()
  } catch (e) {
    console.error(e)
  }
})

app.use((requisicao, resposta, proximo) => {
  requisicao.comeco = Date.now()
  proximo()
})

app.use('/api/fornecedores', require('./endpoints/fornecedores'))

app.use((erro, requisicao, resposta, proximo) => {
  console.error(erro)
  let status = 500

  const informacoes = {
    idErro: erro.idErro,
    mensagem: erro.message
  }

  if (erro instanceof NaoEncontrado) {
    status = 404
  }

  if (erro instanceof CampoInvalido) {
    status = 400
  }

  resposta.status(status)

  const json = JSON.stringify(informacoes)
  resposta.send(json)
})
app.listen(3000, () => console.log('A API está funcionando!'))
