'use strict';

let eventPool = require('./eventPool.js');

require('./vendor');
require('./driver');

//Hub listens to every emit so it can log when an event is emitted
//if the payload needs to be used, you need to send it as an anonymous function
eventPool.on('PICKUP', (payload) => logger('PICKUP', payload));
eventPool.on('IN-TRANSIT', (payload) => logger('IN-TRANSIT', payload));
eventPool.on('DELIVERY', (payload) => logger('DELIVERY', payload));

function logger(event, payload) {
  const timestamp = new Date();
  console.log('EVENT:', {event, timestamp, payload});
}
