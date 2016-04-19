import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    goToDashboard(dashboard_id) {
      this.transitionTo('dashboards.dashboard', dashboard_id);
    }
  },

  beforeModel(transition) {
    let svc = this.get('session');
    svc.set('headerSubStyle', 'header-dashboards');
    svc.set('headerSectionTitle', 'Dashboards');
    svc.set('dashboardReturnDisplay', 'dashboardReturnDisplayNone');
  },

  model() {
    // return this.store.query('dashboard', {});
  }
});
