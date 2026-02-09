import { Router } from 'express'
import { editCoordinatorProfitShare } from '../controllers/coordinatorController'

const router = Router()

/**
 * @openapi
 * /coordinators/{institutionId}/profit-share:
 *   patch:
 *     summary: Edit coordinator profit share
 *     description: Updates the profit share for a coordinator in a specific institution.
 *     tags: [Coordinators]
 *     parameters:
 *       - in: path
 *         name: institutionId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Institution ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EditCoordinatorProfitShareInput'
 *     responses:
 *       200:
 *         description: Coordinator profit share updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EditCoordinatorProfitShareResponse'
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Coordinator profit share not found
 */
router.patch('/:institutionId/profit-share', editCoordinatorProfitShare)

export default router

