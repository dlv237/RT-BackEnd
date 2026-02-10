import { Router } from 'express'
import { createGuardianTutorLink } from '../controllers/tutorController'

const router = Router()

/**
 * @openapi
 * /tutors/guardian-links:
 *   post:
 *     summary: Create a guardian-tutor link
 *     description: Creates a GuardianTutor link.
 *     tags: [Tutors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateGuardianTutorLinkInput'
 *     responses:
 *       201:
 *         description: Link created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateGuardianTutorLinkResponse'
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 *       409:
 *         description: Link already exists
 */
router.post('/guardian-links', createGuardianTutorLink)

export default router
