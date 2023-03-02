'use strict';

const { delivery } = require('./handler');
const { io } = require('socket.io-client');

const socket = io.connect('http://localhost:3001/caps');

socket.on('READY-FOR-PICKUP', (payload) => {
  delivery(socket, payload);
});

socket.emit('GET-ORDERS', {queueId: 'flower'});
