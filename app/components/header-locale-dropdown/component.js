import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  classNames: ['dropdown'],

  intl: Ember.inject.service(),

  actions: {
    setLocale(locale) {
      const intl = this.get('intl');
      intl.setLocale(locale);
    }
  }
});
