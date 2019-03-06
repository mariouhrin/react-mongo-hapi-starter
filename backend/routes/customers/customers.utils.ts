import moment from 'moment';

export function transformingData(customersData: Customer[]) {
  const transformedData = customersData.map((record: Customer) => ({
    update: 'update',
    delete: 'delete',
    ...record,
    isactive: record['isactive'].toString(),
    registered: moment.utc(record['registered']).format('YYYY-MM-DD'),
    discount: Math.round(record.balance / 10)
  }));

  return transformedData;
}
