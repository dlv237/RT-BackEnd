import { Router } from 'express';
import { getFees, simulateFeePayment } from '../controllers/feeController';

const router = Router();

/**
 * @openapi
 * /fees/{institutionId}:
 *   get:
 *     summary: Get all active fees from an institution
 *     tags: [Fees]
 *     parameters:
 *       - in: path
 *         name: institutionId
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of active fees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Institution/Fees'
 */
router.get('/:institutionId', getFees);

/**
 * @openapi
 * /fees/simulate:
 *   post:
 *     summary: Simulate a fee payment given a custom duration
 *     tags: [Fees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               institutionId:
 *                 type: integer
 *               type:
 *                 type: string
 *               classModality:
 *                 type: string
 *               numberOfStudents:
 *                 type: integer
 *               duration:
 *                 type: string
 *     responses:
 *       200:
 *         description: Simulated fee payment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 amountToPay:
 *                   type: number
 *                 amountToCharge:
 *                   type: number
 */
router.post('/simulate', simulateFeePayment);

export default router;