import Ember from 'ember';
import Cookies from 'npm:js-cookie';

export default Ember.Route.extend({
  activate() {
    this._super();
    window.scrollTo(0,0);
  },
  actions: {
    loadDashboard(dashboard_id) {
      this.transitionTo('dashboards.washington.indicators');
    }
  }
});
