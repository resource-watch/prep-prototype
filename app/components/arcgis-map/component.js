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
    
    // const class_name = this.get('class');
    // if (class_name) {
    //   this.classNames.push(class_name);
    // }

    // parse properties
    const webmap = this.get('webmap');
    const logo = this.get('logo');
    const slider = this.get('slider');
    const showAttribution = this.get('showAttribution');
    const disableNavigation = this.get('disableNavigation') || false;

    const options = {
      mapOptions: { 
        logo: logo,
        slider: slider,
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

      if (disableNavigation) {
        // this.map.disablePan();
        this.map.disableMapNavigation();
      }

      setTimeout(function(){
        this.map.resize();
        this.map.reposition();
      }.bind(this), 5000);
    });
  },

  willDestroyElement() {
    const svc = this.get('arcgisMap');
    svc.destroyMap(this.map, this.handlers);
    this.itemInfo = null;
  }
});