var fs = require('fs')
var path = require('path')
var colors = require('colors')

var testConfigPath = './config/config.test.json'
var testConfigSamplePath = './node_modules/@dadi/web/config/config.test.json.sample'

var testConfigSample = fs.readFileSync(testConfigSamplePath, { encoding: 'utf-8'})

function loadConfig (done) {
  try {
    var testConfig = fs.readFileSync(testConfigPath, { encoding: 'utf-8'})
    return done(JSON.parse(testConfig))
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.writeFileSync(testConfigPath, testConfigSample)
      console.log()
      console.log("Created file at '" + testConfigPath + "'")
      loadConfig(function (config) {

      })
    }
  }
}

function stop () {
  process.exit(1)
}

loadConfig(function (config) {

})
