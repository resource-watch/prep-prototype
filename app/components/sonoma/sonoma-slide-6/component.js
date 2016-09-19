import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',

  cartodbtable: 'o_1_tmn1951_1980djf_ave_hst',
  cartocss: '{raster-opacity:1; raster-colorizer-default-mode: linear; raster-colorizer-default-color: transparent; raster-colorizer-epsilon: 0.01; raster-colorizer-stops: stop(250,#800000) }',

  didRender() {
    this.slideMapEl = this.$('#map3-1');
    this.setListeners();
  },

  setListeners: function() {
    Reveal.addEventListener('slidechanged', function( event ) {
      if (event.currentSlide.classList.contains('slide-map-3-1')) {
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
          maxZoom: 9
        }
      }
    };

    if (!this.slideMap){
      this.slideMap = L.map('map3-1', mapOptions);
      L.tileLayer(mapOptions.basemapSpec.url, mapOptions.basemapSpec.options).addTo(this.slideMap);
      L.control.zoom({ position: 'topright' }).addTo(this.slideMap);
      this.addRaster();
      this.addLabels();
      // commented because of this raster is bigger and doesnt fit well
      // if (this.bounds){
      //   this.fitBounds();
      // } else {
      //   this.setBounds().done(function(data){
      //     let coordinates = JSON.parse(data.rows[0].bbox).coordinates[0];
      //     let southWest = L.latLng(coordinates[0][1],coordinates[0][0]),
      //     northEast = L.latLng(coordinates[2][1],coordinates[2][0]);
      //     this.bounds = L.latLngBounds(southWest, northEast);
      //     this.fitBounds();
      //   }.bind(this));
      // }
    }
  },

  fitBounds: function(){
    this.slideMap.fitBounds(this.bounds);
    // this.slideMap.setMaxBounds(this.bounds);
    // this.slideMap.options.minZoom = this.slideMap.getZoom();
  },

  setBounds: function(){
    let query  = 'SELECT ST_AsGeoJSON(ST_Envelope(ST_Union(ST_Transform(ST_Envelope(the_raster_webmercator), 4326)))) as bbox FROM '+ this.cartodbtable +' as t';
    return $.get('https://prep-admin.cartodb.com/api/v2/sql/?q='+query);
  },

  addLabels(){
    var request = {
      layers: [{
        'user_name': 'prep-admin',
        'type': 'cartodb',
        'options': {
            'sql': 'SELECT * FROM \"prep-admin\".rrcounties',
            'cartocss': '#rrcounties{polygon-fill:transparent;line-color: #cccac9;line-width: 1;line-opacity: 0.8;} #ci08au12::labels {text-name: [name];text-face-name: \'Lato Regular\';text-size: 10;text-label-position-tolerance: 10;text-fill: #a3a1a0;text-halo-fill: #FFF;text-halo-radius: 0.2;text-dy: -10;text-allow-overlap: false;text-placement: point;text-placement-type: simple;}',
          'cartocss_version': '2.3.0',
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
          var labelsLayer = L.tileLayer(tileUrl).setZIndex(3).addTo(this.slideMap, 1);

          labelsLayer.on('load',function() {
            if(this.slideMapEl){
              this.slideMapEl.removeClass('-loading');
            }
          }.bind(this));
        }
      }.bind(this)
    });
  },

  addRaster(){
    this.slideMapEl.addClass('-loading');
    var request = {
      layers: [{
        'user_name': 'prep-admin',
        'type': 'cartodb',
        'options': {
            'sql': 'with xr as (SELECT the_geom_webmercator FROM \"prep-admin\".cb_2015_06_tract_500k_copy) select ST_clip(the_raster_webmercator,1,the_geom_webmercator, 1) the_raster_webmercator from \"prep-admin\".'+this.cartodbtable+', xr  where st_intersects(the_geom_webmercator, the_raster_webmercator)',
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
    if(this.slider) return this.updateLayer(this.index);

    const steps = this.$('.years span');

    /* We create the slider instance */
    this.slider = document.getElementById('timelineSlider3-1');
    noUiSlider.create(this.slider, {
      start: [ 0 ],
      step: 1,
      range: {
        'min': [ 0 ],
        'max': [ steps.length - 1 ]
      }
    });

    const switchLayer = index => {
      /* We update the map */
      this.index = index;
      this.updateLayer(index);
      this.addRaster();

      /* We update the slider */
      this.slider.noUiSlider.set([ index ]);
      steps.removeClass('-selected');
      steps[index].classList.add('-selected');
    };

    /* Event listener for the click on the labels */
    steps.on('click', e => switchLayer($(e.currentTarget).index()));

    /* Event listener for when the cursor is dragged */
    this.slider.noUiSlider.on('change', index => switchLayer(+index));
  },

  updateLayer(index){
    switch (index){
      case 0:
        this.cartodbtable = 'o_1_tmn1951_1980djf_ave_hst';
        break;
      case 1:
        this.cartodbtable = 'o_1_tmn1981_2010djf_ave_hst';
        break;
      case 2:
        this.cartodbtable = 'o_1_tmn2010_2039djf_ave_ccsm4';
        break;
      case 3:
        this.cartodbtable = 'o_1_tmn2040_2069djf_ave_ccsm4';
        break;
      case 4:
        this.cartodbtable = 'o_1_tmn2070_2099djf_ave_ccsm4';
        break;
      default:
        this.cartodbtable = 'o_1_tmn1951_1980djf_ave_hst';
    }
  },

  removeMap(){
    this.slideMap.remove();
    this.slideMap = null;
  }

});
