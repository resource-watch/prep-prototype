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
    this.img1 = $('.img12-1');
    this.img2 = $('.img12-2');
  },

  renderImages: function() {
    this.img1.attr('style', 'background-image: url(../img/sonoma/sonoma-12/drought2.jpg)');
    this.img2.attr('style', 'background-image: url(../img/sonoma/sonoma-12/fish.jpg)');
  }
});
