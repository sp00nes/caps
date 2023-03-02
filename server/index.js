'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue.js');

//socket server singleton listening at 3001
const server = new Server();
const orderQueue = new Queue();
const caps = server.of('/caps');

caps.on('connection', (socket) => {
  //socket.emit('MESSAGE', payload); sends back to sender
  //socket.broadcast.emit(); sends to all listeners
  //server.emit()/io.emit(); sends to all clients connected to the server
  console.log('Socket connected to server', socket.id);

  //LISTENERS
  socket.onAny((event, payload) => {
    console.log({ event, time: new Date().toISOString(), payload });
  });

  socket.on('join', (room) => {
    console.log('these are the rooms', socket.adapter.rooms);
    console.log('---payload is the room--', room);
    socket.join(room);
    console.log(`You've joined the ${room} room`);
    console.log('these are the rooms', socket.adapter.rooms);
    // how to send to a room, play around with it
    // socket.to(room).emit('some message');
  });

  socket.on('READY-FOR-PICKUP', (payload) => {
    let currentQueue = orderQueue.read(payload.queueId);
    if (!currentQueue) {
      let queueKey = orderQueue.store(payload.queueId, new Queue());
      currentQueue = orderQueue.read(queueKey);
    }
    currentQueue.store(payload.orderID, payload);
    console.log('Order', orderQueue);
    socket.broadcast.emit('READY-FOR-PICKUP', payload);
  });

  socket.on('GET-ORDERS', (payload) => {
    console.log('Orders', orderQueue);
    console.log('attempting to get orders');
    let currentQueue = orderQueue.read(payload.queueId);
    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach(orderID => {
        socket.emit('READY-FOR-PICKUP', currentQueue.read(orderID));
      });
    }
  });

  // these will use the caps.to(payload.store).emit() once the driver is set up to join a room as well.
  socket.on('IN-TRANSIT', (payload) => {
    caps.emit('IN-TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    let currentQueue = orderQueue.read(payload.queueId);
    if(!currentQueue){
      throw new Error('we have orders but no queue');
    }
    let order = currentQueue.remove(payload.orderID);
    socket.broadcast.emit('DELIVERED', order);
  });


});

server.listen(PORT);
