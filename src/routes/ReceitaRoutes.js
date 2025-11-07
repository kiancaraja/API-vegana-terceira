const express = require('express');
const router = express.Router();

// -----------------------------------------------------------------
// PASSO 1: DEFINIR OS DADOS (O ARRAY QUE FALTAVA)
// -----------------------------------------------------------------
const receitas = [
  {
    id: "1", // Use string para o ID, é mais fácil
    nome: "Bolo de Chocolate Vegano",
    ingredientes: ["Farinha", "Açúcar", "Cacau", "Água", "Óleo"]
  },
  {
    id: "2",
    nome: "Feijoada Vegana",
    ingredientes: ["Feijão Preto", "Linguiça Vegana", "Legumes"]
  }
];

// -----------------------------------------------------------------
// SUAS ROTAS
// -----------------------------------------------------------------

// ROTA PARA LISTAR TODAS AS RECEITAS
// GET http://localhost:3000/receitas
router.get('/', (req, res) => {
  res.status(200).json(receitas); // Agora ele retorna o array de receitas
});

// ROTA PARA BUSCAR UMA ÚNICA RECEITA POR ID
// Exemplo: GET http://localhost:3000/receitas/2
router.get('/:id', (req, res) => {
  // 1. Capturar o ID
  const { id } = req.params;

  // 2. Encontrar a receita
  const receitaEncontrada = receitas.find(receita => receita.id === id);

  // 3. Resposta
  if (receitaEncontrada) {
    res.status(200).json(receitaEncontrada);
  } else {
    res.status(404).json({ message: "Receita não encontrada" });
  }
});

// (No arquivo ReceitaRoutes.js, continue adicionando as rotas)

// ROTA PARA ATUALIZAR (UPDATE) UMA RECEITA
// Exemplo: PUT http://localhost:3000/receitas/1
router.put('/:id', (req, res) => {
  // 1. Pegar o ID da URL
  const { id } = req.params;

  // 2. Pegar os dados novos que vieram no "corpo" (body)
  const novosDados = req.body;

  // 3. Encontrar o *índice* (a posição) da receita no array
  // (Usamos findIndex em vez de find, pois precisamos saber *onde*
  // ela está no array para poder substituí-la)
  const index = receitas.findIndex(receita => receita.id === id);

  // 4. Verificar se encontrou (se o 'index' não for -1)
  if (index !== -1) {
    // Se encontrou:
    // Pega a receita antiga...
    const receitaAntiga = receitas[index];
    
    // ...e atualiza ela com os novos dados, mantendo o ID
    const receitaAtualizada = {
      ...receitaAntiga,  // Pega tudo da receita antiga
      ...novosDados,     // Substitui com o que veio nos novos dados
      id: id             // Garante que o ID não mude
    };

    // 5. Coloca a receita atualizada de volta no array, na mesma posição
    receitas[index] = receitaAtualizada;

    // 6. Retorna a receita atualizada
    res.status(200).json(receitaAtualizada);

  } else {
    // Se não encontrou (index === -1), retorna o erro 404
    res.status(404).json({ message: "Receita não encontrada" });
  }
});

// ROTA PARA DELETAR (DELETE) UMA RECEITA
// Exemplo: DELETE http://localhost:3000/receitas/2
router.delete('/:id', (req, res) => {
  // 1. Pegar o ID da URL
  const { id } = req.params;

  // 2. Encontrar o *índice* da receita no array
  const index = receitas.findIndex(receita => receita.id === id);

  // 3. Verificar se encontrou (se o 'index' não for -1)
  if (index !== -1) {
    // Se encontrou, usa o '.splice()' para remover o item do array
    // (splice remove 1 item a partir da posição 'index')
    receitas.splice(index, 1);

    // 4. Retorna uma mensagem de sucesso (sem conteúdo)
    // O status 204 (No Content) é perfeito para um DELETE bem-sucedido
    res.status(204).send();

  } else {
    // Se não encontrou, retorna o erro 404
    res.status(404).json({ message: "Receita não encontrada" });
  }
});

module.exports = router;

// testando