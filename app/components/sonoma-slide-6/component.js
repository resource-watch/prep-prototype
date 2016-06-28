import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',

  vegaSpec: {
    "padding": {"top": 30,"left": 40,"bottom": 65,"right": 20},
    "data": [
      {
        "name": "bars",
        "values": [],
        "transform": [
          {
            "type": "formula",
            "field": "label",
            "expr": "(2001 + datum.x * 5) + '-' + (2005 + datum.x * 5)"
          }
        ]
      },
      {
        "name": "axis",
        "values": [{"x": "Year","y": "Number of events"}]
      },
      {
        "name": "legend-1",
        "values": [{"name": "Lower flow","color": "#1a3e62"}]
      },
      {
        "name": "legend-2",
        "values": [{"name": "Upper flow","color": "#ffc94e"}]
      }
    ],
    "scales": [
      {
        "name": "x",
        "type": "ordinal",
        "range": "width",
        "padding": 0.2,
        "domain": {"fields": [{"data": "bars","field": "x"}]}
      },
      {
        "name": "y",
        "type": "linear",
        "range": "height",
        "domain": {"fields": [{"data": "bars","field": "y"}]},
        "nice": true
      },
      {
        "name": "color",
        "type": "ordinal",
        "domain": {"data": "bars","field": "position"},
        "range": ["#1a3e62","#ffc94e"]
      }
    ],
    "axes": [
      {
        "name": "lbl",
        "type": "x",
        "scale": "x",
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
            "dy": {"value": 5},
            "angle": {"value": -30},
            "text": {"value": ""}
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
        "properties": {
          "enter": {
            "x": {"scale": "x", "value": "0"},
            "x2": {"scale": "x", "value": "2"},
            "y": {"value": 0},
            "height": {"field": {"group": "height"}},
            "fill": {"value": "#001421"},
            "opacity": {"value": 0.08}
          }
        }
      },
      {
        "type": "group",
        "from": {
          "data": "bars",
          "transform": [{"type": "facet","groupby": ["x"]}]
        },
        "properties": {
          "enter": {
            "x": {"scale": "x","field": "key"},
            "width": {"scale": "x","band": true}
          }
        },
        "scales": [
          {
            "name": "pos",
            "type": "ordinal",
            "range": "width",
            "domain": {"field": "position"}
          }
        ],
        "marks": [
          {
            "name": "bars",
            "type": "rect",
            "properties": {
              "enter": {
                "x": {"scale": "pos","field": "position"},
                "width": {"scale": "pos","band": true},
                "y": {"scale": "y","field": "y"},
                "y2": {"scale": "y","value": 0},
                "fill": {"scale": "color","field": "position"}
              }
            }
          },
          {
            "type": "text",
            "from": {
              "transform": [
                {
                  "type": "filter",
                  "test": "datum.x % 2 == 0 && datum.position == 0"
                }
              ]
            },
            "properties": {
              "enter": {
                "x": {"scale": "pos","field": "position"},
                "y": {"scale": "y","value": 0},
                "text": {
                  "template": "{{datum.label}}"
                },
                "dx": {"value": -42},
                "dy": {"value": 20},
                "angle": {"value": -30},
                "fill": {"value": "#3B4F63"},
                "opacity": {"value": 0.5},
                "font": {"value": "\"Montserrat\", sans-serif"},
                "fontSize": {"value": 10},
                "fontWeight": {"value": 300}
              }
            }
          }
        ]
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
        "type": "rect",
        "from": {"data": "legend-1"},
        "properties": {
          "enter": {
            "x": {"value": -25},
            "y": {
              "field": {"group": "height"},
              "mult": 1,
              "offset": 58
            },
            "width": {"value": 9},
            "y2": {
              "field": {"group": "height"},
              "mult": 1,
              "offset": 55
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
            "dy": {"value": 60},
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
              "offset": 55
            },
            "width": {"value": 9},
            "y2": {
              "field": {"group": "height"},
              "mult": 1,
              "offset": 58
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
            "dy": {"value": 60},
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
        this.vegaSpec.data[0].values = this._getParseData(data.rows);
        this.initChart();
      }.bind(this));
    this.setListeners();
  },

  fetchData: function() {
    // var query = "with low as (SELECT split_part(date, '/', 3)::int%2B2000 as date, count(pcm_a2_lower_river) lower FROM day_average_flows where pcm_a2_lower_river>38902.6 group by split_part(date, '/', 3)::int%2B2000 order by date asc), up as (SELECT split_part(date, '/', 3)::int%2B2000 as date, count(pcm_a2_upper_river) upper FROM day_average_flows where pcm_a2_upper_river>19298.2 group by split_part(date, '/', 3)::int%2B2000 order by date asc) select to_date(up.date::text, 'YYYY') date, lower, upper from low full outer join up on low.date=up.date order by date asc"
    var query = "with low as (SELECT distinct on (cat)  (cat-400) as cat, count(pcm_a2_lower_river) over (partition by cat order by cat asc) lower FROM \"prep-admin\".day_average_flow where pcm_a2_lower_river>38902.6 order by cat asc), up as (SELECT distinct on (cat)  (cat-400) as cat, count(pcm_a2_upper_river) over (partition by cat order by cat asc) upper FROM \"prep-admin\".day_average_flow where pcm_a2_upper_river>19298.2 order by cat asc) select up.cat, lower, upper from low full outer join up on low.cat=up.cat order by cat asc";

    return $.get('https://prep-admin.cartodb.com/api/v2/sql?q='+query);
  },

  _getParseData: function(data) {
    var parseData = [];

    let dataIndex = 0;
    for(let i = 0, j = Math.max.apply(null, data.map(row => row.cat)); i < j; i++) {
      const x = i;

      if(i === data[dataIndex].cat) {
        parseData.push({ x, y: data[dataIndex].lower || 0, position: 0 });
        parseData.push({ x, y: data[dataIndex].upper || 0, position: 1 });
        dataIndex++;
      } else {
        parseData.push({ x, y: 0, position: 0 });
        parseData.push({ x, y: 0, position: 1 });
      }
    }

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
