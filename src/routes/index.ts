import { Router } from 'express';
import 'express-async-errors';
import swagger from 'swagger-ui-express';
import { constants } from '../common/constants';
import { errorHandler } from '../middlewares/errorHandler';
import { healthRouter } from './health';
import { NotFoundError } from '../application/entities/errors/notFoundError';
import { purchaseRouter } from './createPurchase';
import { saleRouter } from './createSale';
import { swaggerDocument } from '../swagger';

const router = Router();

router.use(constants.path.docs, swagger.serve, swagger.setup(swaggerDocument));
router.use(healthRouter);
router.use(purchaseRouter);
router.use(saleRouter);

router.all('*', async () => {
    throw new NotFoundError();
});

router.use(errorHandler);

export default router;
