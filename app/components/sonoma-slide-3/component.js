import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sonoma-slide'],
  tagName: 'section',
  attributeBindings:["data-title"],
  "data-title": 'Slide 3',
  didRender: function() {
    console.log('Sonoma slide 3');
  }
});
