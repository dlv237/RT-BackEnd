import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { UserRole } from '@prisma/client';

export async function createInstitution(req: Request, res: Response, next: NextFunction) {
  try {
    const { name } = req.body;
    
    const newInstitution = await prisma.institution.create({
      data: {
        name
      }
    });
    res.status(201).json(newInstitution);
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
  }
  catch (err) {
    next(err);
  }
}