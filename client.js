var elasticsearch = require('aws-es')
var client = new Elasticsearch({
  accessKeyId: yourAccessKeyId,
  secretAccessKey: yourSecretAccessKey,
  service: 'es',
  region: yourServiceRegion,
  host: yourServiceHost
})

module.exports = client;
