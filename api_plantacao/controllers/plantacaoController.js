const Plantacao = require('../models/plantacaoModel');
const User = require('../models/userModel');

exports.getPlantacoes = async (req, res) => {
  try {
    const plantacoes = await Plantacao.find().populate('user');
    res.json(plantacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlantacaoById = async (req, res) => {
  try {
    const plantacao = await Plantacao.findById(req.params.id).populate('user');
    if (!plantacao) {
      return res.status(404).json({ message: 'Plantação não encontrada' });
    }
    res.json(plantacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPlantacao = async (req, res) => {
  try {
    const plantacao = new Plantacao(req.body);
    await plantacao.save();
    res.status(201).json(plantacao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePlantacao = async (req, res) => {
  try {
    const plantacao = await Plantacao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!plantacao) {
      return res.status(404).json({ message: 'Plantação não encontrada' });
    }
    res.json(plantacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePlantacao = async (req, res) => {
  try {
    await Plantacao.findByIdAndDelete(req.params.id);
    res.json({ message: 'Plantação deletada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPlantacoesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verifique se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Encontre todas as plantações associadas a esse usuário
    const plantacoes = await Plantacao.find({ user: userId });

    res.status(200).json(plantacoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
