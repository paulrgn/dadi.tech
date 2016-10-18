/*
* This loads the DADI dustjs-helpers module
* More info: https://github.com/dadi/dustjs-helpers
*/

/* app/utils/helpers/loader.js */

// first, a reference to the loaded pages and routes within your application
var components = require('@dadi/web').Components

// also, a reference to the Dust template module inside DADI Web
var dust = require('@dadi/web').Dust

// Load DADI helpers
require('@dadi/dustjs-helpers')(dust.getEngine(), { components: components })