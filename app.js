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
// const userRoutes = require('./src/routes/userRoutes');
// app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
