import Knex from 'knex';
import knex from './knex-connection';
import logger from '../lib/logger';

export async function createTransaction() {
  return new Promise((resolve) => {
    return knex
      .transaction(resolve)
      .then(() => {
        logger.debug('Transaction fulfilled');
      })
      .catch((e) => {
        logger.error('Transaction rejected: ' + e.message);
      });
  }) as any;
}

export async function getAllCustomersDao(transaction?: Knex.Transaction): Promise<Customer[]> {
  const trx = transaction || knex;
  return trx('customers').select('*');
}

export async function getTotalBalanceDao(transaction?: Knex.Transaction): Promise<number> {
  const trx = transaction || knex;
  const totalBalance = await trx('customers').sum('balance as total');
  const totalBalanceToNumber = totalBalance[0]['total'];
  return totalBalanceToNumber;
}

export async function getInactiveCustomersDao(transaction?: Knex.Transaction): Promise<Customer[]> {
  const trx = transaction || knex;
  return trx('customers')
    .select('*')
    .where('isactive', false);
}

export async function getCustomerByGuidDao(
  guid: string,
  transaction?: Knex.Transaction
): Promise<Customer> {
  const trx = transaction || knex;
  return trx('customers')
    .select('*')
    .where('guid', guid)
    .first();
}

export async function createCustomerDao(
  customer: Customer,
  transaction?: Knex.Transaction
): Promise<string> {
  const trx = transaction || knex;

  const customerData = {
    ...customer,
    isactive: false,
    registered: new Date().toISOString()
  };

  const createdCustomerGuid = await trx('customers')
    .insert(customerData)
    .returning('guid');

  return createdCustomerGuid[0];
}

export async function updateCustomerDao(
  customer: Customer,
  guid: string,
  transaction?: Knex.Transaction
): Promise<void> {
  const customerData = {
    ...customer,
    registered: new Date().toISOString()
  };

  const trx = transaction || knex;

  await trx('customers')
    .update(customerData)
    .where('guid', guid);

  return;
}

export async function deleteCustomerByGuidDao(
  guid: string,
  transaction?: Knex.Transaction
): Promise<Customer> {
  const trx = transaction || knex;
  return trx('customers')
    .delete()
    .where('guid', guid);
}
