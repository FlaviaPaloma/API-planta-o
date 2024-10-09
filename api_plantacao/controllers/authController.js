const bcrypt = require('bcrypt');
const User = require('../models/userModel'); // Modelo de usuário

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Verificar se o usuário existe
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Usuário não encontrado' });
        }

        // Verificar se a senha está correta
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Senha incorreta' });
        }

        // Gerar token JWT
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Expiração de 1 hora
        });

        res.header('Authorization', token).json({
            message: 'Login realizado com sucesso!',
            token
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao realizar login' });
    }
};


