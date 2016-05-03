import Ember from 'ember';
import Cookies from 'npm:js-cookie';

export default Ember.Route.extend({
  actions: {
    loadDashboard(dashboard_id) {
      this.transitionTo('dashboards.washington.indicators');
    }
  }
});
