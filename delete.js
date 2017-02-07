var client = require('./client')

client.delete({
  index: 'storyblok',
  type: 'pages',
  id: '{{id}}'
}, function (error, response, status) {
  if (error) {
    console.log("delete error: " + error)
  }
  else {
    console.log("--- Response ---");
    console.log(response);
    console.log("--- Hits ---");
    response.hits.hits.forEach(function (hit) {
      console.log(hit);
    })
  }
});