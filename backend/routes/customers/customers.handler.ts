import { Request, ResponseToolkit } from 'hapi';
import * as controller from './customers.controller';
import { getBoomError } from '../../lib/error-utils';

export async function getAllCustomersHandler(request: Request, h: ResponseToolkit) {
  try {
    const customers: Customer[] = await controller.getAllCustomers();
    return h.response(customers).code(200);
  } catch (e) {
    return getBoomError(e);
  }
}

export async function getTotalBalanceHandler(request: Request, h: ResponseToolkit) {
  try {
    const totalBalance = await controller.getTotalBalance();
    return h.response({ totalBalance }).code(200);
  } catch (e) {
    return getBoomError(e);
  }
}

export async function getInactiveCustomersHandler(request: Request, h: ResponseToolkit) {
  try {
    const inactiveCustomers: Customer[] = await controller.getInactiveCustomers();
    return h.response(inactiveCustomers).code(200);
  } catch (e) {
    return getBoomError(e);
  }
}

export async function getCustomerByGuidHandler(request: Request, h: ResponseToolkit) {
  const { guid } = request.params;

  try {
    const customer: Customer = await controller.getCustomerByGuid(guid);
    return h.response(customer).code(200);
  } catch (e) {
    return getBoomError(e);
  }
}

export async function createCustomerHandler(request: Request, h: ResponseToolkit) {
  const customer: Customer = request.payload as Customer;

  try {
    const customerGuid = await controller.createCustomer(customer);
    return h.response({ customerGuid }).code(201);
  } catch (e) {
    return getBoomError(e);
  }
}

export async function updateCustomerHandler(request: Request, h: ResponseToolkit) {
  const { guid } = request.params;
  const customer: Customer = request.payload as Customer;

  try {
    await controller.updateCustomer(customer, guid);
    return h.response().code(204);
  } catch (e) {
    return getBoomError(e);
  }
}

export async function deleterCustomerHandler(request: Request, h: ResponseToolkit) {
  const { guid } = request.params;

  try {
    await controller.deleteCustomerByGuid(guid);
    return h.response().code(204);
  } catch (e) {
    return getBoomError(e);
  }
}
