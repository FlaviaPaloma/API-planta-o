const Inspecao = require('../models/inspecaoModel');

exports.getInspecoes = async (req, res) => {
  try {
    const inspecoes = await Inspecao.find().populate('user').populate('plantacao');
    res.json(inspecoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getInspecaoById = async (req, res) => {
  try {
    const inspecao = await Inspecao.findById(req.params.id).populate('user').populate('plantacao');
    if (!inspecao) {
      return res.status(404).json({ message: 'Inspeção não encontrada' });
    }
    res.json(inspecao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createInspecao = async (req, res) => {
  try {
    const inspecao = new Inspecao(req.body);
    await inspecao.save();
    res.status(201).json(inspecao);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateInspecao = async (req, res) => {
  try {
    const inspecao = await Inspecao.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!inspecao) {
      return res.status(404).json({ message: 'Inspeção não encontrada' });
    }
    res.json(inspecao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteInspecao = async (req, res) => {
  try {
    await Inspecao.findByIdAndDelete(req.params.id);
    res.json({ message: 'Inspeção deletada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
