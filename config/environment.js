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

    intl: {
      disablePolyfill: true,
      locales: ['cs','da','de','en-us','es','et','el','fi','fr','it','ja','ko','lt','lv','nb','nl','pl','pt-br','pt-pt','ro','ru','sv','th','tr','vi','zh-hans','zh-hant','zh'],
      baseLocale: 'en-us'
    },

    contentSecurityPolicy: {
      'default-src': "'none' blob:",
      'script-src': "'self' http://arcgis-sdgs-385255865.us-east-1.elb.amazonaws.com/ 'unsafe-eval' 'unsafe-inline' http://*.arcgis.com/ https://*.arcgis.com/ https://apf-koop-sample-app.herokuapp.com https://*.esri.com",
      'font-src': "'self' data: *.fonts.net *.arcgis.com/",
      'connect-src': "'self' http://arcgis-sdgs-385255865.us-east-1.elb.amazonaws.com/ http://*.arcgis.com/ http://services.arcgisonline.com/ https://sdg-api.herokuapp.com/ http://localhost:3000 https://*.esri.com",
      'img-src': "'self' blob: https://s3.amazonaws.com http://arcgis-sdgs-385255865.us-east-1.elb.amazonaws.com/ https://*.arcgis.com/ http://*.arcgis.com/ http://*.arcgisonline.com/ https://*.esri.com",
      'style-src': "'self' 'unsafe-inline' https://fast.fonts.net http://*.arcgis.com https://*.arcgis.com",
      'media-src': "'self'"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    prepApiHost : 'http://localhost:3000'
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

    // add heroku host;
    ENV.prepApiHost = 'https://prep-api.herokuapp.com/';
  }

  return ENV;
};
