const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'kosu-admin',
  location: 'asia-east1'
};
exports.connectorConfig = connectorConfig;

