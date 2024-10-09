const mongoose = require('mongoose');

const InspecaoSchema = new mongoose.Schema({
    descricao: { type: String, required: true },
    data: { type: Date, default: Date.now },
    plantacao: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Plantacao',
        required: true 
    }
});

module.exports = mongoose.model('Inspecao', InspecaoSchema);

