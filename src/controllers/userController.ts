import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export async function getUsers(req: Request, res: Response) {
  const users = await prisma.user.findMany();
  res.json(users);
}