const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const serializador = require('./serializador.js')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const ErroAPI = require('./erros/ErroAPI')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

app.use(bodyParser.json())

app.use((requisicao, resposta, proximo) => {
  const cabecalhoAccept = requisicao.header('Accept')
  const formatoRequisitado = cabecalhoAccept === '*/*' ? 'application/json' : cabecalhoAccept

  if (Object.keys(serializador).indexOf(formatoRequisitado) === -1) {
    resposta.status(406)
    resposta.end()
    return
  }

  resposta.setHeader('Content-Type', formatoRequisitado)
  requisicao.serializador = serializador[formatoRequisitado]
  proximo()
})

app.use((requisicao, resposta, proximo) => {
  console.log(requisicao.serializador)
  requisicao.comeco = Date.now()
  proximo()
})

app.use('/api/fornecedores', require('./endpoints/fornecedores'))

app.use((erro, requisicao, resposta, proximo) => {
  console.log(erro)
  let status = 500

  const informacoes = {
    idErro: erro.idErro,
    mensagem: erro.message
  }

  if (erro instanceof ValorNaoSuportado) {
    status = 501
  }

  if (erro instanceof ErroAPI) {
    status = 500
  }

  if (erro instanceof NaoEncontrado) {
    status = 404
  }

  if (erro instanceof CampoInvalido) {
    status = 400
  }

  resposta.status(status)

  const dadosDaResposta = requisicao.serializador(informacoes)
  resposta.send(dadosDaResposta)
})
app.listen(3000, () => console.log('A API está funcionando!'))
