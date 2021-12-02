import { Router } from 'express';
import swagger from 'swagger-ui-express';
import { constants } from '../common/constants';
import { healthController } from '../controllers/health';
import { purchaseController } from '../controllers/purchase';
import { saleController } from '../controllers/sale';
import { errorHandler } from '../middlewares/errors';
import { swaggerDocument } from '../swagger';

const router = Router();

router.use(constants.path.docs, swagger.serve, swagger.setup(swaggerDocument));
router.get(constants.path.health, healthController);
router.post(constants.path.createPurchase, purchaseController);
router.post(constants.path.createSale, saleController);

router.use(errorHandler);

export default router;
