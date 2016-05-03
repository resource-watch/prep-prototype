import Ember from 'ember';

export default Ember.Service.extend({
  items: {
    washington_chart_one : {
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
    },
    washington_chart_two : {
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
      panel_title: 'Precipitation Change',
      panel_subtitle: 'Relative to 1950-1999 Average'
    },
    washington_map_one : {
      type: 'map-card',
      component_settings: {
        webmap: '2423b80d4438445484b1341c93ee8516'
      },
      panel_title: 'Maximum Air Temperature in the Putget Sound Area',
      panel_subtitle: '2005 - 2015'
    },

    washington_chart_three : {
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
