import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('data');

  this.route('dashboards', function () {
    this.route('dashboard',{ path: '/:dashboard_id' }, function() {
      this.route('indicators', function() {});
      this.route('insights', function () {});
      this.route('tools', function () {});
    }); 
  });

  this.route('insights');
  this.route('search');
  this.route('indicators-test');
});

export default Router;
