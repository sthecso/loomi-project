import * as Joi from 'joi';

const schemaBase = (schema: Joi.Schema, body: object) => {
  const { error } = schema.validate(body);
  if (error) throw error;
};

export default schemaBase;
