import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['sonoma-slide'],
  tagName: 'section',
  attributeBindings:["data-title","data-background-image","data-background-size"],
  "data-title": 'Start',
  "data-background-image": "img/sonoma/dashboard-sonoma-header.png",
  "data-background-size": "cover"
});
