// To use it create some files under `routes/`
// e.g. `server/routes/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

module.exports = function(app, options) {
  var globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);
  var bodyParser = require('body-parser');
  var sockjs = require('sockjs');

  var socketServer = sockjs.createServer();
  socketServer.installHandlers(options.httpServer, {prefix: '/api/sock'});

  // websocket-mocks/post.js
  socketServer.on('connection', function(conn) {
    setTimeout(function() {
      conn.write(compose('newPost', {
        post: {
          id: 20,
          body: 'hello from the sockjs server!',
          createdAt: 'Tue Feb 25 2015 09:14:21 GMT-0600 (CST)',
          user: 2
        }
      }));
    }, 4000);
  });

  function compose(operation, data) {
    return JSON.stringify({ operation: operation, data: data });
  }

  // Log proxy requests
  var morgan  = require('morgan');
  app.use(morgan('dev'));
  app.use(bodyParser.json());

  // Delay response to simulate network lag.
  app.use(function(req, res, next) {
    var delay = 0;

    if (req.url.indexOf("/api") === 0) {
      delay = 1200;
    }
    setTimeout(function() {
      next();
    }, delay);
  });

  mocks.forEach(function(route) { route(app); });
  proxies.forEach(function(route) { route(app); });
};
