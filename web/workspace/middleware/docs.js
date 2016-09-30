var cheerio = require('cheerio')
var dust = require('dustjs-linkedin')
var fs = require('fs')
var path = require('path')
var Readable = require('stream').Readable
var url = require('url')

var Middleware = function (app) {
  app.use('/technology/docs/*', function (req, res, next) {
    var root = path.join(__dirname, '/../../content/docs')
    var parsed = url.parse(req.url, true)
    var pathname = parsed.pathname.replace('/technology/docs', '')
    var requestPath = path.resolve(path.join(root, pathname))

    return sendFile(requestPath)

    function injectHeaderFooter(path) {
      var file = fs.readFile(path, "utf-8", (err, data) => {
        if (err) return next() // 404

        var $docPage = cheerio.load(data)

        dust.render('partials/header', {}, (err, result) => {
          var $header = cheerio.load(result)
          $docPage('head').html($header('head').html())

          dust.render('partials/footer', {}, (err, result) => {
            var $footer = cheerio.load(result)
            $docPage('footer').html($footer('footer').html())

            var stream = new Readable()
            stream.push($docPage.html())
            stream.push(null)
            return stream.pipe(res)
          })
        })
      })
    }

    function sendFile (filePath) {
      var i = 0
      var self = this

      console.log(filePath)

      fs.stat(filePath, function onstat (err, stat) {
        if (err && err.code === 'ENOENT' && !path.extname(filePath) && filePath[filePath.length - 1] !== path.sep) {
          // path not found, add an extension to it and continue
          filePath += '.html'
          err = null
        }

        if (err) {
          onStatError(err)
          return next()
        }

        if (stat && stat.isDirectory()) {
          filePath += '/index.html'
        }

        if (/.+\.html/.exec(filePath)) {
          injectHeaderFooter(filePath)
        } else {
          console.log('docs:sendFile ' + filePath)
          var stream = fs.createReadStream(filePath)
          return stream.pipe(res)
        }
      })
    }
  })
}

function onStatError (error) {
  switch (error.code) {
    case 'ENAMETOOLONG':
    case 'ENOENT':
    case 'ENOTDIR':
      console.log(error)
      break
    default:
      console.log(error)
      break
  }
}

module.exports = function (app) {
  return new Middleware(app)
}

module.exports.Middleware = Middleware
