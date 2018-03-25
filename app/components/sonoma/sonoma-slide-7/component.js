import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sonoma-slide'],
  tagName: 'section',

  didRender() {
    this.cache();
    this.renderImages();
  },

  cache: function() {
    this.img1 = $('.img7-1');
  },

  renderImages: function() {
    this.img1.attr('style', 'background-image: url(../img/sonoma/sonoma-7/flower.jpg)');
  }
});