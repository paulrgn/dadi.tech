var fs = require('fs')
var path = require('path')
var fm = require('front-matter')

var insightsPath = path.join(__dirname, '../../../insights')

var Event = function (req, res, data, callback) {

  // Define an array
  var insights = []

  fs.readdir(insightsPath, (err, files) => {
    // Error filtering    
    if (err) {
      console.log("Could not list the directory.", err)
    }

    // Ignore hidden
    files = files.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));

    // Loop through each and put into our data array
    files.forEach((file, index) => {
      if (path.extname(files[index]) === ".md") {
        fs.readFile(insightsPath+'/'+file, 'utf8', (err, result) => {
          var content = fm(result)
          content['handle'] = file.slice(0, -3);

          insights.push(content);

          if (insights.length === (files.length - 1)) {
            insights.sort(function(a,b){
              return new Date(b.attributes.date) - new Date(a.attributes.date)
            })

            // Send to page
            callback(null, insights)
          }
        })
      }
    })    
  })
}

module.exports = function (req, res, data, callback) {
  return new Event(req, res, data, callback)
}