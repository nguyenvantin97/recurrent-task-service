const EventEmitter = require('events');

class LocalPubsub extends EventEmitter {}

export default new LocalPubsub();
