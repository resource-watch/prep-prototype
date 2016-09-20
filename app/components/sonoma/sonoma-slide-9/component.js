import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sonoma-slide'],
  tagName: 'section',
  attributeBindings:["data-title"],
  "data-title": 'Start',

   didRender() {
    this.cache();
    this.renderImages();
  },

  cache: function() {
    this.img1 = $('.img9-1');
  },

  renderImages: function() {
    this.img1.attr('style', 'background-image: url(../img/sonoma/sonoma-9/agriculture.jpg)');
  }
});
