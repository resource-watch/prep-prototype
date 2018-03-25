import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sonoma-slide'],
  tagName: 'section',

  didRender() {
    this.cache();
    this.renderImages();
  },

  cache: function() {
    this.img1 = $('.img5-1');
  },

  renderImages: function() {
    this.img1.attr('style', 'background-image: url(../img/sonoma/sonoma-5/road2.jpeg)');
  }
});
