import Ember from 'ember';

export default Ember.Component.extend({

  tagName: 'section',
  widgetId: '1e55087a-f450-4fd7-b571-d84b967584a5',
  
  didRender() {
    this.cache();
    this.$chart = this.$('#chart10-1');

    this.fetchData('http://api.resourcewatch.org/widgets/' + this.widgetId)
      .done(function(widget) {
        this.widget = widget.data.attributes;
        this.vegaSpec = this.widget.widgetConfig;

        this.fetchData('http://api.resourcewatch.org/' + this.widget.queryUrl)
          .done(function(data){
            this.vegaSpec.data[0].values = data.rows;
            this.initChart();
          }.bind(this));
    }.bind(this));

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
