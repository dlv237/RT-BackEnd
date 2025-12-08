import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { Fee } from '@prisma/client';

// Get all active fees from an institution
export async function getFees(req: Request, res: Response, next: NextFunction) {
  try {
    const { institutionId } = req.params;

    const institution = await prisma.institution.findUnique({
      where: { id: Number(institutionId) },
      include: { Fees: { where: { currentlyActive: true } } }
    });
    if (!institution) {
      return res.status(404).json({ ok: false, message: 'Institution not found' });
    }
    res.status(200).json(institution.Fees);
  } catch (err) {
    next(err);
  }
}

export async function simulateFeePayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { fees, type, classModality, numberOfStudents, duration } = req.body;

    if (!fees || !Array.isArray(fees)) {
      return res.status(400).json({ ok: false, message: 'Fees list is required' });
    }

    const fee = findFeeByCriteria(fees, type, classModality, Number(numberOfStudents));
    if (!fee) {
      return res.status(404).json({ ok: false, message: 'Fee not found' });
    }

    const simulatedFeePayment = calculateFeeAmount(fee, Number(duration));

    res.status(200).json(simulatedFeePayment);
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
      fee.classModality === classModality &&
      fee.studentNumber === numberOfStudents
  );
}

function calculateFeeAmount(
  fee: Fee,
  duration: number
) {
  return {
    amountToPay: fee.amountToPay * Number(duration)/60,
    amountToCharge: fee.amountToCharge * Number(duration)/60
  };
}