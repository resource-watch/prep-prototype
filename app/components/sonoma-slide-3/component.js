import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  attributeBindings:["data-title"],
  "data-title" : 'Slide 3,',
  didInsertElement: function() {
    console.log('Sonoma slide 3');
  }
});
