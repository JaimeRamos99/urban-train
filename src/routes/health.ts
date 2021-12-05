import { Router } from 'express';
import { constants } from '../common/constants';
import { healthController } from '../controllers/health';

const router = Router();
router.get(constants.path.health, healthController);

export { router as healthRouter };
