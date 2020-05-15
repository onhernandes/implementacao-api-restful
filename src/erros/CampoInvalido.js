function CampoInvalido (campo) {
  this.name = 'CampoInvalido'
  this.message = `A propriedade '${campo}' está inválida!`
  this.idErro = 1
}

CampoInvalido.prototype = new Error()

module.exports = CampoInvalido
