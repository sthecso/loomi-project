import * as Joi from 'joi';

const validateUser: Joi.Schema = Joi.object({
  role: Joi.string().required(),
  email: Joi.string().min(8).required(),
  password: Joi.string().min(6).required(),
});

const validateCustomer: Joi.Schema = Joi.object({
  role: Joi.string().required(),
  nome: Joi.string().required(),
  email: Joi.string().min(8).required(),
  password: Joi.string().min(6).required(),
  telephone: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
  address: Joi.string().required(),
});

export {
  validateUser,
  validateCustomer,
};
