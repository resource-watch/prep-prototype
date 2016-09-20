import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sonoma-slide'],
  tagName: 'section',

  didRender() {
    this.cache();
    this.renderImages();
  },

  cache: function() {
    this.img1 = $('.img4-1');
    this.img2 = $('.img4-2');
    this.img3 = $('.img4-3');
  },

  renderImages: function() {
    this.img1.attr('style', 'background-image: url(../img/sonoma/sonoma-4/Guerneville.jpg)');
    this.img2.attr('style', 'background-image: url(../img/sonoma/sonoma-4/drought.jpg)');
    this.img3.attr('style', 'background-image: url(../img/sonoma/sonoma-4/fire.jpg)');
  }
});
