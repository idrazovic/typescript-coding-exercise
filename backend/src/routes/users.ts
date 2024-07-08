import { Router } from 'express';

import { loginUser, postUser } from '../controllers/users';

const router = Router();

router.post('/signup', postUser);

router.post('/login', loginUser);

export default router;