import DS from 'ember-data';
import ENV from 'prep-prototype/config/environment';

export default DS.JSONAPIAdapter.extend({
  
  host: ENV.prepApiHost,
  
  urlForQuery() {
    return this.host + '/dashboards';
  },

  urlForQueryRecord() {
    return this.host + '/dashboards';
  }

});