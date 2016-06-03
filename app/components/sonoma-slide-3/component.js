import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  classNames: ['sonoma-slide','slide-3'],
  attributeBindings:["data-title"],
  "data-title": 'Slide 3',

  vegaSpec: {
    "padding": {"top": 25,"left": 45,"bottom": 30,"right": 20},
    "width": 270,
    "height": 240,
    "data": [
      {
        "name": "table",
        "values": [
          {"x": "1990","y": 49882.21334},
          {"x": "1991","y": 50439.99762},
          {"x": "1992","y": 53788.76345},
          {"x": "1993","y": 54091.51656},
          {"x": "1994","y": 54430.268},
          {"x": "1995","y": 55702.0407},
          {"x": "1996","y": 57092.01688},
          {"x": "1997","y": 57529.63805},
          {"x": "1998","y": 57811.34489},
          {"x": "1999","y": 57926.15725},
          {"x": "2000","y": 59692.20263},
          {"x": "2001","y": 61106.12063},
          {"x": "2002","y": 62043.8042},
          {"x": "2003","y": 64553.98158},
          {"x": "2004","y": 66915.40318},
          {"x": "2005","y": 68740.32298},
          {"x": "2006","y": 69965.1020100001},
          {"x": "2007","y": 71781.30638},
          {"x": "2008","y": 72262.57875},
          {"x": "2009","y": 69906.36943},
          {"x": "2010","y": 73082.2306000001},
          {"x": "2011","y": 74736.86963}
        ],
        "format": {"parse": {"x": "date"}}
      },
      {
        "name": "summary",
        "source": "table",
        "transform": [
          {
            "type": "aggregate",
            "summarize": {"y": ["min","max"]}
          },
          {
            "type": "formula",
            "field": "difference",
            "expr": "datum.max_y-datum.min_y"
          },
          {
            "type": "formula",
            "field": "min",
            "expr": "datum.min_y === 0 ? 0 : (datum.difference > 0 ? datum.min_y - datum.difference * 0.2  : datum.min_y * 0.8)"
          },
          {
            "type": "formula",
            "field": "min",
            "expr": "datum.min < 0 ? 0 : datum.min"
          },
          {
            "type": "formula",
            "field": "max",
            "expr": "datum.max_y === 0 ? 10 : (datum.difference > 0 ? datum.max_y + datum.difference * 0.2 : datum.max_y * 1.2)"
          }
        ]
      },
      {
        "name": "computed",
        "source": "table",
        "transform": [{"type": "cross","with": "summary"}]
      }
    ],
    "scales": [
      {
        "name": "x",
        "type": "time",
        "range": "width",
        "domain": {"data": "table","field": "x"}
      },
      {
        "name": "y",
        "type": "linear",
        "range": "height",
        "domain": {"data": "computed","field": "a.y"},
        "domainMin": {"data": "computed","field": "b.min"},
        "domainMax": {"data": "computed","field": "b.max"},
        "zero": false,
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
            "stroke": {"value": "#333"},
            "strokeWidth": {"value": 0}
          },
          "labels": {
            "fontSize": {"value": 10},
            "fontWeight": {"value": 300},
            "fill": {"value": "#9BA2AA"},
            "dx": {"value": 5}
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
          "labels": {
            "fontSize": {"value": 10},
            "fontWeight": {"value": 300},
            "fill": {"value": "#9BA2AA"}
          }
        }
      }
    ],
    "marks": [
      {
        "type": "rect",
        "from": {"data": "table"},
        "properties": {
          "enter": {
            "x": {"scale": "x","field": "x"},
            "width": {"field": {"group": "width"},"mult": 0.03},
            "y": {"scale": "y","field": "y"},
            "y2": {"field": {"group": "height"}}
          },
          "update": {"fill": {"value": "#5BB1D2"}},
          "hover": {"fill": {"value": "#c32d7b"}}
        }
      },
      {
        "type": "text",
        "from": {
          "data": "table",
          "transform": [{"type": "facet","groupby": ["unit"]}]
        },
        "properties": {
          "enter": {
            "x": {"value": -30},
            "y": {"value": -15},
            "text": {"template": "{{datum.unit}}"},
            "fontSize": {"value": 10},
            "fontWeight": {"value": 300},
            "fill": {"value": "#9BA2AA"},
            "align": {"value": "left"}
          }
        }
      }
    ]
  },

  didRender: function() {
    Reveal.addEventListener('slidechanged', function( event ) {
      if (event.currentSlide.classList.contains('slide-3')) {
        this._iniChart();
      }
    }.bind(this));

    this.el = this.$('#chart3-1');

    this._iniChart();
    this.setListeners();
  },

  setListeners: function() {
    this.refreshEvent = _.debounce(_.bind(this.update, this), 300);
    $(window).on('resize', _.bind(this.update, this));
  },

  /**
   * Method to redraw chart
   */
  update: function() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
      this._iniChart();
    }
  },

  /**
   * Method to override and parese vega JSON parameterization
   * @return {Object}
   */
  getVegaSpec: function() {
    var size = this.getSize();
    this.vegaSpec.width = size.width;
    this.vegaSpec.height = size.height;
    return this.vegaSpec;
  },

  /**
   * Calculate width and height
   * @return {Object}
   */
  getSize: function() {
    var vegaSpec = this.vegaSpec;
    var widthSpace = vegaSpec.padding ?
      vegaSpec.padding.left + vegaSpec.padding.right : 0;
    var heightSpace = vegaSpec.padding ?
      vegaSpec.padding.top + vegaSpec.padding.bottom : 0;
    return {
      width: this.el.clientWidth - widthSpace,
      height: this.el.clientHeight - heightSpace
    };
  },

  _iniChart: function() {
    var vegaSpec = this.getVegaSpec();
    vg.parse.spec(vegaSpec, function(chart) {
      chart({el:"#chart3-1"})
        .update();
    });
  }
});
