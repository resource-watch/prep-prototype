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
    
    const add_title = this.get('addTitle') || false;

    // parse properties
    const webmap = this.get('webmap');
    const logo = this.get('logo');
    const showAttribution = this.get('showAttribution');
    const add_legend = this.get('legend') || false;


    const options = {
      mapOptions: { 
        logo: logo,
        // slider: slider,
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

      if (add_legend) {
        const layerInfos = [
          {
            layer: response.itemInfo.itemData.operationalLayers[0].layerObject,
            title: ' '
          }
        ];
        svc.createLegend(this.element, this.map, layerInfos);
      }

      if (add_title) {
        const title = response.itemInfo.itemData.operationalLayers[0].title;
        svc.createMapTitle(this.element, title);
      }

      // setTimeout(function(){
      //   this.map.resize();
      //   this.map.reposition();
      // }.bind(this), 5000);
    });
  },

  willDestroyElement() {
    const svc = this.get('arcgisMap');
    svc.destroyMap(this.map, this.handlers);
    this.itemInfo = null;
  }
});