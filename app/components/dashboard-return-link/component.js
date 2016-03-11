import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'a',
  classNames: [''],
  attributeBindings: ['href', 'title', ],

  init() {
    this._super(...arguments);
  },
  click() {
    console.log('click!');
  }
});
