import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { rateLimiter } from '../middleware/rateLimiter';
import { validate } from '../middleware/validation';
import { loginSchema } from '../validators/auth.validator';
const router = Router();
router.post('/login', rateLimiter('login'), validate(loginSchema), AuthController.login);
router.post('/logout', AuthController.logout);
export default router;
