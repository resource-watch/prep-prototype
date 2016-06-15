import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',

  vegaSpec: {
    "padding": {"top": 30,"left": 40,"bottom": 25,"right": 20},
    "data": [
      {
        "name": "bar-1",
        "values": [],
        "format": {"parse": {"x": "date"}}
      },
      {
        "name": "bar-2",
        "values": [],
        "format": {"parse": {"x": "date"}}
      },
      {
        "name": "axis",
        "values": [{"x": "Year","y": "Watershed"}]
      },
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
    var query = "with low as (SELECT split_part(date, '/', 3)::int%2B2000 as date, count(pcm_a2_lower_river) lower FROM day_average_flows where pcm_a2_lower_river>38902.6 group by split_part(date, '/', 3)::int%2B2000 order by date asc), up as (SELECT split_part(date, '/', 3)::int%2B2000 as date, count(pcm_a2_upper_river) upper FROM day_average_flows where pcm_a2_upper_river>19298.2 group by split_part(date, '/', 3)::int%2B2000 order by date asc) select to_date(up.date::text, 'YYYY') date, lower, upper from low full outer join up on low.date=up.date order by date asc"

    return $.get('https://prep-admin.cartodb.com/api/v2/sql?q='+query);
  },

  _getParseData: function(data,type) {
    var parseData = [];
    data.forEach(function(item){
      parseData.push({x:item.date,y:item[type]});
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
