'use strict';

// const eventPool = require('../../eventPool');
const handler = require('./handler');
const { io } = require('socket.io-client');

const socket = io.connect('http://localhost:3001/caps');

// socket.emit('JOIN', payload.store); need to join room for specific store

socket.on('pickup', (payload) => {
  setTimeout(() => {
    handler(payload);
  }, 1000);
});

socket.on('in-transit', (payload) => {
  setTimeout(() => {
    socket.emit('delivered', payload);

  }, 1000);
});

socket.on('delivered', (payload) => {
  console.log(`DRIVER: delivered ${payload.orderID}`);
});
