import Ember from 'ember';
import Cookies from 'npm:js-cookie';

export default Ember.Route.extend({
  
  beforeModel() {
    const is_logged_in = Cookies.set('prep_logged_in');
    if (is_logged_in) {
      this.transitionTo('home');
    }
  },

  actions: {
    checkLogin() {
      Ember.$('.pwd-error').fadeOut();
      const pwd_in = Ember.$('#input-pwd').val();
      if (btoa(pwd_in) === 'cGFzc3dvcmQxMjM=') {
        Cookies.set('prep_logged_in', true);
        this.transitionTo('home');
      } else {
        Ember.$('.pwd-error').fadeIn();
        Ember.$('#input-pwd').val('').blur();
      }
    }
  }
});
