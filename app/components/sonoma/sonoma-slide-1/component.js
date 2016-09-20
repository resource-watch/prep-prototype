import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sonoma-slide'],
  tagName: 'section',
  attributeBindings:["data-title","data-background-image","data-background-size"],
  "data-title": 'Start',
  "data-background-image": "img/sonoma/sonoma-1/landscape.jpg",
  "data-background-size": "cover",

  didRender() {
    this.cache();
  	this.setListeners();
    this.renderImages();
  },

  setListeners: function() {
    Reveal.addEventListener('slidechanged', function( event ) {
      setTimeout(this.setSliderNumber, 100).bind(this);
      if (!event.currentSlide.classList.contains('slide-1-intro')) {
        event.currentSlide.style.background = 'white';
      }
    }.bind(this));
    Reveal.addEventListener('ready', function() {
      Reveal.configure({ slideNumber: 'h' });
      this.setSliderNumber();
    }.bind(this));
  },

  cache: function() {
    this.img1 = $('.img1-1');
    this.img2 = $('.img1-2');
    this.img3 = $('.img1-3');
    this.img4 = $('.img1-4');
  },

  renderImages: function() {
    this.img1.attr('style', 'background-image: url(../img/sonoma/sonoma-1/road.jpg)');
    this.img2.attr('style', 'background-image: url(../img/sonoma/sonoma-1/people.jpg)');
    this.img3.attr('style', 'background-image: url(../img/sonoma/sonoma-1/community.jpg)');
    this.img4.attr('style', 'background-image: url(../img/sonoma/sonoma-1/collector.jpg)');
  },

  setSliderNumber: function() {
    const h = $('.slide-number-a');
    const v = $('.slide-number-b');
    const delimiter = $('.slide-number-delimiter');
    const current = h.text() + '.' + v.text();

    h.text(current);
    delimiter.text('/');
    v.text('18');
  }
});
