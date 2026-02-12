import { Router } from 'express';
import { 
    getCashFlowSummary,
} from '../controllers/cashFlowController';

const router = Router();

/**
 * @openapi
 * /cashflow/summary:
 *   get:
 *     summary: Get cash flow summary
 *     tags: [CashFlow]
 *     description: |
 *       Returns a summary of amounts to receive and pay.
 *       
 *       **Logic based on Authenticated User Role:**
 *
 *       For **admin**:
 *       - Returns global financial summary and admin profit shares.
 *       - \`institutionId\` is optional to filter specific institution class payments.
 *
 *       For **coordinator**:
 *       - Returns financial summary scoped to their assigned institution and their profit shares.
 *       - Institution ID is automatically inferred from the user credential.
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date (must be the first day of the month)
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date (must be the last day of the month)
 *       - in: query
 *         name: institutionId
 *         schema:
 *           type: integer
 *         description: Optional filter by institution ID (Only for admin role)
 *     responses:
 *       200:
 *         description: Cash flow summary
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 amountToReceive:
 *                   type: number
 *                   description: Total pending payments from Guardians
 *                 amountReceived:
 *                   type: number
 *                   description: Total completed payments from Guardians
 *                 amountToPay:
 *                   type: number
 *                   description: Total pending payments to Tutors
 *                 amountPaid:
 *                   type: number
 *                   description: Total completed payments to Tutors
 *                 adminPayments:
 *                   type: array
 *                   description: List of admin profit share payments (only if role=admin)
 *                   items:
 *                     type: object
 *                     properties:
 *                       amount:
 *                         type: number
 *                       status:
 *                         type: string
 *                         enum: [pending, completed]
 *                       period:
 *                         type: string
 *                         format: date-time
 *                 coordinatorPayments:
 *                   type: array
 *                   description: List of coordinator profit share payments (only if role=coordinator)
 *                   items:
 *                     type: object
 *                     properties:
 *                       amount:
 *                         type: number
 *                       status:
 *                         type: string
 *                         enum: [pending, completed]
 *                       period:
 *                         type: string
 *                         format: date-time
 *                 adminAmountToReceive:
 *                   type: number
 *                   description: Total pending profit share amount for Admin
 *                 adminAmountReceived:
 *                   type: number
 *                   description: Total completed profit share amount for Admin
 *                 coordinatorAmountToReceive:
 *                   type: number
 *                   description: Total pending profit share amount for Coordinator
 *                 coordinatorAmountReceived:
 *                   type: number
 *                   description: Total completed profit share amount for Coordinator
 *       400:
 *         description: Bad Request (Missing dates, invalid formats, or non-matching start/end dates)
 *       403:
 *         description: Forbidden (Invalid role or permissions)
 */
router.get('/summary', getCashFlowSummary)

export default router;