import Ember from 'ember';
import Cookies from 'npm:js-cookie';

export default Ember.Route.extend({
  
  intl: Ember.inject.service(),

  beforeModel(transition) {
    
    // ref for setting locale in opendata-ui:
    // https://github.com/ArcGIS/opendata-ui/blob/master/app/application/route.js
    const intl = this.get('intl');
    let defaultLocale = 'en-us';
    intl.setLocale(defaultLocale);

    const loggedIn = true;
    if (!loggedIn) {
      this.transitionTo('login');
    }
    
  }
});
