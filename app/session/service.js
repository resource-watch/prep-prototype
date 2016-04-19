import Ember from 'ember';

export default Ember.Service.extend({
  headerSectionTitle: 'Dashboards',
  indicatorCards: [],
  dashboardReturnDisplay: 'dashboardReturnDisplayNone',
  layerListing: [],

  init() {
    let layerListing = [];
    this.set('layerListing', layerListing);
  }
});
