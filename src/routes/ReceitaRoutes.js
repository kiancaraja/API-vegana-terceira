import { Router } from 'express';
import ReceitaModel from '../models/Receita.js'; // 1. Importa a "Construtora"

const router = Router();

// ROTA PARA BUSCAR TODAS AS RECEITAS (GET /receitas)
// (Aqui estava o erro 'resizeBy' que já corrigimos)
router.get('/', async (req, res) => {
  try {
    // 2. USA a construtora para encontrar todas as receitas
    const receitas = await ReceitaModel.find({}); 
    
    // 3. Devolve as receitas que encontrou
    res.status(200).json(receitas);

  } catch (error) {
    // 4. Se o Mongoose falhar, o catch pega o erro
    console.error('Erro ao buscar receitas:', error);
    res.status(500).json({ message: 'Erro no servidor ao tentar buscar receitas.' });
  }
});


// ROTA PARA CRIAR UMA NOVA RECEITA (POST /receitas)
router.post('/', async (req, res) => {
  try {
    const { titulo, ingredientes, modoDePreparo, tempoDePreparo } = req.body;
    
    if (!titulo || !ingredientes || !modoDePreparo) {
      return res.status(400).json({ message: 'Título, ingredientes e modo de preparo são obrigatórios.' });
    }

    const novaReceita = new ReceitaModel({ 
      titulo,
      ingredientes,
      modoDePreparo,
      tempoDePreparo
    });

    const receitaSalva = await novaReceita.save();
    res.status(201).json(receitaSalva);

  } catch (error) {
    console.error('Erro ao salvar a receita:', error);
    res.status(500).json({ message: 'Erro no servidor ao tentar salvar a receita.' });
  }
});

// 5. O EXPORT (TEM QUE SER A ÚLTIMA COISA!)
export default router;