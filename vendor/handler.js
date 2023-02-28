'use strict';

const eventPool = require('../eventPool.js');
let Chance = require('chance');

let chance = new Chance();

function createPackage(payload=null) {
  if(!payload){
    payload = {
      store: 'EPIC GAME STORE',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }

  console.log('VENDOR: we have an order ready');
  //Driver is listening
  eventPool.emit('PICKUP', payload);
}

function thankDriver(payload){
  console.log('Thank you for ordering ', payload.customer);
}

module.exports = {
  createPackage,
  thankDriver,
};
