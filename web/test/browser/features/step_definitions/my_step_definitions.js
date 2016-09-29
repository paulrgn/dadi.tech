var Nightmare = require('nightmare')
var nightmare = Nightmare({ show: true })
var should = require('should')

var page

module.exports = function () {
  this.Given(/^I am on the Cucumber.js GitHub repository$/, function () {
    // Express the regexp above with the code you wish you had.
    // `this` is set to a World instance.
    return page = this.goto('https://github.com/cucumber/cucumber-js')
  })

  this.When(/^I go to the README file$/, function () {
    // Express the regexp above with the code you wish you had. Call callback() at the end
    // of the step, or callback(null, 'pending') if the step is not yet implemented:
    return page.wait('a[title="README.md"]')
    .click('a[title="README.md"]')
    .wait(1000)
  })

  this.Then(/^I should see "(.*)" as the page title$/, function (title) {
    // matching groups are passed as parameters to the step definition

    return page.wait('div.site-footer-container')
    .evaluate(() => {
      return document.title
    })
    .end()
    .then(function(t) {
      console.log(t)
      t.should.eql(title)
    })
  })
}
