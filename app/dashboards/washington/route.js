import Ember from 'ember';

export default Ember.Route.extend({
  activate() {
    this._super();
    window.scrollTo(0,0);
  },

  beforeModel() {
    let routeName = this.get('routeName');
    this.set('routeName', routeName);

    this.transitionTo('dashboards.washington.indicators');
  }
});
