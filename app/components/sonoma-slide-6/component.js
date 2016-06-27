import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',

  vegaSpec: {
    "padding": {"top": 30,"left": 40,"bottom": 65,"right": 20},
    "data": [
      {
        "name": "bar-1",
        "values": [],
        "format": {"parse": {"x": "date"}},
        "transform": [
          {
            "type": "formula",
            "field": "x1",
            "expr": "datum.x - 5000000000"
          },
          {
            "type": "formula",
            "field": "x2",
            "expr": "datum.x + 5000000000"
          }
        ]
      },
      {
        "name": "bar-2",
        "values": [],
        "format": {"parse": {"x": "date"}},
        "transform": [
          {
            "type": "formula",
            "field": "x1",
            "expr": "datum.x - 5000000000 + 12000000000"
          },
          {
            "type": "formula",
            "field": "x2",
            "expr": "datum.x + 5000000000 + 12000000000"
          }
        ]
      },
      {
        "name": "axis",
        "values": [{"x": "Year","y": "Number of events"}]
      },
      {
        "name": "legend-1",
        "values": [{"name": "Upper flow","color": "#ffc94e"}]
      },
      {
        "name": "legend-2",
        "values": [{"name": "Lower flow","color": "#1a3e62"}]
      }
    ],
    "scales": [
      {
        "name": "x",
        "type": "time",
        "range": "width",
        "domain": {
          "fields": [
            {"data": "bar-1", "field": "x"},
            {"data": "bar-2", "field": "x"}
           ]
        }
      },
      {
        "name": "y",
        "type": "linear",
        "range": "height",
        "domain": {
          "fields": [
            {"data": "bar-1", "field": "y"},
            {"data": "bar-2", "field": "y"}
           ]
        },
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
            "x": {"scale": "x","field": "x1"},
            "x2": {"scale": "x","field": "x2"},
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
              "field": "x1"
            },
            "x2": {
              "scale": "x",
              "field": "x2"
            },
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
              "offset": 44
            },
            "width": {"value": 9},
            "y2": {
              "field": {"group": "height"},
              "mult": 1,
              "offset": 47
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
            "x": {"value": 100},
            "y": {
              "field": {"group": "height"},
              "mult": 1,
              "offset": 44
            },
            "width": {"value": 9},
            "y2": {
              "field": {"group": "height"},
              "mult": 1,
              "offset": 47
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
            "x": 0,
            "y": {"field": {"group": "height"},"mult": 1},
            "text": {"template": "{{datum.name | upper}}"},
            "dx": {"value": 115},
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
    this.$chart = this.$('#chart6-1');
    this.fetchData()
      .done(function(data){
        this.vegaSpec.data[0].values = this._getParseData(data.rows,'lower');
        this.vegaSpec.data[1].values = this._getParseData(data.rows,'upper');
        this.initChart();
      }.bind(this));
    this.setListeners();
  },

  fetchData: function() {
    // var query = "with low as (SELECT split_part(date, '/', 3)::int%2B2000 as date, count(pcm_a2_lower_river) lower FROM day_average_flows where pcm_a2_lower_river>38902.6 group by split_part(date, '/', 3)::int%2B2000 order by date asc), up as (SELECT split_part(date, '/', 3)::int%2B2000 as date, count(pcm_a2_upper_river) upper FROM day_average_flows where pcm_a2_upper_river>19298.2 group by split_part(date, '/', 3)::int%2B2000 order by date asc) select to_date(up.date::text, 'YYYY') date, lower, upper from low full outer join up on low.date=up.date order by date asc"
    var query = "with low as (SELECT distinct on (cat)  (cat-400) as cat, count(pcm_a2_lower_river) over (partition by cat order by cat asc) lower FROM \"prep-admin\".day_average_flow where pcm_a2_lower_river>38902.6 order by cat asc), up as (SELECT distinct on (cat)  (cat-400) as cat, count(pcm_a2_upper_river) over (partition by cat order by cat asc) upper FROM \"prep-admin\".day_average_flow where pcm_a2_upper_river>19298.2 order by cat asc) select up.cat, lower, upper from low full outer join up on low.cat=up.cat order by cat asc";

    return $.get('https://prep-admin.cartodb.com/api/v2/sql?q='+query);
  },

  _getParseData: function(data,type) {
    var parseData = [];
    data.forEach(function(item){
      let y = item[type] || 0;
      parseData.push({x: item.cat,y: y});
    });
    return parseData;
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
