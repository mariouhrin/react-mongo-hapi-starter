import Joi from 'joi';
import * as handler from './customers.handler';
import { JoiCustomer } from './customers.validation';

export default [
  {
    method: 'GET',
    path: '/api/customers',
    options: {
      description: 'Get all customers'
    },
    handler: handler.getAllCustomers
  },
  {
    method: 'GET',
    path: '/api/customers/total',
    options: {
      description: 'Get total balance of all customers'
    },
    handler: handler.getTotalBalance
  },
  {
    method: 'GET',
    path: '/api/customers/inactive',
    options: {
      description: 'Get all inactive customers'
    },
    handler: handler.getInactiveCustomers
  },
  {
    method: 'GET',
    path: '/api/customers/{_id}',
    options: {
      validate: {
        params: {
          _id: Joi.string().required()
        }
      },
      description: 'Get customer by _id'
    },
    handler: handler.getCustomerByGuid
  },
  {
    method: 'POST',
    path: '/api/customers',
    options: {
      validate: {
        payload: JoiCustomer
      },
      description: 'Create new customer'
    },
    handler: handler.createCustomer
  },
  {
    method: 'PUT',
    path: '/api/customers/{_id}',
    options: {
      validate: {
        params: {
          _id: Joi.string().required()
        },
        payload: JoiCustomer
      },
      description: 'Update customer data'
    },
    handler: handler.updateCustomer
  },
  {
    method: 'DELETE',
    path: '/api/customers/{_id}',
    options: {
      validate: {
        params: {
          _id: Joi.string().required()
        }
      },
      description: 'Delete customer by _id'
    },
    handler: handler.deleterCustomer
  }
];
