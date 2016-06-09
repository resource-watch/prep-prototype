import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let routeName = this.get('routeName');
    this.get('session').set('routeName', routeName);
  }
});
