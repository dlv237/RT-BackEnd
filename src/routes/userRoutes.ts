// routes/userRoutes.ts
import { Router } from 'express';
import { getUsers } from '../controllers/userController';

const router = Router();

router.get('/', getUsers); // GET /users → llama a getUsers()
export default router;
