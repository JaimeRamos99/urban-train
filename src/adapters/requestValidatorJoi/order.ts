import baseJoi from 'joi';
import joiDate from '@joi/date';
import { constants } from '../../common/constants';

const Joi = baseJoi.extend(joiDate);

const orderJoiSchema = Joi.object({
    id: Joi.string().min(3).max(30).required(),
    date: Joi.date().format(constants.time.dateFormat).raw().required(),
    time: Joi.string().length(8),
    quantity: Joi.number().integer().min(1).max(30).required(),
    productID: Joi.string().min(3).max(30).required(),
    productName: Joi.string().min(3).max(30).required(),
});

export { orderJoiSchema };
