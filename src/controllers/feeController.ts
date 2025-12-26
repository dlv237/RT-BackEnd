import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { Fee } from '@prisma/client';

// Get all active fees from an institution
export async function getFees(req: Request, res: Response, next: NextFunction) {
  try {
    const { institutionId } = req.params;

    const fees = await prisma.fee.findMany({
      where: { institutionId: Number(institutionId) }
    });
    res.status(200).json(fees);
  } catch (err) {
    next(err);
  }
}

export async function simulateFeePayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { fees, type, classModality, numberOfStudents, duration } = req.body;

    const userRole = (req as any).auth?.role;

    if (!fees || !Array.isArray(fees)) {
      return res.status(400).json({ ok: false, message: 'Fees list is required' });
    }

    const fee = findFeeByCriteria(fees, type, classModality, Number(numberOfStudents));
    if (!fee) {
      return res.status(404).json({ ok: false, message: 'Fee not found' });
    }

    const simulatedFeePayment = calculateFeeAmount(fee, Number(duration));

    if (userRole === 'guardian') {
      const result = simulatedFeePayment.guardianAmount
      res.status(200).json({ ok: true, result });
    } 
    else if (userRole === 'tutor') {
      const result = simulatedFeePayment.tutorAmount
      res.status(200).json({ ok: true, result });
    }
    else {
      const result = simulatedFeePayment.tutorAmount
      res.status(200).json({ ok: true, result });
    }
  } catch (err) {
    next(err);
  }
}

// ############################################################
// #################### UTILITY FUNCTIONS #####################
// ############################################################

function findFeeByCriteria(
  fees: Fee[],
  type: string,
  classModality: string,
  numberOfStudents: number
): Fee | undefined {
  return fees.find(
    fee =>
      fee.type === type &&
      fee.modality === classModality &&
      fee.numberOfStudents === numberOfStudents
  );
}

function calculateFeeAmount(
  fee: Fee,
  duration: number
) {
  return {
    guardianAmount: fee.guardianAmount * Number(duration)/60,
    tutorAmount: fee.tutorAmount * Number(duration)/60
  };
}