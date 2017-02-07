var AWS = require('aws-sdk')
var awsCredentials = new AWS.EnvironmentCredentials('AWS')

module.exports = require('elasticsearch').Client({
  hosts: 'https://search-storysearch-cswq3zny7inbwdsizfjsluh6qq.us-east-1.es.amazonaws.com',
  connectionClass: require('http-aws-es'),
  amazonES: {
    region: 'us-east-1',
    credentials: awsCredentials
  }
})
