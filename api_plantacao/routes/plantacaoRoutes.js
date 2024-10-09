const express = require('express');
const {
  getPlantacoes,
  getPlantacaoById,
  createPlantacao,
  updatePlantacao,
  deletePlantacao,
  getPlantacoesByUserId
} = require('../controllers/plantacaoController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Plantações
 *   description: Gerenciamento de Plantações
 */

/**
 * @swagger
 * /api/plantacoes:
 *   get:
 *     summary: Lista todas as plantações
 *     tags: [Plantações]
 *     responses:
 *       200:
 *         description: Lista de plantações
 */
router.get('/', authMiddleware, getPlantacoes);

/**
 * @swagger
 * /api/plantacoes/{id}:
 *   get:
 *     summary: Obtém uma plantação pelo ID
 *     tags: [Plantações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da plantação
 *     responses:
 *       200:
 *         description: Detalhes da plantação
 *       404:
 *         description: Plantação não encontrada
 */
router.get('/:id', authMiddleware, getPlantacaoById);

/**
 * @swagger
 * /api/plantacoes:
 *   post:
 *     summary: Cria uma nova plantação
 *     tags: [Plantações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               localizacao:
 *                 type: string
 *               user:
 *                 type: string
 *     responses:
 *       201:
 *         description: Plantação criada com sucesso
 *       400:
 *         description: Erro na requisição
 */
router.post('/', authMiddleware, createPlantacao);

/**
 * @swagger
 * /api/plantacoes/{id}:
 *   put:
 *     summary: Atualiza uma plantação existente
 *     tags: [Plantações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da plantação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               localizacao:
 *                 type: string
 *               user:
 *                 type: string
 *     responses:
 *       200:
 *         description: Plantação atualizada com sucesso
 *       404:
 *         description: Plantação não encontrada
 */
router.put('/:id', authMiddleware, updatePlantacao);

/**
 * @swagger
 * /api/plantacoes/{id}:
 *   delete:
 *     summary: Deleta uma plantação existente
 *     tags: [Plantações]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da plantação
 *     responses:
 *       200:
 *         description: Plantação deletada com sucesso
 *       404:
 *         description: Plantação não encontrada
 */
router.delete('/:id', authMiddleware, deletePlantacao);

/**
 * @swagger
 * /api/plantacoes/user/{userId}:
 *   get:
 *     summary: Retorna todas as plantações de um usuário específico
 *     tags: [Plantações]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de plantações do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plantacao'
 *       401:
 *         description: Usuário não autenticado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/user/:userId', authMiddleware, getPlantacoesByUserId);

module.exports = router;
