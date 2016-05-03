import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['dashboard-card'],

  fakeDashboardItems: Ember.inject.service(),

  panel_title: 'hello',

  didInsertElement() {
    const indicator_id = this.get('indicator_id');
    let svc = this.get('fakeDashboardItems');
    const options = svc.getFakeItem(indicator_id);

    this.set('panel_title', options.panel_title); 
    this.set('panel_subtitle', options.panel_subtitle); 
    this.set('component_name', options.type);
    this.set('component_settings', options.component_settings);
  }
});
