function CampoInvalido () {
  this.name = 'CampoInvalido'
  this.idErro = 1
}

CampoInvalido.prototype = new Error()

module.exports = CampoInvalido
