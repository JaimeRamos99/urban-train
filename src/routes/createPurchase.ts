import { Router } from 'express';
import { constants } from '../common/constants';
import { schemaValidation } from '../middlewares/schema';
import { purchaseController } from '../controllers/purchase';

const router = Router();
router.post(constants.path.createPurchase, schemaValidation, purchaseController);

export { router as purchaseRouter };
