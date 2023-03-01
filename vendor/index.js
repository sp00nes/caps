'use strict';

const handler = require('./handler');

const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');

let store = 'Game Store';
//tells server that it joined
socket.emit('join', store);

setInterval(() => {
  handler(store);
}, 5000);

socket.on('delivered', (payload) => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
  process.exit(0);
});
