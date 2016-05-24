import Ember from 'ember';

export default Ember.Route.extend({
  activate() {
    this._super();
    window.scrollTo(0,0);
  },
  beforeModel(transition) {
    let svc = this.get('session');
    svc.set('headerSubStyle', 'header-data'); 
    svc.set('headerSectionTitle', 'Insights');
  }
});
