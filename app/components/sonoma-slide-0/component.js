import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sonoma-slide'],
  tagName: 'section',
  attributeBindings:["data-title","data-background-image","data-background-size"],
  "data-title": 'Start',
  "data-background-image": "img/sonoma/dashboard-sonoma-header.png",
  "data-background-size": "cover",

  didRender(){
    Reveal.addEventListener('slidechanged', function( event ) {
      if (event.currentSlide.classList.contains('slide-map-1-3')) {
        this.initMap();
      } else if (this.slideMap) {
        this.removeMap();
      }
    }.bind(this));

    this.el = this.$('#chart1-1');
  },

  initMap(){
    const mapOptions = {
      zoomControl: false,
      scrollWheelZoom:false,
      center: [38.290957,-122.457728],
      zoom: 10,
      basemapSpec: {
        url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw',
        options: {
          attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
          id: 'mapbox.streets',
          maxZoom: 18
        }
      }
    };

    if (!this.slideMap){
      this.slideMap = L.map('map1-3', mapOptions);
      L.tileLayer(mapOptions.basemapSpec.url, mapOptions.basemapSpec.options).addTo(this.slideMap);
    }
  },

  removeMap(){
    this.slideMap.remove();
    this.slideMap = null;
  }

});
