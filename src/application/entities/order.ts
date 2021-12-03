import Joi from 'joi';

const orderJoiSchema = Joi.object({
    id: Joi.string().required(),
    fecha: Joi.date().required(),
    cantidad: Joi.number().required(),
    idProducto: Joi.string().required(),
    nombreProducto: Joi.string().required(),
});

export { orderJoiSchema };
