import { Collection } from 'mongodb';

import { IExtendedRequest } from '../../types/interfaces/request.interface';

export function transformDataToRender(customersData: Customer[]) {
  const transformedData = customersData.map((record: Customer) => ({
    update: 'update',
    delete: 'delete',
    ...record,
    discount: Math.round(record.balance / 10)
  }));

  return transformedData;
}

export async function getCustomersCollection(request: IExtendedRequest): Promise<Collection<any>> {
  const db = request.server.app.db;
  const customersCollection: Collection<any> = await db.collection('customers');
  return customersCollection;
}

export async function getSequenceCollection(request: IExtendedRequest): Promise<Collection<any>> {
  const db = request.server.app.db;
  const sequence: Collection<any> = await db.collection('sequence');
  return sequence;
}

export async function getNextSeq(collection: Collection<any>): Promise<number> {
  const documentRecord = await collection.findOneAndUpdate(
    { seqRef: 'ref' },
    { $inc: { seqNumber: 1 } }
  );

  return documentRecord.value.seqNumber;
}
