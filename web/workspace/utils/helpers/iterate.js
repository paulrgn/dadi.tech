var dust = require('dustjs-linkedin')

 /*
 * iterate helper, loops over given object or current context object.
 * Inspired: https://github.com/akdubya/dustjs/issues/9
 *
 * Example: {@iterate on=obj}{key}-{value}{~n}{/iterate}
 *
 * @param on, if omitted current context will be used.
 */
dust.helpers.iterate = function(chunk, context, bodies, params) {
  params = params || {}
  var obj = params['on'] || context.current()
  for (var k in obj) {
      chunk = chunk.render(bodies.block, context.push({key: k, value: obj[k]}))
  }
  return chunk
}