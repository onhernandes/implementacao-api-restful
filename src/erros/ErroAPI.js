function ErroAPI (mensagem) {
  this.name = 'ErroAPI'
  this.mensagem = mensagem
  this.idErro = 2
}

ErroAPI.prototype = new Error()

module.exports = ErroAPI
