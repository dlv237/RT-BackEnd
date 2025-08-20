import { Express } from 'express';
import userRoutes from './userRoutes';
import { health } from '../controllers/healthController'

export function setRoutes(app: Express) {
  app.use('/users', userRoutes);
  app.get('/health', health)
}