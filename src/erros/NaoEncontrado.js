function NaoEncontrado (entidade) {
  this.name = 'NaoEncontrado'
  this.mensagem = `'${entidade}' não encontrado!`
  this.idErro = 0
}

NaoEncontrado.prototype = new Error()

module.exports = NaoEncontrado
