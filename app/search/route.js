import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel(transition) {
    let svc = this.get('session');
    svc.set('headerSubStyle', 'header-data');    
  }
});
