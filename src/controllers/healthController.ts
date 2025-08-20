import { Request, Response, NextFunction } from 'express'
import { getHealth } from '../services/healthService'

export async function health(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = await getHealth()
    res.json(data)
  } catch (err) {
    next(err)
  }
}
