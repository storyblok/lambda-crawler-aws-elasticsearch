var client = require('./client')

client.search({
  index: 'storyblok',
  type: 'website',
  body: { }
}, function (error, response, status) {
  if (error) {
    console.log("search error: " + error)
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