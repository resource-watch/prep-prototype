import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',

  cartodbtable: 'tmx1951_1980jja_ave_hst',
  cartocss: '{raster-opacity:1; raster-colorizer-default-mode: linear; raster-colorizer-default-color: transparent; raster-colorizer-epsilon: 0.01; raster-colorizer-stops: stop(1,#00009C) stop(31.875,#0046FF) stop(63.75,#00FFFF) stop(95.625,#0CFFCD) stop(127.5,#68FF8A) stop(159.375,#FEFF00) stop(191.25,#FF8F00) stop(223.125,#FF0000) stop(255,#800000) }',

  vegaSpec: {
    "padding": {"top": 30,"left": 25,"bottom": 50,"right": 20},
    "data": [
      {
        "name": "line-1",
        "values": [
          {"x": "1990","y": 5},
          {"x": "1991","y": 4},
          {"x": "1992","y": 5},
          {"x": "1993","y": 7},
          {"x": "1994","y": 8},
          {"x": "1995","y": 10},
          {"x": "1996","y": 11},
          {"x": "1997","y": 15},
          {"x": "1998","y": 20},
          {"x": "1999","y": 22},
          {"x": "2000","y": 28},
          {"x": "2001","y": 31},
          {"x": "2002","y": 28},
          {"x": "2003","y": 30},
          {"x": "2004","y": 29},
          {"x": "2005","y": 27},
          {"x": "2006","y": 25},
          {"x": "2007","y": 21},
          {"x": "2008","y": 29},
          {"x": "2009","y": 30},
          {"x": "2010","y": 31},
          {"x": "2011","y": 32}
        ],
        "format": {"parse": {"x": "date"}}
      },
      {
        "name": "line-2",
        "values": [],
        "format": {"parse": {"x": "date"}}
      },
      {
        "name": "axis",
        "values": [{"x": "Year","y": "Number of days exceeding"}]
      },
      {
        "name": "legend-1",
        "values": [{"name": "> 95°F","color": "#efa600"}]
      },
      {
        "name": "legend-2",
        "values": [{"name": "> 100°F","color": "#1a3e62"}]
      }
    ],
    "scales": [
      {
        "name": "x",
        "type": "time",
        "range": "width",
        "domain": {"data": "line-1","field": "x"}
      },
      {
        "name": "y",
        "type": "linear",
        "range": "height",
        "domain": {"data": "line-1","field": "y"},
        "nice": true
      }
    ],
    "axes": [
      {
        "name": "lbl",
        "type": "x",
        "scale": "x",
        "ticks": 5,
        "format": "%Y",
        "properties": {
          "ticks": {"strokeWidth": {"value": 0}},
          "axis": {
            "stroke": {"value": "#3B4F63"},
            "opacity": {"value": 0.5},
            "strokeWidth": {"value": 0}
          },
          "labels": {
            "font": {"value": "\"Montserrat\", sans-serif"},
            "fontSize": {"value": 10},
            "fontWeight": {"value": 300},
            "fill": {"value": "#3B4F63"},
            "opacity": {"value": 0.5},
            "dy": {"value": 5}
          }
        }
      },
      {
        "type": "y",
        "ticks": 7,
        "scale": "y",
        "grid": true,
        "layer": "back",
        "format": "f",
        "properties": {
          "ticks": {"stroke": {"value": "steelblue"}},
          "majorTicks": {"strokeWidth": {"value": 0}},
          "axis": {
            "stroke": {"value": "#333"},
            "strokeWidth": {"value": 0}
          },
          "grid": {
            "stroke": {"value": "#000"},
            "strokeOpacity": {"value": 0.1},
            "strokeWidth": {"value": 1}
          },
          "labels": {
            "fontSize": {"value": 10},
            "fontWeight": {"value": 300},
            "fill": {"value": "#3B4F63"},
            "opacity": {"value": 0.5}
          }
        }
      }
    ],
    "marks": [
      {
        "type": "line",
        "from": {"data": "line-1"},
        "properties": {
          "enter": {
            "x": {"scale": "x", "field": "x"},
            "y": {"scale": "y","field": "y"},
            "stroke": {"value": "#ffc94e"},
            "strokeWidth": {"value": 2}
          }
        }
      },
      {
        "type": "line",
        "from": {"data": "line-2"},
        "properties": {
          "enter": {
            "x": { "scale": "x", "field": "x"},
            "y": {"scale": "y","field": "y"},
            "stroke": {"value": "#263e57"},
            "strokeWidth": {"value": 2}
          }
        }
      },
      {
        "type": "text",
        "from": {"data": "axis"},
        "properties": {
          "enter": {
            "x": 0,
            "y": 0,
            "text": {"template": "{{datum.y | upper}}"},
            "dx": {"value": -25},
            "dy": {"value": -20},
            "font": {"value": "\"Montserrat\", sans-serif"},
            "fontSize": {"value": 10},
            "fontWeight": {"value": 700},
            "fill": {"value": "#3B4F63"},
            "opacity": {"value": 0.5},
            "align": {"value": "left"}
          }
        }
      },
      {
        "type": "text",
        "from": {"data": "axis"},
        "properties": {
          "enter": {
            "x": 0,
            "y": {"field": {"group": "height"},"mult": 1},
            "text": {"template": "{{datum.x | upper}}"},
            "dx": {"value": -25},
            "dy": {"value": 22},
            "font": {"value": "\"Montserrat\", sans-serif"},
            "fontSize": {"value": 10},
            "fontWeight": {"value": 700},
            "fill": {"value": "#3B4F63"},
            "opacity": {"value": 0.5},
            "align": {"value": "left"}
          }
        }
      },
      {
        "type": "rect",
        "from": {"data": "legend-1"},
        "properties": {
          "enter": {
            "x": {"value": -25},
            "y": {
              "field": {"group": "height"},
              "mult": 1,
              "offset": 45
            },
            "width": {"value": 9},
            "y2": {
              "field": {"group": "height"},
              "mult": 1,
              "offset": 48
            },
            "fill": {"field": "color"}
          }
        }
      },
      {
        "type": "text",
        "from": {"data": "legend-1"},
        "properties": {
          "enter": {
            "x": 0,
            "y": {"field": {"group": "height"},"mult": 1},
            "text": {"template": "{{datum.name | upper}}"},
            "dx": {"value": -9},
            "dy": {"value": 50},
            "font": {"value": "\"Montserrat\", sans-serif"},
            "fontSize": {"value": 10},
            "fontWeight": {"value": 700},
            "fill": {"value": "#3b4f63"},
            "opacity": {"value": 0.7},
            "align": {"value": "left"}
          }
        }
      },
      {
        "type": "rect",
        "from": {"data": "legend-2"},
        "properties": {
          "enter": {
            "x": {
              "value": 40
            },
            "y": {
              "field": {"group": "height"},
              "mult": 1,
              "offset": 45
            },
            "width": {"value": 9},
            "y2": {
              "field": {"group": "height"},
              "mult": 1,
              "offset": 48
            },
            "fill": {"field": "color"}
          }
        }
      },
      {
        "type": "text",
        "from": {"data": "legend-2"},
        "properties": {
          "enter": {
            "x": {
              "value": 40
            },
            "y": {"field": {"group": "height"},"mult": 1},
            "text": {"template": "{{datum.name | upper}}"},
            "dx": {"value": 16},
            "dy": {"value": 50},
            "font": {"value": "\"Montserrat\", sans-serif"},
            "fontSize": {"value": 10},
            "fontWeight": {"value": 700},
            "fill": {"value": "#3b4f63"},
            "opacity": {"value": 0.7},
            "align": {"value": "left"}
          }
        }
      }
    ]
  },

  didRender() {
    this.$chart = this.$('#chart4-1');
    this.slideMapEl = this.$('#map4-2');
    this.initChart();
    this.setListeners();
  },

  setListeners: function() {
    this.refreshEvent = _.debounce(_.bind(this.update, this), 300);
    $(window).on('resize', this.refreshEvent);

    Reveal.addEventListener('slidechanged', function( event ) {
      if (event.currentSlide.classList.contains('slide-map-4-2')) {
        this.initMap();
        this.initLegend();
      } else if (this.slideMap) {
        this.removeMap();
      }
    }.bind(this));
  },

  update: function() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
      this.initChart();
    }
  },

  getSize: function() {
    const vegaSpec = this.vegaSpec;
    const widthSpace = vegaSpec.padding ?
      vegaSpec.padding.left + vegaSpec.padding.right : 0;
    const heightSpace = vegaSpec.padding ?
      vegaSpec.padding.top + vegaSpec.padding.bottom : 0;

    const containerSize = this.$chart[0].getBoundingClientRect();

    return {
      width: containerSize.width - widthSpace,
      height: containerSize.height - heightSpace
    };
  },

  getVegaSpec: function() {
    var size = this.getSize();
    this.vegaSpec.width = size.width;
    this.vegaSpec.height = size.height;
    return this.vegaSpec;
  },

  initChart: function() {
    var vegaSpec = this.getVegaSpec();
    vg.parse.spec(vegaSpec, chart => chart({ el: this.$chart[0] }).update());
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
      this.slideMap = L.map('map4-2', mapOptions);
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
            'cartocss': '#'+this.cartodbtable+this.cartocss,
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

    const steps = this.$('.range span');

    /* We create the slider instance */
    this.slider = document.getElementById('timelineSlider4-2');
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
        this.cartodbtable = 'tmx1981_2010jja_ave_hst';
        break;
      case 1:
        this.cartodbtable = 'tmx2010_2039jja_ave_ccsm4';
        break;
      case 2:
        this.cartodbtable = 'tmx2040_2069jja_ave_ccsm4';
        break;
      case 3:
        this.cartodbtable = 'tmx2070_2099jja_ave_ccsm4';
        break;
      default:
        this.cartodbtable = 'tmx1951_1980jja_ave_hst';
    }
    this.addRaster();
  },

  removeMap(){
    this.slideMap.remove();
    this.slideMap = null;
  }

});
