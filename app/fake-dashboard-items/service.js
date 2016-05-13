import Ember from 'ember';

export default Ember.Service.extend({
  items: {
    washington_chart_one : {
      type: 'chart-card',
      component_settings: {
        chart_type: 'time-trendline',
        dataset : {
          url: 'http://services3.arcgis.com/7pxWboj3YvCWYdcm/arcgis/rest/services/Observed_Temperature/FeatureServer/0',
          mappings:{
            time: {'field':'year', 'label': 'Year'},
            value: {'field':'annual', 'label': 'Annual Air Temperature'},
            trendline: {'field': 'trendline', label: ''},
            sort: 'year'
          }
        },
        override: {
          axes: [
            {
              "type" : "x",
              "scale" : "x",
              "values" : [1900,1920,1940,1960,1980,2000,2015]
            },
            {
              "type" : "y",
              "scale" : "y",
              "grid" : true,
              "format": "0d",
              "values" : [47,48,49,50,51,52,53]
            }
          ],
          scales: [
            {
              "name": "x",
              "type": "ordinal",
              "range": "width",
              "nice": "year",
              "zero": false
            },
            {
              "name" : "y",
              "zero" : false,
              "nice" : true
            }
          ],
          marks: [
            {
              "properties": {
                "enter" : {
                  "stroke": {"value": "#e05757"},
                  "strokeWidth": {"value": 3}
                }
              }
            },
            {
              "properties": {
                "enter" : {
                  "stroke": {"value": "#000000"},
                  "strokeWidth": {"value": 3}
                }
              }
            }
          ]
        }
      },
      panel_title: 'Temperature Change',
      panel_subtitle: '1895-2015'
    },
    washington_chart_two : {
      type: 'chart-card',
      component_settings: {
        chart_type: 'time-trendline',
        dataset : {
          url:'http://services3.arcgis.com/7pxWboj3YvCWYdcm/arcgis/rest/services/Observed_Precipitation/FeatureServer/0',
          mappings:{
            time: {'field':'year', 'label': 'Year'},
            value: {'field':'annual', 'label': 'Total Precipitation'},
            trendline: {'field': 'trendline', label: ''},
            sort:'year'
          }
        },
        override: {
          axes: [
            {
              "type" : "x",
              "scale" : "x",
              "values" : [1900,1920,1940,1960,1980,2000,2015]
            },
            {
              "type" : "y",
              "scale" : "y",
              "grid" : true,
              "format": "0d",
              "values" : [20,30,40,50,60]
            }
          ],
          scales: [
            {
              "name": "x",
              "type": "ordinal",
              "range": "width",
              "nice": "year",
              "zero": false
            },
            {
              "name" : "y",
              "zero" : false,
              "nice" : true,
              "domainMin" : 20
            }
          ],
          marks: [
            {
              "properties": {
                "enter" : {
                  "stroke": {"value": "#008ec4"},
                  "strokeWidth": {"value": 3}
                }
              }
            },
            {
              "properties": {
                "enter" : {
                  "stroke": {"value": "#000000"},
                  "strokeWidth": {"value": 3}
                }
              }
            }
          ]
        }
      },
      panel_title: 'Precipitation Change',
      panel_subtitle: '1895-2015'
    },
    washington_map_one : {
      type: 'map-card',
      component_settings: {
        webmap: '1c9c6da70d744e7e9631cde431bbd8ce'
      },
      panel_title: 'Temperature in the Puget Sound Lowlands',
      panel_subtitle: 'Map'
    },

    washington_chart_three : {
      type: 'chart-card',
      component_settings: {
        chart_type: 'time-hist-high-low',
        dataset : {
          url:'http://services3.arcgis.com/7pxWboj3YvCWYdcm/arcgis/rest/services/Temperature_Difference/FeatureServer/0',
          mappings:{
            time: {'field':'year', 'label': 'year'},
            historical: {'field':'AVG_HIST', 'label': 'Historical'},
            low: {'field':'AVG_RCP45', 'label': 'Low'},
            high: {'field':'AVG_RCP85', 'label': 'High'},
            sort:'year'
          }
        },
        override: {
          axes: [
            {
              "type" : "x",
              "scale" : "x",
              "values" : [1950,1975,2000,2025,2050,2075,2099]
            },
            {
              "type" : "y",
              "scale" : "y",
              "grid" : true,
              "format": "0d",
              "values" : [30,32,34,36,38,40,42]
            }
          ],
          scales: [
            {
              "name": "x",
              "type": "ordinal",
              "range": "width",
              "nice": "year",
              "zero": false
            },
            {
              "name" : "y",
              "zero" : false,
              "nice" : true,
              "domainMin" : 30
            }
          ]
        }
      },
      panel_title: 'Temperature Difference',
      panel_subtitle: 'Relative to 1950-1999 Average'
    },
    washington_chart_four : {
      type: 'chart-card',
      component_settings: {
        chart_type: 'time',
        dataset : {
          url:'http://services.arcgis.com/bkrWlSKcjUDFDtgw/arcgis/rest/services/It\'s_a_Tornado_Map/FeatureServer/0',
          mappings:{
            time: {'field':'Date', 'label': 'Date'},
            value: {'field':'Injuries', 'label': 'Injuries'},
            sort:'Date'
          }
        },
        tooltip : {
          title: '{Year}',
          content: '{Injuries} injuries {Fatalities} fatalities'
        }
      },
      panel_title: 'Temperature Change',
      panel_subtitle: 'Relative to 1950-1999 Average'
    }
  },

  getFakeItem(id) {
    return this.items[id];
  }
});
