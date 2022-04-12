import * as Joi from 'joi';

const validateUser: Joi.Schema = Joi.object({
  role: Joi.string().required(),
  email: Joi.string().min(8).required(),
  password: Joi.string().min(6).required(),
});

export default validateUser;
