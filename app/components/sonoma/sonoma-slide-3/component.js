import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',

  cartodbtable: 'o_1_tmx1951_1980_ave_hst',
  cartocss: '{raster-opacity:1; raster-colorizer-default-mode: linear; raster-colorizer-default-color: transparent; raster-colorizer-epsilon: 0.01; raster-colorizer-stops: stop(143.152,#00009C) stop(153.226,#0046FF) stop(163.3,#00FFFF) stop(173.375,#0CFFCD) stop(183.449,#68FF8A) stop(193.523,#FEFF00) stop(203.597,#FF8F00) stop(213.672,#FF0000) stop(223.746,#800000) }',
  widgetId: 'ec40fa88-2f75-4681-abd4-0161db504ee6',

  didRender() {
    this.$chart = this.$('.chart3-1');

    this.renderChart(this.$chart, this.widgetId);

    // this.fetchData('https://api.resourcewatch.org/v1/widget/' + this.widgetId)
    //   .done(function(widget) {
    //     this.widget = widget.data.attributes;
    //     this.vegaSpec = this.widget.widgetConfig;

    //     this.fetchData('https://api.resourcewatch.org/v1/' + this.widget.queryUrl)
    //       .done(function(data){
    //         this.vegaSpec.data[0].values = data.data;
    //         this.initChart();
    //     }.bind(this));
    // }.bind(this));
  },

  fetchData: function(url) {
    return $.get(url);
  },

  getSize: function() {
    const vegaSpec = this.vegaSpec;
    const widthSpace = vegaSpec.padding ?
      vegaSpec.padding.left + vegaSpec.padding.right : (arguments[0] ? 45 : 0 );
    const heightSpace = vegaSpec.padding ?
      vegaSpec.padding.top + vegaSpec.padding.bottom : (arguments[0] ? 45 : 0 );

    const containerSize = this.$chart[0].getBoundingClientRect();

    return {
      width: containerSize.width - widthSpace,
      height: containerSize.height - heightSpace
    };
  },

  getVegaSpec: function() {
    var size = this.getSize(true);
    this.vegaSpec.width = size.width;
    this.vegaSpec.height = size.height;
    return this.vegaSpec;
  },

  renderChart: function(el, widgetID) {
    el[0].innerHTML = '<iframe src="https://prepdata.org/embed/widget/' + widgetID + '" frameborder="0" width="350" height="280"></iframe>';
  },

  initChart: function() {
    // var runtime = vega.parse(this.getVegaSpec());

    // new vega.View(runtime) // eslint-disable-line no-new
    //   .logLevel(vega.Warn)
    //   .initialize(this.$chart[0])
    //   .renderer('svg')
    //   .run();
    // var vegaSpec = this.getVegaSpec();
    // vg.parse.spec(vegaSpec, chart => chart({ el: this.$chart[0] }).update());
    // vg.parse.spec(vegaSpec, chart => chart({ el: this.$chart[1] }).update());
  }

});
