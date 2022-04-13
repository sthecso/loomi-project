import * as Joi from 'joi';

const validateUser: Joi.Schema = Joi.object({
  role: Joi.string().required(),
  email: Joi.string().min(8).required(),
  password: Joi.string().min(6).required(),
});

const validateCustomer: Joi.Schema = Joi.object({
  role: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().min(8).required(),
  password: Joi.string().min(6).required(),
  telephone: Joi.string().length(11).pattern(/^[0-9]+$/).required()
    .messages({
      'string.pattern.base': 'Phone number must have 11 digits.',
    }),
  address: Joi.string().required(),
});

const validateProduct: Joi.Schema = Joi.object({
  name: Joi.string().required(),
  code: Joi.string().required(),
  characteristics: Joi.string().required(),
  image: Joi.string().required(),
});

export {
  validateUser,
  validateCustomer,
  validateProduct,
};
