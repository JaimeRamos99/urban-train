import { Router } from 'express';
import { constants } from '../common/constants';
import { schemaValidation } from '../middlewares/requestSchema';
import { purchaseController } from '../controllers/purchase';

const router = Router();
router.post(constants.path.createPurchase, schemaValidation, purchaseController);

export { router as purchaseRouter };
