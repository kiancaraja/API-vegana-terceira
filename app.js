// (No topo do app.js)
// MODO CORRETO (ESM) de carregar o .env
import express, { json } from 'express';
import mongoose from 'mongoose'; // Importar o mongoose principal
import receitaRoutes from './src/routes/ReceitaRoutes.js'; // <-- ADICIONAR .js


// Pega a string de conexão do arquivo .env
const mongoUrl = process.env.DATABASE_URL;

// LINHA DE TESTE:
console.log('Variável de Ambiente:', mongoUrl); 

// Conecta ao banco de dados
mongoose.connect(mongoUrl); // Usar mongoose.connect
// ...
// Conecta ao banco de dados
mongoose.connect(mongoUrl); // Usar mongoose.connect
const db = mongoose.connection; // Usar mongoose.connection

// Logs para sabermos se conectou com sucesso ou se deu erro
db.on('error', (error) => console.error('Erro ao conectar no Mongo:', error));
db.once('open', () => console.log('Conectado ao MongoDB com sucesso! 🌴'));

const app = express();
const port = process.env.PORT || 3000;

// Middleware para JSON
app.use(json());

// Rota de exemplo
app.get('/', (req, res) => {
  res.send('API Vegana - Express funcionando!');
});

// Importar rotas
app.use('/receitas', receitaRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
