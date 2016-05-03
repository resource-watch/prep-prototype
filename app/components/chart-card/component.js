import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [''],
  
  didInsertElement() {
    const settings = this.get('settings');
    console.log(settings);

    if (!settings) {
      return;
    }

    let chart = new Cedar({type: settings.chart_type });

    if (settings.tooltip) {
      chart.tooltip = settings.tooltip;
    }

    chart.dataset = settings.dataset;
    chart.show({
      elementId: `#${this.elementId}`
    });

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
