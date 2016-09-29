var fs = require('fs')
var path = require('path')
var url = require('url')

var Middleware = function (app) {
  app.use('/technology/docs/*', function (req, res, next) {
    var root = path.join(__dirname, '/../../content/docs')

    var parsed = url.parse(req.url, true)

    console.log(root)

    // if (req.url.match(/\/$/) || parsed.pathname.match(/\.html$/)) {
    //   // we only deal with the static assets here
    //   return next()
    // } else {
    var pathname = parsed.pathname.replace('/technology/docs', '')

    if (pathname.match(/\/$/)) {
      pathname = pathname.substring(0, pathname.length - 1) + '.html'
    }

    var requestPath = path.resolve(path.join(root, pathname))
    return sendFile(requestPath)
    //}

    function sendFile (filePath) {
      var i = 0
      var self = this

      console.log(filePath)

      fs.stat(filePath, function onstat (err, stat) {
        if (err && err.code === 'ENOENT' && !path.extname(filePath) && filePath[filePath.length - 1] !== path.sep) {
          // not found, check extensions
          // return next(err)
        }

        if (err) {
          onStatError(err)
          return next()
        }

        if (stat.isDirectory()) {
          res.writeHead(301, {
            Location: req.url + '/'
          })
          return res.end()
        }

        console.log('docs:sendFile ' + filePath)

        var stream = fs.createReadStream(filePath)
        return stream.pipe(res)
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
