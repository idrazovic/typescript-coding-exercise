import { Router } from 'express';

import { getMessages, postMessage } from '../controllers/messages';
import { isAuth } from '../middleware/is-auth';

const router = Router();

router.get('/', getMessages);

router.post('/', isAuth, postMessage);

export default router;