import * as controller from './healthcheck.controller';

export default [
  {
    method: 'GET',
    path: '/api/healthcheck',
    options: {
      auth: false
    },
    handler: controller.healthCheck
  }
];
