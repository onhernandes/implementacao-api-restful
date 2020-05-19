function DadosNaoFornecidos () {
  this.name = 'DadosNaoFornecidos'
  this.mensagem = 'Não foram fornecidos dados suficientes para completar a requisição'
  this.idErro = 5
}

DadosNaoFornecidos.prototype = new Error()

module.exports = DadosNaoFornecidos
