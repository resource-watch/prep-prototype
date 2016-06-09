import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',

  didRender() {
    this.slideMapEl = this.$('#map7-2');
    this.setListeners();
  },

  setListeners: function() {
    Reveal.addEventListener('slidechanged', function( event ) {
      if (event.currentSlide.classList.contains('slide-map-7-2')) {
        this.initMap();
      } else if (this.slideMap) {
        this.removeMap();
      }
    }.bind(this));
  },

  initMap(){
    this.slideMapEl.addClass('-loading');
    const mapOptions = {
      zoomControl: false,
      scrollWheelZoom:false,
      center: [38.280957,-122.457728],
      zoom: 7,
      basemapSpec: {
        url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
        options: {
          maxZoom: 18
        }
      }
    };
    var request = {
      layers: [{
        "user_name": "prep-admin",
        "type": "cartodb",
        "options": {
          "sql": "SELECT * FROM cwd1981_2010_ave_hst_1415990012",
          "cartocss": "#cwd1981_2010_ave_hst_1415990012 {raster-opacity:1;}",
          "cartocss_version": "2.3.0",
          "geom_column": "the_raster_webmercator",
          "geom_type": "raster",
          "raster_band": 1
        }
      }]
    };
    if (!this.slideMap){
      this.slideMap = L.map('map7-2', mapOptions);
      L.tileLayer(mapOptions.basemapSpec.url, mapOptions.basemapSpec.options).addTo(this.slideMap);
      $.ajax({
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        url: 'https://prep-admin.cartodb.com/api/v1/map/',
        data: JSON.stringify(request),
        success: function(data) {
          var tileUrl = 'https://prep-admin.cartodb.com/api/v1/map/' + data.layergroupid + '/{z}/{x}/{y}.png';
          var layer = L.tileLayer(tileUrl);
          layer.on('load',function(){
            this.slideMapEl.removeClass('-loading');
          }.bind(this));
          layer.addTo(this.slideMap, 1);
        }.bind(this)
      });
    }
  },

  removeMap(){
    this.slideMap.remove();
    this.slideMap = null;
  }


});
