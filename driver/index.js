'use strict';
//driver

const eventPool = require('../eventPool.js');
const { pickup, delivery } = require('./handler');


// waiting for PICKUP to be emitted.
eventPool.on('PICKUP', pickupAndDeliver);

//only hub listens to pickup, vendor listens to delivery
function pickupAndDeliver(payload) {
  setTimeout(() => {
    pickup(payload);
  }, 1000);

  setTimeout(() => {
    delivery(payload);
  }, 2000);

}
