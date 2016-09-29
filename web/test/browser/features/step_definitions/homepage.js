var cheerio = require('cheerio')
var should = require('should')

var page
var currentNode

module.exports = function () {

  this.After(function (scenario) {
    if (scenario.isFailed()) {
      return page.pdf('/Users/jameslambie/Desktop/' + scenario.getName() + '.pdf', { pageSize: 'A4', printBackground: true })
    }
    else {
      return true
    }
  })

  this.Given(/^I am on the homepage$/, function () {
    if (page) return page
    return page = this.goto(null).wait(2000).viewport(1024,768)
  })

  this.Then(/^I should see a header with "([^"]*)"$/, function (title) {
    return page.evaluate(function () {
      return document.querySelector('h1').innerHTML
    })
    .then(function (header) {
      header.should.eql(title)
    })
  })

  this.Then(/^I should see a carousel with (\d+) articles$/, function (articleCount) {
    return page.wait('footer').evaluate(function () {
      return document.querySelectorAll('.owl-item').length
     })
    .then(function (count) {
      count.toString().should.eql(articleCount.toString())
    })
  })

  this.Then(/^I should see a section with the title '(.*)' in position (\d+)$/, function (title, position) {
    return page.evaluate(function (position) {
      return document.querySelector('.container.container--wide:nth-of-type(' + position + ')').outerHTML
    }, position)
    .then(function (section) {
      currentNode = section
      var $ = cheerio.load(currentNode)
      $('h2.title span').text().should.eql(title)
    })
  })

  this.Then(/^I should see (\d+) articles$/, function (articles) {
    var $ = cheerio.load(currentNode)
    return $('article').length.toString().should.eql(articles.toString())
  })

  this.Then(/^I should see a Show All button which loads (.*)$/, function (link) {
    var $ = cheerio.load(currentNode)
    return $('a.link--more').attr('href').should.eql(link)
  })
}