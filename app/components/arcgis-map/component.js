import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['arcgis-map-component'],

  arcgisMap: Ember.inject.service(),

  init() {
    this._super(...arguments);

    // array to store map event handlers
    this.handlers = [];
  },

  didInsertElement() {
    // parse properties
    const webmap = this.get('webmap');
    const options = {mapOptions: { logo: false}};
    
    // init map
    const svc = this.get('arcgisMap');
    if (!webmap) {
      return;
    }
    svc.createMap(webmap, this.element, options).then((response) => {
      this.map = response.map;
      this.itemInfo = response.itemInfo;
      if (response.clickEventHandle) {
        this.handlers.push(response.clickEventHandle);
      }

      setTimeout(function(){
        this.map.resize();
      }.bind(this), 5000);
    });
  },

  willDestroyElement() {
    const svc = this.get('arcgisMap');
    svc.destroyMap(this.map, this.handlers);
    this.itemInfo = null;
  }
});