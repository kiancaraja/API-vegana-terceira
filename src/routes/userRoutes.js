// Exemplo de rota de usuário
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Lista de usuários (exemplo)' });
});

module.exports = router;
