import Joi from 'joi';

export const JoiCustomer = Joi.object().keys({
  index: Joi.string().optional(),
  guid: Joi.string().optional(),
  isactive: Joi.boolean(),
  balance: Joi.number().integer(),
  age: Joi.number().integer(),
  name: Joi.strict(),
  gender: Joi.string(),
  company: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  address: Joi.string(),
  registered: Joi.string()
});
