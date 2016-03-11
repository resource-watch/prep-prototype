import Ember from 'ember';

export default Ember.Service.extend({

  cardHash: {
    chicago: {
      title: 'Chicago',
      indicators:[
        {
          x: 0,
          y: 0,
          height: 8,
          width: 7,
          component: {
            name: 'placeholder-card'
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
    newyork: {
      title: 'New York',
      indicators:[
        {
          x: 0,
          y: 0,
          height: 8,
          width: 7,
          component: {
            name: 'placeholder-card'
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
    }
  },

  getFakeCards(hashId) {
    return this.cardHash[hashId] || {
      title: 'Not Found',
      indicators:[]
    };
  }
});
