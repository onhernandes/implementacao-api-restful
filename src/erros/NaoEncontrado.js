function NaoEncontrado () {
  this.name = 'NaoEncontrado'
  this.idErro = 0
}

NaoEncontrado.prototype = new Error()

module.exports = NaoEncontrado
