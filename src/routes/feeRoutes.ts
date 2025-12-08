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
 *         required: true
 *         schema:
 *           type: integer
 *         description: Institution ID
 *     responses:
 *       200:
 *         description: List of active fees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fee'
 *       404:
 *         description: Institution not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
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
 *             $ref: '#/components/schemas/SimulateFeePaymentRequest'
 *     responses:
 *       200:
 *         description: Simulated fee payment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SimulateFeePaymentResponse'
 *       400:
 *         description: Bad request - fees list is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Fee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 message:
 *                   type: string
 */
router.post('/simulate', simulateFeePayment);

export default router;