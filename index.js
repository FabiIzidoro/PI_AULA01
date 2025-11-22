const express = require('express');
const app = express();

// Middleware para fazer o parse de JSON
app.use(express.json());

// Estrutura de dados em memória (array)
let produtos = [
  { id: 1, nome: 'Produto 1', preco: 100 },
  { id: 2, nome: 'Produto 2', preco: 200 }
];

// POST /produtos: Cadastrar um novo produto
app.post('/produtos', (req, res) => {
  const { nome, preco } = req.body;

  if (!nome || !preco) {
    return res.status(400).json({ mensagem: 'Nome e preço são obrigatórios' });
  }

  const novoProduto = {
    id: produtos.length + 1,
    nome,
    preco
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

// GET /produtos: Listar todos os produtos
app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});

// GET /produtos/:id: Buscar um produto específico
app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const produto = produtos.find(p => p.id === parseInt(id));

  if (!produto) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }

  res.status(200).json(produto);
});

// PUT /produtos/:id: Atualizar todos os dados de um produto
app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  const produtoIndex = produtos.findIndex(p => p.id === parseInt(id));

  if (produtoIndex === -1) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }

  // Atualiza o produto
  produtos[produtoIndex] = { id: parseInt(id), nome, preco };
  res.status(200).json(produtos[produtoIndex]);
});

// PATCH /produtos/:id: Atualizar parcialmente os dados de um produto
app.patch('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;

  const produto = produtos.find(p => p.id === parseInt(id));

  if (!produto) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }

  // Atualiza apenas o que for passado no corpo da requisição
  if (nome) produto.nome = nome;
  if (preco) produto.preco = preco;

  res.status(200).json(produto);
});

// DELETE /produtos/:id: Excluir um produto
app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const produtoIndex = produtos.findIndex(p => p.id === parseInt(id));

  if (produtoIndex === -1) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }

  // Remove o produto do array
  produtos.splice(produtoIndex, 1);
  res.status(204).send(); // Retorna 204 sem corpo
});

// Rota para a raiz do servidor (opcional)
app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor de produtos!');
});

// Inicia o servidor na porta 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando no endereço http://localhost:${port}`);
});
