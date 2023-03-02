'use strict';

const { generateOrder, thankDriver } = require('./handler');

const { io } = require('socket.io-client');
const socket = io.connect('http://localhost:3001/caps');

let store = 'acme-widgets';
//tells server that it joined
socket.emit('join', store);

socket.on('DELIVERED', (payload) => {
  thankDriver(payload);
  // process.exit(0);
});

setInterval(() => {
  generateOrder(socket, store);
}, 5000);
