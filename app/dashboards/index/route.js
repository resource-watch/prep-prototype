import Ember from 'ember';
import Cookies from 'npm:js-cookie';

export default Ember.Route.extend({
  actions: {
    goToDashboard(dashboard_id) {
      this.transitionTo('dashboards.dashboard', dashboard_id);
    }
  },

  model() {
    // return this.store.query('dashboard', {});
  }
});
