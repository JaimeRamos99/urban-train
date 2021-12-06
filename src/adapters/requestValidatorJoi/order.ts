import baseJoi from 'joi';
import joiDate from '@joi/date';
import { constants } from '../../common/constants';

const Joi = baseJoi.extend(joiDate);

const orderJoiSchema = Joi.object({
    id: Joi.string().required(),
    date: Joi.date().format(constants.time.dateFormat).raw().required(),
    quantity: Joi.number().required(),
    productID: Joi.string().required(),
    productName: Joi.string().required(),
});

export { orderJoiSchema };
