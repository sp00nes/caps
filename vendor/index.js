'use strict';

const eventPool = require('../eventPool.js');
const { createPackage, thankDriver } = require('./handler');

//listeners
eventPool.on('DELIVERY', (payload) => confirmDelivery(payload));

function confirmDelivery(payload) {
  setTimeout(() => {
    thankDriver(payload);
  }, 1000);
}

// Start of cycle emits PICKUP, driver is listing
setInterval(() => {
  createPackage();
}, 5000);
