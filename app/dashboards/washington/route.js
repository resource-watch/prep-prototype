import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel() {
    let routeName = this.get('routeName');
    this.set('routeName', routeName);

    this.transitionTo('dashboards.washington.indicators');
  }
});
