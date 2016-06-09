import Ember from 'ember';
import ajax from 'ic-ajax';

export default Ember.Component.extend({
  classNames: [''],
  
  didInsertElement() {
    const settings = this.get('settings');
    console.log(settings);

    if (!settings) {
      return;
    }

    this.set('settings', settings);

    let chart = null;
    if (settings.chart_type === 'time-trendline') {
      chart = new Cedar({type: 'https://s3.amazonaws.com/project-climate/cedar-types/time-trendline.json'});
    } else if (settings.chart_type === 'time-hist-high-low') {
      // chart = new Cedar({type: 'https://s3.amazonaws.com/project-climate/cedar-types/time-hist-high-low.json'});
      chart = new Cedar({type: 'http://localhost:4200/time-hist-high-low.json'});
    } else {
      chart = new Cedar({type: settings.chart_type });
    }    
    
    if (settings.tooltip) {
      chart.tooltip = settings.tooltip;
    }

    if (settings.dataset.url) {
      chart.dataset = settings.dataset;
      this._showChart(chart);
    } else if (settings.json_url) {
      chart.dataset = {};
      chart.dataset.mappings = settings.dataset.mappings;
      ajax({
        url: settings.json_url,
        dataType:'json'
      })
        .then(function (data) {
          if (data) {
            this._showChart(chart, data);
          }
        }.bind(this))
        .catch(function (error) {
          console.log('error querying for json data for chart', error);
        });
    }
  },

  _showChart(chart, data) {

    if (data) {
      chart.dataset.data = data; 
    }

    const settings = this.get('settings');


    chart.show({
      elementId: `#${this.elementId}`
    });

    if (settings && settings.override) {
      chart.override = settings.override;
    }

    // window.onresize = this.updateChart.bind(this);
    
    this.set('chart', chart);

  },

  updateChart() {
    let el = document.getElementById(this.elementId);
    let width = el.offsetWidth;

    let labels;
    if(width <= 200) {
      labels = {
        "fontSize": {"value": 0},
      }
    } else if (200 < width && width <= 600) {
      labels = {
        "angle": {"value": 50},
        "align": {"value": "left"},
        "baseline": {"value": "middle"}
      }
    } else {
      labels = {
        "angle": {"value": 0},
        "align": {"value": "center"},
        "baseline": {"value": "middle"}
      }
    }

    const chart = this.get('chart');
    chart.override = {
      "axes": [{"properties": {
        "labels": labels
      }}]
    }

    chart.update();
  }
});
