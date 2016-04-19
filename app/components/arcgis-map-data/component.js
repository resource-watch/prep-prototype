import Ember from 'ember';

export default Ember.Component.extend({

  // classNames: ['arcgis-map-component'],
  classNames: ['data-map-container '],

  arcgisMap: Ember.inject.service(),

  init() {
    this._super(...arguments);

    // array to store map event handlers
    this.handlers = [];
  },

  didInsertElement() {
    
    const add_title = this.get('addTitle') || false;

    // parse properties
    const webmap = this.get('webmap');
    const logo = this.get('logo');
    const showAttribution = this.get('showAttribution');
    const add_legend = this.get('legend') || false;


    const options = {
      mapOptions: { 
        logo: logo,
        sliderPosition: 'top-right',
        showAttribution: showAttribution
      }
    };
    
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

      this.map.disableScrollWheelZoom();

      let layerListing = [];
      response.itemInfo.itemData.operationalLayers.forEach(function(layer) {
        layerListing.push({
          labelText: layer.title,
          visible: layer.visibility,
          layerObject: layer.layerObject
        })
      });

      this.get('session').set('layerListing', layerListing);

    });
  },

  willDestroyElement() {
    const svc = this.get('arcgisMap');
    svc.destroyMap(this.map, this.handlers);
    this.itemInfo = null;
  }
});