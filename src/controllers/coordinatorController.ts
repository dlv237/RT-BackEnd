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

    if (coordinatorId === null || coordinatorId === undefined) {
      return res.status(400).json({ ok: false, message: 'Coordinator ID is required' });
    }

    // Update the coordinator profit share

    await prisma.coordinatorProfitShare.update({
        where: { institutionId: Number(institutionId) },
        data: { profitShare, coordinatorId },
      });

    res.status(200).json({ ok: true, message: 'Coordinator profit share updated successfully' });
  } catch (err) {
    next(err);
  }
}