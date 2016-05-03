import Ember from 'ember';
import arcgisUtils from 'esri/arcgis/utils';

export default Ember.Component.extend({
  classNames: ['map-card'],

  map: null,

  didInsertElement() {
    const settings = this.get('settings');
    console.log(settings);

    if (!settings) {
      return;
    }

    const options = {
      mapOptions: {
        smartNavigation: false
      }
    };
    
    arcgisUtils.createMap(settings.webmap, this.element, options)
      .then(function (response) {
        console.log(response);
        if (response.map) {
          this.set('map', response.map);
          response.map.disableScrollWheelZoom();
        }
      }.bind(this), function (error) {
        console.log(error);
      });
  }
});
