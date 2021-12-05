import Joi from 'joi';

const orderJoiSchema = Joi.object({
    id: Joi.string().required(),
    date: Joi.date().required(),
    quantity: Joi.number().required(),
    productID: Joi.string().required(),
    productName: Joi.string().required(),
});

export { orderJoiSchema };
