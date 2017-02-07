var Elasticsearch = require('aws-es')
var credentials = require('./credentials')
var client = new Elasticsearch(credentials)

module.exports = client;
