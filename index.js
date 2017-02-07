var cheerio = require('cheerio-httpcli')
var fetch = null
var baseUrl = ''
var tentant = 'default'
var urls = []

var client = require('./client')

cheerio.setBrowser('chrome')

fetch = function (currentUrl) {
  urls.push(currentUrl)
  cheerio.fetch(currentUrl, function (err, $, res) {
    if (typeof $ === 'undefined') {
      return
    }

    var summary = {
      Id: currentUrl
    }

    var getText = function () {
      if ($(this).text().length > 0) {
        return $(this).text()
      }
    }

    var attributes = {
      title: $('title').text(),
      description: $('meta[name="description"]').attr('content'),
      keywords: $('meta[name="keywords"]').attr('content'),
      h1: $('h1').text(),
      h2: $('h2').map(getText).get(),
      h3: $('h3').map(getText).get(),
      h4: $('h4').map(getText).get(),
      h5: $('h5').map(getText).get(),
      content: $('p').map(getText).get(),
      tentant: tentant
    }

    for (item in attributes) {
      if (typeof attributes[item] !== 'undefined' && attributes[item].length > 0) {
        summary[item] = attributes[item]
      }
    }

    var links = $('a')

    links.map(function () {
      var href = $(this).attr('href')

      if (href && href != currentUrl && !href.startsWith('//') && (href.startsWith(baseUrl) || href.startsWith('/'))) {
        if (href.startsWith('/')) {
          href = baseUrl + href
        }
        if (urls.indexOf(href) === -1) {
          fetch(href)
        }
      }
      return false
    })

    console.log(currentUrl)

    client.index({
      index: tentant,
      type: 'pages',
      body: JSON.stringify(summary)
    }, function (err, resp, status) {
      console.log(resp, err, status);
    })
  })
}

var crawl = function (event, context) {
  baseUrl = event.url
  tentant = event.tentant
  client.ping({
    requestTimeout: 30000,
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });
  fetch(event.url)
}

exports.handler = crawl

