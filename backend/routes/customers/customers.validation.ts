import Joi from 'joi';

export const JoiCustomer = Joi.object().keys({
  _id: Joi.string().optional(),
  index: Joi.string().optional(),
  guid: Joi.string().optional(),
  isActive: Joi.boolean(),
  balance: Joi.number()
    .integer()
    .required(),
  age: Joi.number()
    .integer()
    .required(),
  name: Joi.strict().required(),
  gender: Joi.string().required(),
  company: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  registered: Joi.string().optional()
});
