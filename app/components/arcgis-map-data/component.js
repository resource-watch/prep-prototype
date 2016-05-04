import Ember from 'ember';

export default Ember.Component.extend({

  classNames: ['data-map-container '],

  arcgisMapData: Ember.inject.service(),
  legendControl: Ember.inject.service(),

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
    
    const options = {
      mapOptions: { 
        logo: logo,
        sliderPosition: 'top-right',
        showAttribution: showAttribution
      }
    };
    
    // init map
    const svc = this.get('arcgisMapData');
    if (!webmap) {
      return;
    }
    svc.createMap(webmap, this.element, options).then((response) => {
      this.map = response.map;
      this.itemInfo = response.itemInfo;
      if (response.clickEventHandle) {
        this.handlers.push(response.clickEventHandle);
      }

      svc.createSearchWidget(this.map);

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
      this.get('session').set('legendLayers', response.itemInfo.itemData.operationalLayers);

    });
  },

  willDestroyElement() {
    
    this.get('session').set('layerListing', []);
    this.get('session').set('legendLayers', []);

    const svc = this.get('arcgisMapData');
    svc.destroyMap(this.map, this.handlers);
    this.itemInfo = null;

    svc.destroyWidgets();
  }
});