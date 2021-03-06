const TabelaProduto = require('./TabelaProduto')
const NaoEncontrado = require('../../../erros/NaoEncontrado')
const CampoInvalido = require('../../../erros/CampoInvalido')
const Fornecedor = require('../Fornecedor')

class Produto {
  constructor ({ id, titulo, preco, estoque, categoria, fornecedor, version, updatedAt }) {
    this.id = id
    this.titulo = titulo
    this.preco = preco
    this.estoque = estoque
    this.categoria = categoria
    this.fornecedor = fornecedor
    this.version = version
    this.updatedAt = updatedAt
  }

  validar () {
    const camposTextoNaoVazios = ['titulo', 'categoria']
    camposTextoNaoVazios.forEach(campo => {
      if (this[campo].length === 0) {
        throw new CampoInvalido(campo)
      }
    })

    const camposInteiro = ['preco', 'estoque']
    camposInteiro.forEach(campo => {
      const valor = Number(this[campo])
      if (isNaN(valor)) {
        throw new CampoInvalido(campo)
      }
    })

    if ((this.fornecedor instanceof Fornecedor) === false) {
      throw new CampoInvalido('fornecedor')
    }
  }

  async verificarSeExiste () {
    const encontrado = await TabelaProduto.contar({
      id: this.id,
      fornecedor: this.fornecedor.id
    })

    if (!encontrado) {
      throw new NaoEncontrado('produto')
    }
  }

  async atualizar () {
    await this.verificarSeExiste()
    const camposParaAtualizar = ['titulo', 'preco', 'estoque', 'categoria']
    const dadosParaAtualizar = {}

    camposParaAtualizar.forEach(campo => {
      const valor = this[campo]

      if (valor !== undefined) {
        dadosParaAtualizar[campo] = valor
      }
    })

    if (Object.keys(dadosParaAtualizar).length === 0) {
      return
    }

    await TabelaProduto.atualizar(this.id, this.fornecedor.id, dadosParaAtualizar)
    await this.carregar()
  }

  async criar () {
    this.validar()
    const resultado = await TabelaProduto.criar({
      titulo: this.titulo,
      preco: this.preco,
      estoque: this.estoque,
      categoria: this.categoria,
      fornecedor: this.fornecedor.id
    })

    this.id = resultado.id
    this.version = resultado.version
    this.updatedAt = resultado.updatedAt
  }

  async remover () {
    await this.verificarSeExiste()
    await TabelaProduto.remover(this.id, this.fornecedor.id)
  }

  async carregar () {
    const encontrado = await TabelaProduto.pegarProdutoPorId(this.id, this.fornecedor.id)
    this.titulo = encontrado.titulo
    this.preco = encontrado.preco
    this.estoque = encontrado.estoque
    this.categoria = encontrado.categoria
    this.version = encontrado.version
    this.updatedAt = encontrado.updatedAt
  }

  async diminuirEstoque () {
    const id = this.id
    const fornecedor = this.fornecedor.id
    await TabelaProduto.diminuir({ id, fornecedor }, 'estoque', 1)
  }
}

module.exports = Produto
