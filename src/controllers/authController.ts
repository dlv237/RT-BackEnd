import { Request, Response } from "express";
import argon2 from "argon2";
import { SignJWT } from "jose";
import prisma from "../lib/prisma";

export async function login(req: Request, res: Response) {
  const { email, password } = req.body
  
  const user = await prisma.user.findUnique({ where: { email } })

  if (!user) {
    return res.status(401).json({ ok: false, message: 'Invalid credentials' })
  }

  const isPasswordValid = await argon2.verify(user.hashedPassword, password, {
    secret: Buffer.from(process.env.ARGON2_SECRET_PEPPER || '', 'base64')
  })

  if (!isPasswordValid) {
    return res.status(401).json({ ok: false, message: 'Invalid credentials' })
  }

  const jwt = await new SignJWT({ sub: user.id.toString() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRES_IN || '30m')
    .sign(Buffer.from(process.env.JWT_SECRET || '', 'base64'))
  res.json({ ok: true, token: jwt })
}