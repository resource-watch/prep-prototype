import Ember from 'ember';

export default Ember.Component.extend({
  classNames: 'sonoma-slide',
  tagName: 'section',
  attributeBindings:["data-title"],
  "data-title": 'Slide 1',
  didRender: function() {
    console.log('Sonoma slide 1');
  }
});
