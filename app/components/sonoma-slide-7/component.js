import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',

  cartodbtable: 'cwd1951_1980_ave',
  cartocss: '{raster-opacity:1; raster-colorizer-default-mode: linear; raster-colorizer-default-color: transparent; raster-colorizer-epsilon: 0.01; raster-colorizer-stops: stop(1,rgba(44,123,182,1) )stop(31.875,rgba(107,170,207,1) )stop(63.75,rgba(171,217,233,1) )stop(95.625,rgba(213,236,212,1) )stop(127.5,rgba(255,255,191,1) )stop(159.375,rgba(254,214,144,1) )stop(191.25,rgba(253,174,97,1) )stop(223.125,rgba(234,99,62,1) )stop(255,rgba(215,25,28,1) )}',

  didRender() {
    this.slideMapEl = this.$('#map7-2');
    this.setListeners();
  },

  setListeners: function() {
    Reveal.addEventListener('slidechanged', function( event ) {
      if (event.currentSlide.classList.contains('slide-map-7-2')) {
        this.initMap();
        this.initLegend();
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

    if (!this.slideMap){
      this.slideMap = L.map('map7-2', mapOptions);
      L.tileLayer(mapOptions.basemapSpec.url, mapOptions.basemapSpec.options).addTo(this.slideMap);
      this.addRaster();
      if (this.bounds){
        this.fitBounds();
      } else {
        this.setBounds().done(function(data){
          let coordinates = JSON.parse(data.rows[0].bbox).coordinates[0];
          let southWest = L.latLng(coordinates[0][1],coordinates[0][0]),
          northEast = L.latLng(coordinates[2][1],coordinates[2][0]);
          this.bounds = L.latLngBounds(southWest, northEast);
          this.fitBounds();
        }.bind(this));
      }
    }
  },

  fitBounds: function(){
    this.slideMap.fitBounds(this.bounds,{padding:[15,15]});
  },

  setBounds: function(){
    let query  = 'SELECT ST_AsGeoJSON(ST_Envelope(ST_Union(ST_Transform(ST_Envelope(the_raster_webmercator), 4326)))) as bbox FROM '+ this.cartodbtable +' as t';
    return $.get('https://prep-admin.cartodb.com/api/v2/sql/?q='+query);
  },

  addRaster(){
    this.slideMapEl.addClass('-loading');
    var request = {
      layers: [{
        'user_name': 'prep-admin',
        'type': 'cartodb',
        'options': {
            'sql': 'SELECT * FROM '+this.cartodbtable,
            'cartocss': '#'+this.cartodbtable+' '+this.cartocss,
          'cartocss_version': '2.3.0',
          'geom_column': 'the_raster_webmercator',
          'geom_type': 'raster',
          'raster_band': 1
        }
      }]
    };

    $.ajax({
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      url: 'https://prep-admin.cartodb.com/api/v1/map/',
      data: JSON.stringify(request),
      success: function(data) {
        var tileUrl = 'https://prep-admin.cartodb.com/api/v1/map/' + data.layergroupid + '/{z}/{x}/{y}.png';
        if (this.slideMap) {
          if (this.layer) {
            this.slideMap.removeLayer(this.layer);
            this.layer = null;
          }
          this.layer = L.tileLayer(tileUrl).addTo(this.slideMap, 1);
          this.layer.on('load',function() {
            if(this.slideMapEl){
              this.slideMapEl.removeClass('-loading');
            }
          }.bind(this));
        }
      }.bind(this)
    });
  },

  initLegend() {
    if(!this.slider){
      var steps = this.$('.range span');
      steps.on('click', function(ev){
        var target = ev.currentTarget;
        this.index = $(target).index();
        steps.each(function(index, item){
          item.classList.remove('-selected');
        });
        target.classList.add('-selected');
        this.slider.noUiSlider.set(this.index);
        this.updateLayer(this.index);
        this.addRaster();
      }.bind(this));

      this.slider = document.getElementById('timelineSlider7-2');
      noUiSlider.create(this.slider, {
        start: [0],
        snap: true,
        range: {
          'min': 0,
          '25%': 1,
          '50%': 2,
          '75%': 3,
          'max': 4
        }
      });
    } else {
      this.updateLayer(this.index);
    }
  },

  updateLayer(index){
    switch (index){
      case 1:
        this.cartodbtable = 'cwd1981_2010_ave_hst';
        this.cartocss = '{raster-opacity:1; raster-colorizer-default-mode: linear; raster-colorizer-default-color: transparent; raster-colorizer-epsilon: 0.01; raster-colorizer-stops: stop(1,rgba(44,123,182,1) )stop(31.875,rgba(107,170,207,1) )stop(63.75,rgba(171,217,233,1) )stop(95.625,rgba(213,236,212,1) )stop(127.5,rgba(255,255,191,1) )stop(159.375,rgba(254,214,144,1) )stop(191.25,rgba(253,174,97,1) )stop(223.125,rgba(234,99,62,1) )stop(255,rgba(215,25,28,1) )}';
        break;
      case 2:
        this.cartodbtable = 'cwd_2010_2039_ave_ccsm4';
        this.cartocss = '{raster-opacity:1; raster-colorizer-default-mode: linear; raster-colorizer-default-color: transparent; raster-colorizer-epsilon: 0.01; raster-colorizer-stops: stop(1,rgba(44,123,182,1) )stop(31.875,rgba(107,170,207,1) )stop(63.75,rgba(171,217,233,1) )stop(95.625,rgba(213,236,212,1) )stop(127.5,rgba(255,255,191,1) )stop(159.375,rgba(254,214,144,1) )stop(191.25,rgba(253,174,97,1) )stop(223.125,rgba(234,99,62,1) )stop(255,rgba(215,25,28,1) )}';
        break;
      case 3:
        this.cartodbtable = 'cwd2040_2069_ave_ccsm4';
        this.cartocss = '{raster-opacity:1; raster-colorizer-default-mode: linear; raster-colorizer-default-color: transparent; raster-colorizer-epsilon: 0.01; raster-colorizer-stops: stop(1,rgba(44,123,182,1) )stop(31.875,rgba(107,170,207,1) )stop(63.75,rgba(171,217,233,1) )stop(95.625,rgba(213,236,212,1) )stop(127.5,rgba(255,255,191,1) )stop(159.375,rgba(254,214,144,1) )stop(191.25,rgba(253,174,97,1) )stop(223.125,rgba(234,99,62,1) )stop(255,rgba(215,25,28,1) )}';
        break;
      case 4:
        this.cartodbtable = 'cwd2070_2099_ave_ccsm4';
        this.cartocss = '{raster-opacity:1; raster-colorizer-default-mode: linear; raster-colorizer-default-color: transparent; raster-colorizer-epsilon: 0.01; raster-colorizer-stops: stop(1,rgba(44,123,182,1) )stop(31.875,rgba(107,170,207,1) )stop(63.75,rgba(171,217,233,1) )stop(95.625,rgba(213,236,212,1) )stop(127.5,rgba(255,255,191,1) )stop(159.375,rgba(254,214,144,1) )stop(191.25,rgba(253,174,97,1) )stop(223.125,rgba(234,99,62,1) )stop(255,rgba(215,25,28,1) )}';
        break;
      default:
        this.cartodbtable = 'cwd1951_1980_ave';
        this.cartocss = '{raster-opacity:1; raster-colorizer-default-mode: linear; raster-colorizer-default-color: transparent; raster-colorizer-epsilon: 0.01; raster-colorizer-stops: stop(1,rgba(44,123,182,1) )stop(31.875,rgba(107,170,207,1) )stop(63.75,rgba(171,217,233,1) )stop(95.625,rgba(213,236,212,1) )stop(127.5,rgba(255,255,191,1) )stop(159.375,rgba(254,214,144,1) )stop(191.25,rgba(253,174,97,1) )stop(223.125,rgba(234,99,62,1) )stop(255,rgba(215,25,28,1) )}';
    }
  },

  removeMap(){
    this.slideMap.remove();
    this.slideMap = null;
  }


});
