import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',

  vegaSpec: {
  "padding": {"top": 30,"left": 25,"bottom": 50,"right": 20},
  "width": 400,
  "height": 240,
  "data": [
    {
      "name": "bar-1",
      "values": [
        {"x": "1990","y": 27},
        {"x": "1991","y": 25},
        {"x": "1992","y": 30},
        {"x": "1993","y": 23},
        {"x": "1994","y": 25},
        {"x": "1995","y": 25},
        {"x": "1996","y": 24},
        {"x": "1997","y": 22},
        {"x": "1998","y": 21},
        {"x": "1999","y": 20},
        {"x": "2000","y": 24},
        {"x": "2001","y": 26},
        {"x": "2002","y": 30},
        {"x": "2003","y": 32},
        {"x": "2004","y": 31},
        {"x": "2005","y": 30},
        {"x": "2006","y": 31},
        {"x": "2007","y": 29},
        {"x": "2008","y": 28},
        {"x": "2009","y": 30},
        {"x": "2010","y": 30},
        {"x": "2011","y": 32}
      ],
      "format": {"parse": {"x": "date"}}
    },
    {
      "name": "bar-2",
      "values": [
        {"x": "1990","y": 22},
        {"x": "1991","y": 20},
        {"x": "1992","y": 24},
        {"x": "1993","y": 17},
        {"x": "1994","y": 21},
        {"x": "1995","y": 21},
        {"x": "1996","y": 23},
        {"x": "1997","y": 17},
        {"x": "1998","y": 17},
        {"x": "1999","y": 18},
        {"x": "2000","y": 19},
        {"x": "2001","y": 22},
        {"x": "2002","y": 25},
        {"x": "2003","y": 23},
        {"x": "2004","y": 24},
        {"x": "2005","y": 18},
        {"x": "2006","y": 20},
        {"x": "2007","y": 21},
        {"x": "2008","y": 23},
        {"x": "2009","y": 24},
        {"x": "2010","y": 24},
        {"x": "2011","y": 26}
      ],
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
      "domain": {"data": "bar-1","field": "x"}
    },
    {
      "name": "y",
      "type": "linear",
      "range": "height",
      "domain": {"data": "bar-1","field": "y"},
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
      "type": "rect",
      "from": {"data": "bar-1"},
      "properties": {
        "enter": {
          "x": {
            "scale": "x",
            "field": "x",
            "mult": 0.98
          },
          "width": {"value": 4},
          "y": {"scale": "y","field": "y"},
          "y2": {"field": {"group": "height"}},
          "fill": {"value": "#ffc94e"},
          "strokeWidth": {"value": 0}
        }
      }
    },
    {
      "type": "rect",
      "from": {"data": "bar-2"},
      "properties": {
        "enter": {
          "x": {
            "scale": "x",
            "field": "x",
            "mult": 0.98,
            "offset": 5
          },
          "width": {"value": 4},
          "y": {"scale": "y","field": "y"},
          "y2": {"field": {"group": "height"}},
          "fill": {"value": "#263e57"},
          "strokeWidth": {"value": 0}
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
    this.$chart = this.$('#chart3-1');
    this.initChart();
    this.setListeners();
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
