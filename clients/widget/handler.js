'use strict';

var Chance = require('chance');
var chance = new Chance();

const generateOrder = (socket, store) => {
  const payload = {
    store: store,
    orderID: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
    queueId: 'widget',
  };

  socket.emit('READY-FOR-PICKUP', payload);
};

const thankDriver = (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
};

module.exports = { generateOrder, thankDriver };
