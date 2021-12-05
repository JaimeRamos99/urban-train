import Joi from 'joi';
import joiDate from '@joi/date';

Joi.extend(joiDate);

const orderJoiSchema = Joi.object({
    id: Joi.string().required(),
    date: Joi.date().raw().required(),
    quantity: Joi.number().required(),
    productID: Joi.string().required(),
    productName: Joi.string().required(),
});

export { orderJoiSchema };
