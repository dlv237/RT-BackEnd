import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function createGuardianTutorLink(req: Request, res: Response, next: NextFunction) {
    try {
        const { guardianId, tutorId, institutionId } = req.body;
        const userRole = (req as any).auth?.role;

        if (userRole !== 'admin' && userRole !== 'coordinator') {
            return res.status(403).json({ ok: false, message: 'Forbidden' });
        }

        const parsedGuardianId = Number(guardianId)
        const parsedTutorId = Number(tutorId)
        const parsedInstitutionId = Number(institutionId)

        if (!Number.isFinite(parsedGuardianId) || !Number.isFinite(parsedTutorId)) {
            return res.status(400).json({ ok: false, message: 'Guardian ID and Tutor ID are required' });
        }

        if (!Number.isFinite(parsedInstitutionId)) {
            return res.status(400).json({ ok: false, message: 'Institution ID is required' });
        }

        if (userRole === 'coordinator') {
            const coordinatorInstitutionId = (req as any).auth?.institutionId
            if (!coordinatorInstitutionId || Number(coordinatorInstitutionId) !== parsedInstitutionId) {
                return res.status(403).json({
                    ok: false,
                    message: 'Coordinators can only manage links for their institution.'
                })
            }
        }

        const created = await prisma.guardianTutor.create({
            data: {
                guardianId: parsedGuardianId,
                tutorId: parsedTutorId,
                institutionId: parsedInstitutionId,
                active: true,
            },
        })

        return res.status(201).json({ ok: true, link: created })
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
            return res.status(409).json({ ok: false, message: 'Guardian tutor link already exists' })
        }
        next(err)
    }
}

