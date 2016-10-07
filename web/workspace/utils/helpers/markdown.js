var dust = require('dustjs-linkedin')
var marked = require('marked')

/*
* Returns the markdown content formatted as HTML
*/
dust.helpers.markdown = function(chunk, context, bodies, params) {
  if (bodies.block) {
    return chunk.capture(bodies.block, context, function(string, chunk) {
      chunk.end(marked(string))
    });
  }
  return chunk;
};

/*
* Returns the markdown content formatted as HTML, without wrapping p tags
*/
dust.helpers.soberMarkdown = function(chunk, context, bodies, params) {
  if (bodies.block) {
    return chunk.capture(bodies.block, context, function(string, chunk) {
      var md = marked(string);

      // Replace </p><p> with <br>
      var str = md.replace(/<\/p><p[^>]*>/igm, '<br>');

      // Remove wrapping <p></p> tags
      str = str.replace(/<p[^>]*>(.*?)<\/p>/igm, "$1");

      chunk.end(str);
    });
  }
  return chunk;
};