const express = require('express');
const router = express.Router();
const Inspecao = require('../models/inspecaoModel');
const Plantacao = require('../models/plantacaoModel');

router.post('/create', async (req, res) => {
    try {
        const { descricao, plantacaoId } = req.body;

        const plantacao = await Plantacao.findById(plantacaoId);
        if (!plantacao) {
            return res.status(404).json({ message: 'Plantação não encontrada' });
        }

        const inspecao = new Inspecao({
            descricao,
            plantacao: plantacao._id
        });

        await inspecao.save();

        plantacao.inspecoes.push(inspecao._id);
        await plantacao.save();

        res.status(201).json({ message: 'Inspeção criada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar inspeção' });
    }
});

module.exports = router;
