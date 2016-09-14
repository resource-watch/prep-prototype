import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sonoma-slide'],
  tagName: 'section',
  attributeBindings:["data-title","data-background-image","data-background-size"],
  "data-title": 'Start',
  "data-background-image": "img/sonoma/sonoma-1/landscape.jpg",
  "data-background-size": "cover",

  didRender() {
  	this.setListeners();
  },

  setListeners: function() {
    Reveal.addEventListener('slidechanged', function( event ) {
      if (event.currentSlide.classList.contains('slide-1-intro')) {
      	this.set('data-background-image', 'img/sonoma/sonoma-1/landscape.jpg')
      } else {
      	this.set('data-background-image', '')
      }
    }.bind(this));
  },
});
