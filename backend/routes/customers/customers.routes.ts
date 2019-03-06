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
    handler: handler.getAllCustomersHandler
  },
  {
    method: 'GET',
    path: '/api/customers/total',
    options: {
      description: 'Get total balance of all customers'
    },
    handler: handler.getTotalBalanceHandler
  },
  {
    method: 'GET',
    path: '/api/customers/inactive',
    options: {
      description: 'Get all inactive customers'
    },
    handler: handler.getInactiveCustomersHandler
  },
  {
    method: 'GET',
    path: '/api/customers/{guid}',
    options: {
      validate: {
        params: {
          guid: Joi.string().required()
        }
      },
      description: 'Get customer by guid'
    },
    handler: handler.getCustomerByGuidHandler
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
    handler: handler.createCustomerHandler
  },
  {
    method: 'PUT',
    path: '/api/customers/{guid}',
    options: {
      validate: {
        params: {
          guid: Joi.string().required()
        },
        payload: JoiCustomer
      },
      description: 'Update customer'
    },
    handler: handler.updateCustomerHandler
  },
  {
    method: 'DELETE',
    path: '/api/customers/{guid}',
    options: {
      validate: {
        params: {
          guid: Joi.string().required()
        }
      },
      description: 'Delete customer by guid'
    },
    handler: handler.deleterCustomerHandler
  }
];
