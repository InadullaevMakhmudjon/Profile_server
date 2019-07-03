import { Router } from 'express';
import { check, validate } from '../utils/validation/user';
import middleware from '../middlewares/middleware';
import auth from '../controllers/auth';

const router = Router();

router.get('/about', middleware, auth.about);
router.post('/login', auth.login);
router.post('/register', check, validate, auth.register);

export default router;
