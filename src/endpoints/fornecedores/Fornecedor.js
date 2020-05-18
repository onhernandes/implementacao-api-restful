const TabelaFornecedor = require('./TabelaFornecedor')
const CampoInvalido = require('../../erros/CampoInvalido')
const NaoEncontrado = require('../../erros/NaoEncontrado')
const DadosNaoFornecidos = require('../../erros/DadosNaoFornecidos')

class Fornecedor {
  constructor ({ id, empresa, email, categoria, version, updatedAt }) {
    this.id = id
    this.empresa = empresa
    this.categoria = categoria
    this.email = email
    this.version = version
    this.updatedAt = updatedAt
  }

  validar () {
    const campos = ['empresa', 'categoria', 'email']

    for (let i = 0; i < campos.length; i++) {
      const campo = campos[i]
      const valor = this[campo]
      if (typeof valor !== 'string' || valor.length === 0) {
        throw new CampoInvalido(campo)
      }
    }
  }

  async verificarSeExiste () {
    const encontrado = await TabelaFornecedor.contar({
      id: this.id
    })

    if (!encontrado) {
      throw new NaoEncontrado('fornecedor')
    }
  }

  async atualizar () {
    const campos = ['empresa', 'categoria', 'email']
    const dadosParaAtualizar = {}

    campos.forEach(campo => {
      if (this[campo]) {
        dadosParaAtualizar[campo] = this[campo]
      }
    })

    if (Object.keys(dadosParaAtualizar).length === 0) {
      throw new DadosNaoFornecidos()
    }

    await this.verificarSeExiste()
    await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
    await this.carregar()
  }

  async criar () {
    this.validar()
    const resultado = await TabelaFornecedor.criar({
      empresa: this.empresa,
      email: this.email,
      categoria: this.categoria
    })

    this.id = resultado.id
    this.version = resultado.version
    this.updatedAt = resultado.updatedAt
  }

  async remover () {
    await this.verificarSeExiste()
    await TabelaFornecedor.remover(this.id)
  }

  async carregar () {
    const encontrado = await TabelaFornecedor.pegarFornecedorPorId(this.id)
    this.categoria = encontrado.categoria
    this.empresa = encontrado.empresa
    this.email = encontrado.email
    this.version = encontrado.version
    this.updatedAt = encontrado.updatedAt
  }
}

module.exports = Fornecedor
