import mongoose from 'mongoose';

const receitaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  ingredientes: {
    type: [String],
    required: true
  },
  modoDePreparo: {
    type: Number,
    required: true 
  },
  tempoDePreparo: {
    type: Number,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
    }
    });

    const ReceitaModel = mongoose.model('Receita', receitaSchema);

    export default ReceitaModel