const mongoose = require('mongoose');

const PlantacaoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    localizacao: { type: String, required: true },
    inspecoes: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Inspecao' 
    }]
});

module.exports = mongoose.model('Plantacao', PlantacaoSchema);
