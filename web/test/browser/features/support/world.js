var config = require('@dadi/web').Config
var Nightmare = require('nightmare')

function World () {
  this.nightmare = Nightmare({ show: true })

  this.serverUrl = 'http://' + config.get('server.host') + ':' + config.get('server.port')

  this.goto = function (url) {
    if (!url) {
      url = this.serverUrl
    } else {
      url = this.serverUrl + '/' + url
    }

    var page = this.nightmare.goto(url)
    return page
  }
}

module.exports = function () {
  this.World = World
}
