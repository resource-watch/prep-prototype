/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'prep-prototype',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    contentSecurityPolicy: {
      'default-src': "'none' blob:",
      'script-src': "'self' http://*.arcgis.com/ https://*.arcgis.com/ https://*.esri.com",
      'font-src': "'self' data: *.fonts.net *.arcgis.com/",
      'connect-src': "'self' http://*.arcgis.com/ http://*.arcgisonline.com/  https://*.esri.com",
      'img-src': "'self' blob: https://*.arcgis.com/ http://*.arcgis.com/ http://*.arcgisonline.com/ https://*.esri.com",
      'style-src': "'self'  https://fast.fonts.net http://*.arcgis.com https://*.arcgis.com",
      'media-src': "'self'"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
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
    ENV.locationType = 'hash';
    ENV.baseURL = '/prep-prototype/';

  }

  return ENV;
};
