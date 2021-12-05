import { Router } from 'express';
import { constants } from '../common/constants';
import { saleController } from '../controllers/sale';
import { schemaValidation } from '../middlewares/schema';

const router = Router();
router.post(constants.path.createSale, schemaValidation, saleController);

export { router as saleRouter };
