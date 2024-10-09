const express = require('express');
const { getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de Usuários
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Lista todos os usuários
 *     security:
 *       - bearerAuth: []
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/', authMiddleware, getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtém um usuário pelo ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', authMiddleware, getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', authMiddleware, updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Deleta um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', authMiddleware, deleteUser);

module.exports = router;
