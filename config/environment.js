/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'telegram-client',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    //"https://github.com/login/oauth/authorize?
    // response_type=code&client_id=4beb7…ers%2Fauth%2Fgithub%2Fcallback&state=STATE&scope=user%3Aemail%2Cread%3Aorg"

    torii: {
      sessionServiceName: 'toriiSession',
      providers: {
        'github-oauth2': {
          clientId: '5563d3a13c4c076cef3a',
          redirectUri: 'http://localhost:4200',
          scope: 'user:email,read:org'
        }
      }
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;

    ENV.contentSecurityPolicy = {
      'connect-src': "'self' ws://localhost:4200 http://localhost:3000",
      'style-src': "'self' 'unsafe-inline'"
    }
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
