// routes/userRoutes.ts
import { Router } from 'express';
import { getUsers } from '../controllers/userController';

const router = Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: List users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', getUsers); // GET /users → llama a getUsers()
export default router;
