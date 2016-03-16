import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    let svc = this.get('session');
    svc.set('headerSubStyle', 'header-dashboards');
    svc.set('headerSectionTitle', 'Dashboards');
  },
  model(params, transition) {
    console.log(params, transition);
  }
});