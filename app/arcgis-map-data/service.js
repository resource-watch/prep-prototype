import Ember from 'ember';
import arcgisUtils from 'esri/arcgis/utils';
import Legend from 'esri/dijit/Legend';
import Search from 'esri/dijit/Search';

export default Ember.Service.extend({
  legendCounter: 0,
  titleCounter: 0,

  widgets: [],

  createMap(webMap, elem, options) {
    if (!options) {
      options = {
        mapOptions: {}
      };
    }
    options.mapOptions.smartNavigation = false;
    return arcgisUtils.createMap(webMap, elem, options);
  },

  destroyMap(map, handlers) {
    if (Ember.isArray(handlers)) {
      handlers.forEach((handler) => {
        if (handler.remove) {
          handler.remove();
        }
      });
      handlers.length = 0;
      handlers = null;
    }

    if (map && map.destroy) {
      map.destroy();
      map = null;
    }
    return map;
  },

  createLegend(map_el, map, layerInfos) {
    const cnt = this.get('legendCounter');
    const legend_id = 'legend_' + cnt;
    const legend_el = '<div id="'+ legend_id +'" class="arcgis-map-legend"></div>';
    const node = Ember.$(map_el).append(legend_el);
    var legend = new Legend({
      map: map,
      layerInfos: layerInfos
    }, legend_id);
    legend.startup();

    this.set('legendCounter', this.get('legendCounter') + 1);
  },

  createMapTitle(map_el, title) {
    const cnt = this.get('titleCounter');
    const title_id = 'title_' + cnt;
    const title_el = 
    `<div id="${title_id}" class="arcgis-map-title">
      <p>${title}</p>
    </div>`;
    const node = Ember.$(map_el).append(title_el);

    this.set('titleCounter', this.get('titleCounter') + 1);
  },

  createSearchWidget(map) {
    const search = new Search({
      map: map
    }, 'search');

    search.startup();
    this.get('widgets').push( search );
  },

  destroyWidgets() {
    this.get('widgets').forEach(function (w) {
      w.destroy();
    });
    this.set('widgets', []);
  }

});