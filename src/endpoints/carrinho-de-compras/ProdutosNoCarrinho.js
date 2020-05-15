const TabelaProdutosNoCarrinho = require('./TabelaProdutosNoCarrinho')
const CampoInvalido = require('../../erros/CampoInvalido')
const NaoEncontrado = require('../../erros/NaoEncontrado')

function ProdutosNoCarrinho ({ id, empresa, categoria, version, updatedAt }) {
  this.id = id
  this.empresa = empresa
  this.categoria = categoria
  this.version = version
  this.updatedAt = updatedAt

  return this
}

ProdutosNoCarrinho.prototype.validar = function validar () {
  if (this.empresa.length === 0) {
    throw new CampoInvalido('empresa')
  }

  if (this.categoria.length === 0) {
    throw new CampoInvalido('empresa')
  }
}

ProdutosNoCarrinho.prototype.verificarSeExiste = async function verificarSeExiste () {
  const encontrado = await TabelaProdutosNoCarrinho.contar({
    id: this.id
  })

  if (!encontrado) {
    throw new NaoEncontrado('fornecedor')
  }
}

ProdutosNoCarrinho.prototype.atualizar = async function atualizar () {
  this.validar()
  await this.verificarSeExiste()
  const dadosParaAtualizar = {
    empresa: this.empresa,
    categoria: this.categoria
  }
  await TabelaProdutosNoCarrinho.atualizar(this.id, dadosParaAtualizar)
  await this.carregar()
}

ProdutosNoCarrinho.prototype.criar = async function criar () {
  this.validar()
  const resultado = await TabelaProdutosNoCarrinho.criar({
    empresa: this.empresa,
    categoria: this.categoria
  })

  this.id = resultado.id
  this.version = resultado.version
  this.updatedAt = resultado.updatedAt
}

ProdutosNoCarrinho.prototype.remover = async function remover () {
  await this.verificarSeExiste()
  await TabelaProdutosNoCarrinho.remover(this.id)
}

ProdutosNoCarrinho.prototype.carregar = async function carregar () {
  const encontrado = await TabelaProdutosNoCarrinho.pegarProdutosNoCarrinhoPorId(this.id)
  this.categoria = encontrado.categoria
  this.empresa = encontrado.empresa
  this.version = encontrado.version
  this.updatedAt = encontrado.updatedAt
}

module.exports = ProdutosNoCarrinho
