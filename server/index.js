// To use it create some files under `routes/`
// e.g. `server/routes/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

module.exports = function(app) {
  var globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);
  var bodyParser = require('body-parser');

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
