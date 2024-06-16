const express = require("express")
const router = express.Router()
const {v4: uuidv4 } = require ('uuid')
const cors = require('cors')

const app = express()
app.use(express.json())
const porta = 3333

const produtos = [
    {id: '0001',
    modelo: 'HONDA POP 1101',
    cor: 'BRANCA',
    valor: 'R$ 15.000,00',
    status: 'Em Estoque'
  },
  {
    id: '0002',
    modelo: 'HONDA 500x',
    cor: 'VERMELHA',
    valor: 'R$ 50.000,00',
    status: 'Sem estoque'
  },
  {
    id: '0003',
    modelo: 'HONDA CB 300F TWISTER',
    cor: 'PRETA',
    valor: 'R$ 30.000,00',
    status: 'Em trânsito'
  },
]

function mostraProdutos(request, response) {
 response.json(produtos)
}

function criaProduto(request, response) {
    const novoProduto = {
        id: uuidv4(),
        modelo: request.body.modelo,
        cor: request.body.cor,
        valor: request.body.valor,
        status: request.body.status
    }

    produtos.push(novoProduto)

    response.json(produtos)
}

function corrigeProduto(request, response) {
    function encontraProduto(produto) {
      if (produto.id === request.params.id) {
        return produto
      }
    }
    const produtoEncontrado = produtos.find(encontraProduto)
    if (request.body.modelo) {
      produtoEncontrado.modelo = request.body.modelo
    }

    if (request.body.cor) {
        produtoEncontrado.cor = request.body.cor
    }

    if (request.body.valor) {
        produtoEncontrado.valor = request.body.valor
    }

    if (request.body.status) {
        produtoEncontrado.status = request.body.status
    }
  response.json(produtos)
}


function deletaProduto(request, response) {

  function todosMenosEste(produto) {
    if (produto.id !== request.params.id) {
      return produto
    } 
  }
  const produtosQueFicaram = produtos.filter(todosMenosEste) 
  response.json(produtosQueFicaram)
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta ", porta)
}

app.use(cors()) 
app.use(router.get('/produtos', mostraProdutos))
app.use(router.post('/produtos', criaProduto))
app.use(router.patch('/produtos/:id', corrigeProduto))
app.use(router.delete('/produtos/:id', deletaProduto))
app.listen(porta, mostraPorta)