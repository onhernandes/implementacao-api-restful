const TabelaFornecedor = require('TabelaFornecedor')
const CampoInvalido = require('../../erros/CampoInvalido')
const NaoEncontrado = require('../../erros/NaoEncontrado')

function Fornecedor ({ id, empresa, categoria, version }) {
  this.id = id
  this.empresa = empresa
  this.categoria = categoria
  this.version = version

  return this
}

Fornecedor.prototype.validar = function validar () {
  if (this.empresa.length === 0) {
    throw new CampoInvalido('empresa')
  }

  if (this.categoria.length === 0) {
    throw new CampoInvalido('empresa')
  }
}

Fornecedor.prototype.verificarSeExiste = async function verificarSeExiste () {
  const encontrado = await TabelaFornecedor.contar({
    id: this.id
  })

  if (!encontrado) {
    throw new NaoEncontrado()
  }
}

Fornecedor.prototype.atualizar = async function atualizar () {
  await this.verificarSeExiste()
  const dadosParaAtualizar = {
    empresa: this.empresa,
    categoria: this.categoria
  }
  await TabelaFornecedor.atualizar(this.id, dadosParaAtualizar)
}

Fornecedor.prototype.criar = async function criar () {
  const resultado = await TabelaFornecedor.criar({
    empresa: this.empresa,
    categoria: this.categoria
  })

  this.id = resultado.id
  this.version = resultado.version
}

Fornecedor.prototype.remover = async function remover () {
  await this.verificarSeExiste()
  await TabelaFornecedor.remover(this.id)
}

Fornecedor.prototype.carregar = async function carregar () {
  const encontrado = await TabelaFornecedor.pegarFornecedorPorId(this.id)
  this.categoria = encontrado.categoria
  this.empresa = encontrado.empresa
  this.version = encontrado.version
}

module.exports = Fornecedor
