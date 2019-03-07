import { ResponseToolkit } from 'hapi';
import { ObjectID } from 'mongodb';
import _ from 'lodash';
import moment from 'moment';
import uuidv4 from 'uuid/v4';

import { IExtendedRequest } from '../../types/interfaces/request.interface';
import { getBoomError, NotFoundError } from '../../utils/error-utils';
import {
  transformDataToRender,
  getCustomersCollection,
  getSequenceCollection,
  getNextSeq
} from './customers.utils';

export async function getAllCustomers(request: IExtendedRequest, h: ResponseToolkit) {
  try {
    const customersCollection = await getCustomersCollection(request);
    const allCustomers: Customer[] = await customersCollection.find().toArray();

    if (_.isEmpty(allCustomers)) {
      throw new NotFoundError('Not found customers data');
    }

    const transformData = transformDataToRender(allCustomers);

    return h.response(transformData).code(200);
  } catch (e) {
    return getBoomError(e);
  }
}

export async function getTotalBalance(request: IExtendedRequest, h: ResponseToolkit) {
  try {
    const customersCollection = await getCustomersCollection(request);
    const getTotalBalance = await customersCollection
      .aggregate([
        {
          $group: {
            _id: null,
            total: {
              $sum: '$balance'
            }
          }
        }
      ])
      .toArray();

    if (_.isEmpty(getTotalBalance)) {
      throw new NotFoundError('Cannot get total balance');
    }

    const totalBalance = getTotalBalance[0].total;

    return h.response({ totalBalance }).code(200);
  } catch (e) {
    return getBoomError(e);
  }
}

export async function getInactiveCustomers(request: IExtendedRequest, h: ResponseToolkit) {
  try {
    const customersCollection = await getCustomersCollection(request);
    const inactiveCustomers: Customer[] = await customersCollection
      .find({ isActive: false })
      .toArray();

    if (_.isEmpty(inactiveCustomers)) {
      throw new NotFoundError('Not found inactive customers');
    }

    const transformData = transformDataToRender(inactiveCustomers);

    return h.response(transformData).code(200);
  } catch (e) {
    return getBoomError(e);
  }
}

export async function getCustomerByGuid(request: IExtendedRequest, h: ResponseToolkit) {
  const _id = new ObjectID(request.params._id);

  try {
    const customersCollection = await getCustomersCollection(request);
    const customer: Customer = await customersCollection.findOne({ _id });

    if (_.isEmpty(customer)) {
      throw new NotFoundError('Not found customer by _id');
    }

    return h.response(customer).code(200);
  } catch (e) {
    return getBoomError(e);
  }
}

export async function createCustomer(request: IExtendedRequest, h: ResponseToolkit) {
  const customer: Customer = request.payload as Customer;

  try {
    const sequence = await getSequenceCollection(request);
    const customersCollection = await getCustomersCollection(request);

    const newCustomerData = {
      index: await getNextSeq(sequence),
      guid: uuidv4(),
      isActive: false,
      ...customer,
      registered: moment.utc(new Date()).format('YYYY-MM-DD')
    };

    const response = await customersCollection.insertOne(newCustomerData);

    if (!response.insertedId) {
      throw new NotFoundError('Cannot insert new customer data');
    }

    return h.response({ customerId: response.insertedId }).code(201);
  } catch (e) {
    return getBoomError(e);
  }
}

export async function updateCustomer(request: IExtendedRequest, h: ResponseToolkit) {
  const _id = new ObjectID(request.params._id);
  const customer: Customer = request.payload as Customer;

  try {
    const customersCollection = await getCustomersCollection(request);
    const checkCustomer: Customer = await customersCollection.findOne({ _id });

    if (_.isEmpty(checkCustomer)) {
      throw new NotFoundError('Not found customer by _id');
    }

    const customerDataForUpdate = {
      ...customer,
      registered: moment.utc(new Date()).format('YYYY-MM-DD')
    };

    await customersCollection.updateOne({ _id }, { $set: { ...customerDataForUpdate } });

    return h.response().code(204);
  } catch (e) {
    return getBoomError(e);
  }
}

export async function deleterCustomer(request: IExtendedRequest, h: ResponseToolkit) {
  const _id = new ObjectID(request.params._id);

  try {
    const customersCollection = await getCustomersCollection(request);

    const checkCustomer: Customer = await customersCollection.findOne({ _id });

    if (_.isEmpty(checkCustomer)) {
      throw new NotFoundError('Not found customer by _id');
    }

    customersCollection.deleteOne({ _id });

    return h.response().code(204);
  } catch (e) {
    return getBoomError(e);
  }
}
