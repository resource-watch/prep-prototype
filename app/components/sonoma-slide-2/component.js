import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sonoma-slide', 'slide-map-1'],
  tagName: 'section',
  attributeBindings:["data-title"],
  "data-title": 'Slide 2',
  "data-state": "somestate",

  didRender(){
    Reveal.addEventListener('slidechanged', function( event ) {
      if (event.currentSlide.classList.contains('slide-map-1')) {
        this.initMap();
      } else if (this.slideMap) {
        this.removeMap();
      }
    }.bind(this));
    this.initMap();
  },

  initMap(){
    let mapOptions = {
      zoomControl: false,
      scrollWheelZoom:false
    };
    if (!this.slideMap){
      this.slideMap = L.map('map', mapOptions).setView([38.290957,-122.457728], 8);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
  			maxZoom: 18,
  			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
  				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  			id: 'mapbox.streets'
  		}).addTo(this.slideMap);
    }
  },

  removeMap(){
    this.slideMap.remove();
    this.slideMap = null;
  }
});
