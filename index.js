var cheerio = require('cheerio-httpcli')
var md5 = require('md5')
var fetch = null
var baseUrl = ''
var tentant = 'default'
var urls = []
var es = require('./client')

cheerio.setBrowser('chrome')

fetch = function(currentUrl) {
  urls.push(currentUrl)
  cheerio.fetch(currentUrl, function(err, $, res) {
    if (typeof $ === 'undefined') {
      return
    }

    var getText = function() {
      if ($(this).text().length > 0) {
        return $(this).text()
      }
    }

    var summary = {}
    var attributes = {
      url: currentUrl,
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

    links.map(function() {
      var href = $(this).attr('href')

      if (href && href != currentUrl && !href.startsWith('//') && (href.startsWith(baseUrl) || href.startsWith('/'))){
        if (href.startsWith('/')) {
          href = baseUrl + href
        }
        if (urls.indexOf(href) === -1) {
          fetch(href)
        }
      }
      return false
    })

    console.log('CRAWLED: ' + currentUrl)

    es.index({
      index: tentant,
      type: 'pages',
      id: md5(tentant) + md5(currentUrl),
      body: summary
    }, function (err, resp, status) {
      if (err) {
        console.log(err)
      } else {
        console.log('ADDED to index: ' + summary.url)
      }
    })
  })
}

var crawl = function(event, context) {
  console.log(event)
  baseUrl = event.url
  tentant = event.tentant

  if (!baseUrl || !tentant) {
    return
  }

  fetch(event.url)
}

exports.handler = crawl

