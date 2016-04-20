import Ember from 'ember';
import Cookies from 'npm:js-cookie';

export default Ember.Route.extend({
  actions: {
    goToDashboard(dashboard_id) {
      this.transitionTo('dashboards.dashboard', dashboard_id);
    }
  },

  beforeModel(transition) {
    const loggedIn = Cookies.get('prep_logged_in');
    if (!loggedIn) {
      this.transitionTo('login');
      return;  
    }
  },

  model() {
    // return this.store.query('dashboard', {});
  }
});
