import Ember from 'ember';

export default Ember.Service.extend({

  dashboards: [
    {
      name: 'chicago',
      indicator_sections: [      
        {
          title: 'Weather Evolution',
          indicators:[
            {
              x: 0,
              y: 0,
              height: 8,
              width: 7,
              component: {
                name: 'area-line-card',
                settings: {}
              }
            },
            {
              x: 7,
              y: 0,
              height: 4,
              width: 5,
              component: {
                name: 'placeholder-card'
              }
            },
            {
              x: 7,
              y: 4,
              height: 4,
              width: 5,
              component: {
                name: 'placeholder-card'
              }
            }
          ]
        },
        {
          title: 'Impact on the environment',
          indicators:[
            {
              x: 0,
              y: 0,
              height: 4,
              width: 9,
              component: {
                name: 'four-quad-map-card'
              }
            },
            {
              x: 9,
              y: 0,
              height: 4,
              width: 3,
              component: {
                name: 'placeholder-card'
              }
            }
          ]
        }
      ]
    }
  ],

  getFakeDashboard(dashId) {
    return this.dashboards.filter(function (d) {
      return d.name === dashId;
    })[0];
  }
});
