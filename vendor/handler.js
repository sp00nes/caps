'use strict';

const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');

var Chance = require('chance');
var chance = new Chance();

module.exports = (store) => {

  const payload = {
    store: store,
    orderID: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };

  // console.log(`PICKUP: ${{ payload }}`);
  socket.emit('pickup', payload);

};
