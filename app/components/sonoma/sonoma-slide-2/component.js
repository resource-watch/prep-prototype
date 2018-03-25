import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',
  widgetId: 'f2fbd06e-8e2e-4b06-a883-0e4c1146c79c',
  widgetId2: 'ec40fa88-2f75-4681-abd4-0161db504ee6',

  didRender() {
    this.$chart = this.$('.chart2');
    this.$chart2 = this.$('.chart2a');

    this.renderChart(this.$chart, this.widgetId);
    this.renderChart(this.$chart2, this.widgetId2);

    // this.fetchData('https://api.resourcewatch.org/v1/widget/' + this.widgetId)
    //   .done(function(widget) {
    //     this.widget = widget.data.attributes;
    //     this.vegaSpec = this.widget.widgetConfig;

    //     this.fetchData('https://api.resourcewatch.org/v1/' + this.widget.queryUrl)
    //       .done(function(data){
    //         this.vegaSpec.data[0].values = data.data;
    //         this.initChart(this.vegaSpec, this.$chart);
    //       }.bind(this));
    // }.bind(this));

    // this.fetchData('https://api.resourcewatch.org/v1/widget/' + this.widgetId2)
    //   .done(function(widget) {
    //     this.widget2 = widget.data.attributes;
    //     this.vegaSpec2 = this.widget2.widgetConfig;

    //     this.fetchData('https://api.resourcewatch.org/v1/' + this.widget2.queryUrl)
    //       .done(function(data){
    //         this.vegaSpec2.data[0].values = data.data;
    //         this.initChart(this.vegaSpec2, this.$chart2);
    //       }.bind(this));
    // }.bind(this));
  },

  fetchData: function(url) {
    return $.get(url);
  },

  update: function() {
    if (this.$chart && this.$chart2) {
      this.$chart.destroy();
      this.$chart2.destroy();
      this.$chart = null;
      this.$chart2 = null;
      // this.initChart(this.vegaSpec, this.$chart);
      // this.initChart(this.vegaSpec2, this.$chart2);

      this.renderChart(this.$chart, this.widgetId);
      this.renderChart(this.$chart2, this.widgetId2);
    }
  },

  getSize: function(vegaSpec) {
    const widthSpace = vegaSpec.padding ?
      vegaSpec.padding.left + vegaSpec.padding.right : (arguments[1] ? 70 : 0 );
    const heightSpace = vegaSpec.padding ?
      vegaSpec.padding.top + vegaSpec.padding.bottom : (arguments[1] ? 70 : 0 );

    const containerSize = this.$chart[0] && this.$chart[0].getBoundingClientRect();

    return {
      width: containerSize.width - widthSpace,
      height: containerSize.height - heightSpace
    };
  },

  getVegaSpec: function(vegaSpec) {
    var size = this.getSize(vegaSpec, true);
    vegaSpec.width = size.width;
    vegaSpec.height = size.height;
    return vegaSpec;
  },

  initChart: function(vegaSpec, chartSelected) {
    var vegaSpecCompleted = this.getVegaSpec(vegaSpec);
    vg.parse.spec(vegaSpecCompleted, chart => chart({ el: chartSelected[0] }).update());
    vg.parse.spec(vegaSpecCompleted, chart => chart({ el: chartSelected[1] }).update());
  },

  renderChart: function(el, widgetID) {
    el[0].innerHTML = '<iframe src="https://prepdata.org/embed/widget/' + widgetID + '" frameborder="0" width="350" height="280"></iframe>';
  }

});
