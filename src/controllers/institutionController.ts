import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { UserRole, ClassType, ClassModality } from '@prisma/client';

const BASE_FEES = [
  { type: ClassType.school, modality: ClassModality.online, numberOfStudents: 1 },
  { type: ClassType.school, modality: ClassModality.inPerson, numberOfStudents: 1 },
  { type: ClassType.school, modality: ClassModality.online, numberOfStudents: 2 },
  { type: ClassType.school, modality: ClassModality.inPerson, numberOfStudents: 2 },
  { type: ClassType.school, modality: ClassModality.online, numberOfStudents: 3 },
  { type: ClassType.school, modality: ClassModality.inPerson, numberOfStudents: 3 },

  { type: ClassType.university, modality: ClassModality.online, numberOfStudents: 1 },
  { type: ClassType.university, modality: ClassModality.inPerson, numberOfStudents: 1 },
  { type: ClassType.university, modality: ClassModality.online, numberOfStudents: 2 },
  { type: ClassType.university, modality: ClassModality.inPerson, numberOfStudents: 2 },
  { type: ClassType.university, modality: ClassModality.online, numberOfStudents: 3 },
  { type: ClassType.university, modality: ClassModality.inPerson, numberOfStudents: 3 },

  { type: ClassType.cancelled, modality: ClassModality.online, numberOfStudents: 0 },
  { type: ClassType.cancelled, modality: ClassModality.inPerson, numberOfStudents: 0 },
];

export async function createInstitution(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.body;

    const institution = await prisma.institution.create({
      data: { name }
    });

    const feeData = BASE_FEES.map((fee) => ({
      ...fee
        }));

    // Insert sequentially to avoid any sequence/id conflict issues.
    for (const data of feeData) {
      await prisma.fee.createMany
      (
        { data: { ...data, institutionId: institution.id }  }
      );
    }

    const fees = await prisma.fee.findMany({
      where: { institutionId: institution.id },
      orderBy: [{ type: 'asc' }, { modality: 'asc' }, { numberOfStudents: 'asc' }],
    });

    res.status(201).json({ institution, fees });
  }
  catch (err) {
    next(err);
  }
}
export async function getInstitutions(_req: Request, res: Response, next: NextFunction) {
  try {
    const institutions = await prisma.institution.findMany();
    res.json(institutions);
  } catch (err) {
    next(err);
  }
}

export async function getGuardiansFromInstitution(req: Request, res: Response, next: NextFunction) {
  try {
    const { institutionId } = req.params;
    
    const guardians = await prisma.user.findMany({
      where: {
        institutionId: Number(institutionId),
        role: UserRole.guardian,
      },
      select: {
        id: true,
        name: true,
        Students: {
          select: {
            id: true,
            name: true,
          }
        },
        GuardianLinks: { 
          select: { 
            tutorId: true,
            Tutor: {
              select: {
                name: true,
              }
            }
          } 
        }
      }
    })
    res.json(guardians);
  } catch (err) {
    next(err);
  }
}

export async function deleteInstitution(req: Request, res: Response, next: NextFunction) {
  try {
    console.log('TODO: delete institution');
    res.status(200).json({ ok: true, message: 'TODO: delete institution' });
  }
  catch (err) {
    next(err);
  }
}

export async function searchInstitutions(req: Request, res: Response, next: NextFunction) {
  try {
    const { query } = req.query;

    const userRole = (req as any).auth?.role;

    if (userRole !== 'admin') {
      return res.status(403).json({ ok: false, message: 'Forbidden' });
    }

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ ok: false, message: 'Search query is required' });
    }

    const institutions = await prisma.institution.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      orderBy: {
        name: 'asc',
      },
    });

    res.json(institutions);
  } catch (err) {
    next(err);
  }
}