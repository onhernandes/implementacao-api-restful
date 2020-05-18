function ValorNaoSuportado (tipo) {
  this.name = 'ValorNaoSuportado'
  this.message = `Valor do tipo ${tipo} não suportado pelo serializador`
  this.idErro = 4
}

ValorNaoSuportado.prototype = new Error()

module.exports = ValorNaoSuportado
