import Ember from 'ember';
import Cookies from 'npm:js-cookie';

export default Ember.Route.extend({
  beforeModel() {
    Cookies.remove('prep_logged_in');
    this.transitionTo('login');
  }
});
