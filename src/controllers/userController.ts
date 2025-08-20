import { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';

export async function getUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    next(err);
  }
}