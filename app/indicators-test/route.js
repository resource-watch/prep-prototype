import Ember from 'ember';

export default Ember.Route.extend({
  
  fakeIndicatorCardService: Ember.inject.service(),

  model() {
    let svc = this.get('fakeIndicatorCardService');
    const dashboard = svc.getFakeDashboard('chicago');
    this.get('session').set('indicator_sections', dashboard.indicator_sections);
  }
});
