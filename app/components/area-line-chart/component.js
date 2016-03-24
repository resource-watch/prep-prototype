import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement() {
    const src = 'http://localhost:4300/area-line.json';
    let chart = new Cedar({specification: src});
    const sample_data =  {"features":[ { attributes: { "Date" : 1970, "Value" : 500, "Value2" : 550 } },{ attributes: { "Date" : 1980, "Value" : 550, "Value2" : 475 } },{ attributes: { "Date" : 1990, "Value" : 600, "Value2" : 370 } },{ attributes: { "Date" : 2000, "Value" : 650, "Value2" : 410 } },{ attributes: { "Date" : 2010, "Value" : 700, "Value2" : 645 } },{ attributes: { "Date" : 2020, "Value" : 800, "Value2" : 780 } } ]};
    let dataset = {
      data: sample_data,
      mappings: {
        "x": {"field":"Date", "label": ""},
        "y": {"field":"Value", "label": ""},
        "y2": {"field":"Value2", "label": ""}
      }
    };
    chart.dataset = dataset;
    chart.show({
      elementId: '#' + this.elementId
    });
  }
});
