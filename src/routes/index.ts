import { Router } from 'express';
import swagger from 'swagger-ui-express';
import { constants } from '../common/constants';
import { errorHandler } from '../middlewares/errors';
import { swaggerDocument } from '../swagger';
import { purchaseRouter } from './createPurchase';
import { saleRouter } from './createSale';
import { healthRouter } from './health';

const router = Router();

router.use(constants.path.docs, swagger.serve, swagger.setup(swaggerDocument));
router.use(healthRouter);
router.use(purchaseRouter);
router.use(saleRouter);

router.use(errorHandler);

export default router;
