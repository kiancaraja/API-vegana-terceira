const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('API Vegana - Express funcionando!');
});

// Importar rotas
// Antes (exemplo):
// const userRoutes = require('./src/routes/UserRoutes');

// Depois:
const receitaRoutes = require('./src/routes/ReceitaRoutes');
// app.use('/users', userRoutes);

app.use('/receitas', receitaRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
