'use strict';

const delivery = (socket, payload) => {
  setTimeout(() => {
    socket.emit('IN-TRANSIT', payload);
  }, 1000);

  setTimeout(() => {
    socket.emit('DELIVERED', payload);
  }, 2000);
};

module.exports = { delivery };
