const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { formatosAceitos, SerializadorErro } = require('./serializador.js')
const NaoEncontrado = require('./erros/NaoEncontrado')
const CampoInvalido = require('./erros/CampoInvalido')
const ErroAPI = require('./erros/ErroAPI')
const ValorNaoSuportado = require('./erros/ValorNaoSuportado')

app.use(bodyParser.json())

app.use((requisicao, resposta, proximo) => {
  const cabecalhoAccept = requisicao.header('Accept')
  let formatoRequisitado = cabecalhoAccept === '*/*' ? 'application/json' : cabecalhoAccept

  if (formatosAceitos.indexOf(formatoRequisitado) === -1) {
    resposta.status(406)
    resposta.end()
    return
  }

  formatoRequisitado = formatoRequisitado.split(';')[0]
  resposta.setHeader('Content-Type', `${formatoRequisitado}; charset=utf-8`)
  proximo()
})

app.use((requisicao, resposta, proximo) => {
  requisicao.comeco = Date.now()
  proximo()
})

app.use('/api/fornecedores', require('./endpoints/fornecedores'))

app.use((erro, requisicao, resposta, proximo) => {
  console.log(erro)
  let status = 500

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
  const contentType = resposta.getHeader('Content-Type')
  const serializador = new SerializadorErro(contentType)

  resposta.send(serializador.serializar(erro))
})
app.listen(3000, () => console.log('A API está funcionando!'))
