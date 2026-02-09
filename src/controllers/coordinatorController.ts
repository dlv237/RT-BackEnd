import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

// Edit CoordinatorProfitShare
export async function editCoordinatorProfitShare(req: Request, res: Response, next: NextFunction) {
  try {
    const { institutionId } = req.params;
    const { profitShare, coordinatorId } = req.body;
    const userRole = (req as any).auth?.role;

    if (userRole !== 'admin') {
      return res.status(403).json({ ok: false, message: 'Forbidden' });
    }

    if (typeof profitShare !== 'number' || profitShare < 0 || profitShare > 100) {
      return res.status(400).json({ ok: false, message: 'Profit share must be a number between 0 and 100' });
    }
    
    const parsedInstitutionId = Number(institutionId)
    const parsedCoordinatorId = Number(coordinatorId)

    if (!Number.isFinite(parsedInstitutionId)) {
      return res.status(400).json({ ok: false, message: 'Institution ID is required' });
    }

    if (!Number.isFinite(parsedCoordinatorId)) {
      return res.status(400).json({ ok: false, message: 'Coordinator ID is required' });
    }

    const existing = await prisma.coordinatorProfitShare.findUnique({
      where: {
        coordinatorId_institutionId: {
          coordinatorId: parsedCoordinatorId,
          institutionId: parsedInstitutionId,
        },
      },
      select: { id: true },
    })

    if (!existing) {
      return res.status(404).json({
        ok: false,
        message: 'Coordinator profit share not found for this institution.',
      })
    }

    await prisma.coordinatorProfitShare.update({
      where: {
        coordinatorId_institutionId: {
          coordinatorId: parsedCoordinatorId,
          institutionId: parsedInstitutionId,
        },
      },
      data: {
        profitShare,
      },
    })

    res.status(200).json({ ok: true, message: 'Coordinator profit share updated successfully' });
  } catch (err) {
    next(err);
  }
}