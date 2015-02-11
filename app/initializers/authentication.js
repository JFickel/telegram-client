export function initialize(container, app) {
  var store = container.lookup('store:main');
  var session = container.lookup('service:session');

  // if (localStorage.user) {
  //   var user = store.push('user', JSON.parse(localStorage.user));
  //   session.set('user', user);
  // }

  app.deferReadiness();
  store.find('user', { authenticated: true }).then(function(users) {
    var user = (users || []).get('firstObject');
    session.set('user', user);
    app.advanceReadiness();
  });
}

export default {
  name: 'authentication',
  initialize: initialize,
  after: ['store', 'session-service']
};
