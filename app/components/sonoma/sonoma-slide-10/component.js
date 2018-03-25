import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',
  widgetId: 'ec40fa88-2f75-4681-abd4-0161db504ee6',

  didRender() {
    this.cache();
    this.$chart = this.$('#chart10-1');

    // this.fetchData('https://api.resourcewatch.org/v1/widget/' + this.widgetId)
    //   .done(function(widget) {
    //     this.widget = widget.data.attributes;
    //     this.vegaSpec = this.widget.widgetConfig;

    //     this.fetchData('https://api.resourcewatch.org/v1/' + this.widget.queryUrl)
    //       .done(function(data){
    //         this.vegaSpec.data[0].values = data.data;
    //         this.initChart();
    //       }.bind(this));
    // }.bind(this));

    this.renderChart(this.$chart, this.widgetId);

    this.setListeners();
    this.renderImages();
  },

  cache: function() {
    this.img1 = $('.img10-1');
  },

  renderImages: function() {
    this.img1.attr('style', 'background-image: url(../img/sonoma/sonoma-10/wildRiver.jpeg)');
  },

  fetchData: function(url) {
    return $.get(url);
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

  // initChart: function(el, widgetId) {
  //   var vegaSpec = this.getVegaSpec();
  //   vg.parse.spec(vegaSpec, chart => chart({ el: this.$chart[0] }).update());
  // }

  renderChart: function(el, widgetId) {
    el[0].innerHTML = '<iframe src="https://prepdata.org/embed/widget/' + widgetId + '" frameborder="0" width="350" height="320"></iframe>';
  }


});
