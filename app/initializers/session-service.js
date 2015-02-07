export function initialize(container, application) {
  application.inject('route', 'sessionService', 'service:session');
  application.inject('controller', 'sessionService', 'service:session');
}

export default {
  name: 'session-service',
  initialize: initialize
};