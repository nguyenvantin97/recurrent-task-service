// keys.js - figure out what set of credentials to return

let keys;
if (process.env.NODE_ENV === 'production') {
  keys = require('./prodKeys');
} else {
  keys = require('./devKeys');
}

export { keys };

export default keys;
