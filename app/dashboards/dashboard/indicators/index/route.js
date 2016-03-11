import Ember from 'ember';

export default Ember.Route.extend({
  fakeIndicatorCardService: Ember.inject.service(),

  beforeModel() {
    let svc = this.get('session');
    svc.set('headerSubStyle', 'header-dashboards');
    svc.set('headerSectionTitle', 'Dashboards');
    svc.set('dashboardReturnDisplay', 'dashboardReturnDisplayInline');
  },
  model(params, transition) {
    const cardGrabber = this.get('fakeIndicatorCardService');
    const card_id = transition.state.params['dashboards.dashboard'].dashboard_id;
    const cards_info = cardGrabber.getFakeCards(card_id);

    let svc = this.get('session');
    svc.set('headerSectionTitle', cards_info.title);
    svc.set('indicatorCards', cards_info.indicators);
  }
});