import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { Fee } from '@prisma/client';


// TO DO: filter the permission to allow only the admin to see any institution's fees
// and the coordinator, tutor or parent to see the fees of their own institution
export async function getFees(req: Request, res: Response, next: NextFunction) {
  try {
    const { institutionId } = req.params;
    const fees = await getActiveInstitutionFees(Number(institutionId));
    if (!fees) {
      return res.status(404).json({ ok: false, message: 'Institution not found' });
    }
    res.status(200).json(fees);
  } catch (err) {
    next(err);
  }
}

export async function simulateFeePayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { institutionId, type, classModality, numberOfStudents, duration } = req.body;

    const fees = await getActiveInstitutionFees(Number(institutionId));
    if (!fees) {
      return res.status(404).json({ ok: false, message: 'Institution not found' });
    }

    const fee = findFeeByCriteria(fees, type, classModality, Number(numberOfStudents));
    if (!fee) {
      return res.status(404).json({ ok: false, message: 'Fee not found' });
    }

    const durationInHours = convertDurationToHours(duration);
    const simulatedFeePayment = calculateFeeAmount(fee, durationInHours);

    res.status(200).json(simulatedFeePayment);
  } catch (err) {
    next(err);
  }
}

// ############################################################
// #################### UTILITY FUNCTIONS #####################
// ############################################################

async function getActiveInstitutionFees(institutionId: number) {
  const institution = await prisma.institution.findUnique({
    where: { id: institutionId },
    include: { Fees: { where: { currentlyActive: true } } }
  });
  return institution?.Fees || null;
}

// Get a specific fee
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

// Convert hours:minutes format to decimal hours
// TO DO: Adapt this to the format given by frontend
function convertDurationToHours(duration: string): number {
  const [hours, minutes] = duration.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) {
    throw new Error('Invalid duration format. Expected format: hours:minutes (e.g., "1:30")');
  }
  return hours + minutes / 60;
}

function calculateFeeAmount(
  fee: Fee,
  durationInHours: number
) {
  return {
    amountToPay: fee.amountToPay * durationInHours,
    amountToCharge: fee.amountToCharge * durationInHours
  };
}