import _ from 'lodash';

import * as dao from '../../dao/customers.dao';
import { NotFoundError } from '../../lib/error-utils';
import { transformingData } from './customers.utils';

export async function getAllCustomers(): Promise<Customer[]> {
  const allCustomersData = await dao.getAllCustomersDao();

  if (_.isEmpty(allCustomersData)) {
    throw new NotFoundError('Customers not found.');
  }

  const transformData = transformingData(allCustomersData);
  return transformData;
}

export async function getTotalBalance(): Promise<number> {
  const totalBalance = await dao.getTotalBalanceDao();

  if (_.isEmpty(totalBalance)) {
    throw new NotFoundError('Cannot get total balance');
  }
  return totalBalance;
}

export async function getInactiveCustomers(): Promise<Customer[]> {
  const inactiveCustomers: Customer[] = await dao.getInactiveCustomersDao();

  if (_.isEmpty(inactiveCustomers)) {
    throw new NotFoundError('Not found inactive customers');
  }

  const transformData = transformingData(inactiveCustomers);

  return transformData;
}

export async function getCustomerByGuid(guid: string): Promise<Customer> {
  const customer: Customer = await dao.getCustomerByGuidDao(guid);

  if (_.isEmpty(customer)) {
    throw new NotFoundError('Not found customer by guid');
  }

  return customer;
}

export async function createCustomer(customer: Customer): Promise<string> {
  const transaction = await dao.createTransaction();

  try {
    const newCustomerGuid = await dao.createCustomerDao(customer, transaction);
    transaction.commit();
    return newCustomerGuid;
  } catch (e) {
    transaction.rollback(e);
    throw e;
  }
}

export async function updateCustomer(customer: Customer, guid: string): Promise<void> {
  const checkCustomer = await dao.getCustomerByGuidDao(guid);

  if (_.isEmpty(checkCustomer)) {
    throw new NotFoundError('Not found customer by guid');
  }

  const transaction = await dao.createTransaction();

  try {
    await dao.updateCustomerDao(customer, guid, transaction);
    transaction.commit();
    return;
  } catch (e) {
    transaction.rollback(e);
    throw e;
  }
}

export async function deleteCustomerByGuid(guid: string): Promise<void> {
  const transaction = await dao.createTransaction();

  try {
    await dao.deleteCustomerByGuidDao(guid, transaction);
    transaction.commit();
    return;
  } catch (e) {
    transaction.rollback(e);
    throw e;
  }
}
