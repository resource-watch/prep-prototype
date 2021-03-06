import Ember from 'ember';

export default Ember.Route.extend({
  
  beforeModel() {
    let svc = this.get('session');
    svc.set('headerSubStyle', 'header-dashboards');
    svc.set('headerSectionTitle', 'Dashboards');
    svc.set('dashboardReturnDisplay', 'dashboardReturnDisplayInline');
  }

  ,model(params, transition) {
    const card_id = transition.state.params['dashboards.dashboard'].dashboard_id;
    return this.store.query('dashboard', { ids: [card_id].join(',') });
    // const m = this.modelFor('dashboards.dashboard');
    // return m;
  }
});