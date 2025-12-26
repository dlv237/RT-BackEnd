// routes/institutionRoutes.ts
import { Router } from 'express';
import { 
  createInstitution, 
  getInstitutions,
  getGuardiansFromInstitution
} from '../controllers/institutionController';
const router = Router();

/**
 * @openapi
 * /institutions:
 *   post:
 *     summary: Create an institution
 *     tags: [Institutions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateInstitutionInput'
 *     responses:
 *       201:
 *         description: Created institution
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Institution'
 */
router.post('/', createInstitution);
/**
 * @openapi
 * /institutions:
 *   get:
 *     summary: Get all institutions
 *     tags: [Institutions]
 *     responses:
 *       200:
 *         description: List of institutions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Institution'
 */
router.get('/', getInstitutions);
/**
 * @openapi
 * /institutions/{institutionId}/guardians:
 *   get:
 *     summary: Get guardians from an institution
 *     tags: [Institutions]
 *     parameters:
 *       - in: path
 *         name: institutionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Institution ID
 *     responses:
 *       200:
 *         description: List of guardians
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserWithGuardianLinks'
 */
router.get('/:institutionId/guardians', getGuardiansFromInstitution);
export default router;
