import Ember from 'ember';

export default Ember.Route.extend({
  model(params, transition) {
    console.log(params, transition);
    // const card_id = transition.state.params['dashboards.dashboard'].dashboard_id;
    // return this.store.query('dashboard', { ids: [card_id].join(',') });
  }
});