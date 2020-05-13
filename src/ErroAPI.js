function ErroAPI (status, mensagem, idErro) {
  this.message = mensagem
  this.mensagem = mensagem
  this.status = status
  this.idErro = idErro || 0
}

ErroAPI.prototype = new Error()

module.exports = ErroAPI
