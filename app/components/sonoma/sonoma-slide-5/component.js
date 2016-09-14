import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',

  vegaSpec: {
    "padding": {"top": 40,"left": 40,"bottom": 50,"right": 20},
    "signals": [
      {
        "name": "currentYear",
        "init": "0",
        "streams": [{
          "type": "mousemove",
          "expr": "utcyear(iscale('x', eventX()))"
        }]
      },
      {
        "name": "tooltip",
        "init": {"x": 0, "y": 0},
        "streams": [{
          "type": "mousemove",
          "expr": "{xLeft: +iscale('x', eventX()), xRight: +iscale('x', eventX() - 150)}"
        }]
      }
    ],
    "data": [
      {
        "name": "line",
        "values": [],
        "format": {"parse": {"x": "date"}}
      },
      {
        "name": "axis",
        "values": [{"x": "Year","y": "Precipitation in inches"}]
      },
      {
        "name": "tooltip",
        "source": "line",
        "transform": [
          {
            "type": "filter",
            "test": "datum.x == utc(currentYear, 0, 1)"
          },
          {
            "type": "formula",
            "field": "xTooltip",
            "expr": "datum.x > utc(2040, 0, 1) ? tooltip.xRight : tooltip.xLeft"
          },
          {
            "type": "formula",
            "field": "xData",
            "expr": "tooltip.xLeft"
          }
        ]
      }
    ],
    "scales": [
      {
        "name": "x",
        "type": "time",
        "range": "width",
        "domain": {"data": "line","field": "x"}
      },
      {
        "name": "y",
        "type": "linear",
        "range": "height",
        "domain": {"data": "line","field": "y"},
        "nice": true
      }
    ],
    "axes": [
      {
        "name": "lbl",
        "type": "x",
        "scale": "x",
        "values": [
          -1577923200000,
          -946771200000,
          -315619200000,
          315532800000,
          946684800000,
          1577836800000,
          2208988800000,
          2840140800000,
          3471292800000
        ],
        "formatType": "utc",
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
        "type": "area",
        "from": {"data": "area"},
        "properties": {
          "enter": {
            "x": {"scale": "x","field": "x"},
            "y": {"scale": "y","field": "y"},
            "y2": {"scale": "y","value": "0"},
            "fill": {"value": "#000"},
            "opacity": {"value": 0.07}
          }
        }
      },
      {
        "type": "line",
        "from": {"data": "line"},
        "properties": {
          "enter": {
            "x": {"scale": "x","field": "x"},
            "y": {"scale": "y","field": "y"},
            "stroke": {"value": "#fff"},
            "strokeWidth": {"value": 3}
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
            "dx": {"value": -40},
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
        "type": "rule",
        "properties": {
          "enter": {
            "x": { "value": 0},
            "x2": {"field": {"group": "width"}},
            "y": { "scale": "y", "value": 56.4},
            "stroke": {"value": "#263e57"},
            "strokeWidth": {"value": 1.5}
          }
        }
      },
      {
        "type": "rule",
        "properties": {
          "enter": {
            "x": { "value": 0},
            "x2": {"field": {"group": "width"}},
            "y": { "scale": "y", "value": 27.1},
            "stroke": {"value": "#3B4F63"},
            "strokeWidth": {"value": 1.5},
            "opacity": {"value": 0.5}
          }
        }
      },
      {
        "type": "group",
        "from": {"data": "tooltip"},
        "properties": {
          "update": {
            "x": {"scale": "x", "field": "xTooltip"},
            "y": {"scale": "y", "field": "y", "offset": -55},
            "width": {"value": 150},
            "height": {"value": 45},
            "fill": {"value": "#fff"},
            "fillOpacity": {"value": 0.85}
          }
        },

        "marks": [
          {
            "type": "text",
            "properties": {
              "update": {
                "x": {"value": 10},
                "y": {"value": 17},
                "text": {"template": "{{currentYear}}"},
                "font": {"value": "\"Montserrat\", sans-serif"},
            "fontSize": {"value": 11},
                "fill": {"value": "#3B4F63"},
                "opacity": {"value": 0.8},
                "fontWeight": {"value": "bold"}
              }
            }
          },
          {
            "type": "text",
            "properties": {
              "update": {
                "x": {"value": 11},
                "y": {"value": 35},
                "text": {"template": "{{parent.y|number:'.2f'}} in"},
                "font": {"value": "\"Montserrat\", sans-serif"},
                "fontSize": {"value": 11},
                "fill": {"value": "#3B4F63"},
                "opacity": {"value": 0.8}
              }
            }
          }
        ]
      },
      {
        "type": "symbol",
        "from": {"data": "tooltip"},
        "size": 4,
        "properties": {
          "update": {
            "x": {"scale": "x", "field": "xData"},
            "y": {"scale": "y", "field": "y"},
            "font": {"value": "\"Montserrat\", sans-serif"},
            "fontSize": {"value": 12},
            "fill": {"value": "#fff"},
            "stroke": {"value": "#ffc94e"},
            "strokeWidth": {"value": 2}
          }
        }
      },
      {
      "type": "rect",
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
            "fill": {"value": "#3B4F63"},
            "opacity": {"value": 0.5}
          }
        }
      },
      {
        "type": "text",
        "properties": {
          "enter": {
            "x": {"value": 0},
            "y": {"field": {"group": "height"},"mult": 1},
            "text": {"value": "10TH PERCENTILE (27.1 IN/YR)"},
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
        "properties": {
          "enter": {
            "x": {
              "field": {"group": "width"},
              "mult": 0.5,
              "offset": -25
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
            "fill": {"value": "#263e57"}
          }
        }
      },
      {
        "type": "text",
        "properties": {
          "enter": {
            "x": {
              "field": {"group": "width"},
              "mult": 0.5
            },
            "y": {"field": {"group": "height"},"mult": 1},
            "text": {"value": "90TH PERCENTILE (56.4 IN/YR)"},
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
      }
    ]
  },

  didRender() {
    this.$chart = this.$('#chart5-1');
    this.fetchData()
      .done(function(data){
        this.vegaSpec.data[0].values = data.rows;
        this.initChart();
      }.bind(this));
    this.setListeners();
  },

  fetchData: function() {
    return $.get('https://prep-admin.cartodb.com/api/v2/sql?q=SELECT year AS x, precipitation_in_yr AS y FROM "prep-admin". precipitation_pcm_a2 union all select year AS x, precipitation_in_yr AS y FROM precipitation1920_2009 order by x asc');
  },

  setListeners: function() {
    this.refreshEvent = _.debounce(_.bind(this.update, this), 300);
    $(window).on('resize', this.refreshEvent);
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
  }


});
