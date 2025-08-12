import { Express } from 'express';
import userRoutes from './userRoutes';

export function setRoutes(app: Express) {
  app.use('/users', userRoutes);
}