import { Router } from 'express';
import { constants } from '../common/constants';
import { saleController } from '../controllers/sale';
import { schemaValidation } from '../middlewares/requestSchema';

const router = Router();
router.post(constants.path.createSale, schemaValidation, saleController);

export { router as saleRouter };
