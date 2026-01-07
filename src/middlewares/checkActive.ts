import { Request, Response, NextFunction } from 'express'
import prisma from '../lib/prisma'

/**
 * Middleware to check if an authenticated user is active (isActive === true)
 */
export async function checkActive(req: Request, res: Response, next: NextFunction) {
  try {
    const auth = (req as any).auth
    
    // If no auth info, let other middleware handle it
    if (!auth || !auth.sub) {
      return next()
    }

    // For Swagger dev mock, skip the check
    if (auth.sub === 'swagger-dev') {
      return next()
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(auth.sub) },
      select: { isActive: true }
    })

    if (!user) {
      return res.status(401).json({ ok: false, message: 'User not found' })
    }

    if (!user.isActive) {
      return res.status(403).json({ ok: false, message: 'User account is inactive' })
    }

    next()
  } catch (err) {
    next(err)
  }
}
