import Ember from 'ember';

export default Ember.Object.extend({
  socket: null,

  reconnectDelay: 2 * 1000,
  reconnectDelayIncrease: 1.5 * 1000,
  reconnectDelayMax: 60 * 1000,

  authenticateTimeout: 5 * 1000,

  messageHandlers: {},

  connect: function() {
    var socket = this.get('socket');
    if (socket != null) {
      // This condition should never be true, but just in case it is,
      // we will disable the old socket.
      socket.decommissioned = true;
    }

    socket = new SockJS('/api/sock');
    this.set('socket', socket);

    var websocketService = this;

    socket.onopen = function() {
      websocketService.sendMessage('authenticate', {
        user: websocketService.get('session.user.id')
      });
      setTimeout(function() {
        if (!socket.authenticated && !socket.decommissioned) {
          socket.close();
        }
      }, websocketService.get('authenticateTimeout'));
    };

    socket.onclose = function() {
      websocketService.set('socket', null);
      websocketService.reconnectWithDelay();
    };

    socket.onmessage = function(e) {
      if (socket.decommissioned) {
        return;
      }
      var handlers = websocketService.get('messageHandlers');
      var json = JSON.parse(e.data);
      var handler = handlers[json.operation] || function() {};
      handler(json.data, socket);
    };

    this.registerMessageHandler('authenticate', function() {
      socket.authenticated = true;
    });
  }.on('init'),

  reconnectWithDelay: function() {
    var websocketService = this;
    var reconnectDelay = websocketService.get('reconnectDelay');
    setTimeout(function() {
      var max = websocketService.get('reconnectDelayMax');
      var increase = websocketService.get('reconnectDelayIncrease');
      websocketService.set('reconnectDelay', Math.min(max, reconnectDelay + increase));
      websocketService.connect();
    }, reconnectDelay);
  },

  sendMessage: function(operation, data) {
    this.get('socket').send(JSON.stringify({
      operation: operation,
      data: data
    }));
  },

  registerMessageHandler: function(operation, handler) {
    // TODO: The service can be configured to keep an array of handlers for a specific
    // message, instead of overwriting the handlers.
    this.get('messageHandlers')[operation] = handler;
  }
});
