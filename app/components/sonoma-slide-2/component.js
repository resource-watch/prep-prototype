import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  attributeBindings:["data-title"],
  "data-title": 'Slide 2,',
  didInsertElement: function() {
    console.log('Sonoma slide 2');
  }
});
