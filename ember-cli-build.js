/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    sassOptions: {
      includePaths: [
        'node_modules/bootstrap-sass/assets/stylesheets'
      ]
    },

    amd :{
      loader: 'https://js.arcgis.com/3.16/',
      configPath: 'config/dojo-config.js',
      packages: [
        'esri','dojo','dojox','dijit',
        'put-selector','xstyle','dbind','dgrid'
      ]
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.


  app.import('./bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js');
  app.import('./bower_components/reveal.js/js/reveal.js');
  app.import('./bower_components/leaflet/dist/leaflet.js');
  app.import('./bower_components/leaflet/dist/leaflet.css');
  app.import('./bower_components/vega/vega.js');
  app.import('./bower_components/nouislider/distribute/nouislider.min.js');
  app.import('./bower_components/nouislider/distribute/nouislider.min.css');

  //although app.import can't pull from node_modules, Funnel can
  var bootstrap_fonts = new Funnel('./node_modules/bootstrap-sass/assets/fonts/bootstrap', {
    srcDir: '/',
    include: ['**.*'],
    destDir: '/assets/fonts'
  });

  // bootstrap toggle buttons
  // https://github.com/minhur/bootstrap-toggle/
  app.import('./bower_components/bootstrap-toggle/css/bootstrap-toggle.min.css');
  app.import('./bower_components/bootstrap-toggle/js/bootstrap-toggle.min.js');

  return app.toTree([bootstrap_fonts]);
};
