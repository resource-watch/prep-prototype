import Ember from 'ember';
import on from 'dojo/on';
import esriRequest from 'esri/request';
import esriId from 'esri/IdentityManager';

export default Ember.Component.extend({
  classNames: ['legend-item'],
  classNameBindings: ['visible::legend-item-hide'],

  title: Ember.computed('layer', function () {
    return this.get('layer').title;
  }),

  visible: Ember.computed('layer', function () {
    return this.get('layer').visibility;
  }),

  legendSwatchInfo: '',

  didInsertElement() {
    const legUtil = 'http://utility.arcgis.com/sharing/tools/legend';
    this.set('legUtil', legUtil);
    esri.config.defaults.io.corsEnabledServers.push(legUtil);

    const layer = this.get('layer');

    if (layer.url) {
      esri.config.defaults.io.corsEnabledServers.push(layer.url);
    }

    const l = layer.layerObject;

    const url = `http://www.arcgis.com/home/webmap/viewer.html?url=${l.url}`;
    this.set('arcgisWebViewerLink', url);
    
    if (!l) {
      return;
    }

    l.on('visibility-change', function() {
      this.set('visible', layer.layerObject.visible);
      if (layer.layerObject.visible && !layer.legendLoaded) {
        esri.config.defaults.io.corsEnabledServers.push(layer.url);
        this.requestLegendInfo();
      }
    }.bind(this));

    if (!layer.visibility) {
      return;
    }

    if (l.loaded) {
      this.requestLegendInfo();
    } else {
      on.once(l, 'update-end', this.requestLegendInfo.bind(this));
    }
  },

  requestLegendInfo() {
    const layer = this.get('layer');

    // set cors enablement
    // esri.config.defaults.io.corsEnabledServers.push(layer.url);

    const url = `${layer.url}/legend`;
    let buildFunc = '';
    if (layer.layerType === 'ArcGISMapServiceLayer' || layer.layerType === 'ArcGISTiledMapServiceLayer') {
      buildFunc = this._buildMapServiceLegend;
    } else if (layer.layerType === 'ArcGISImageServiceLayer') {
      buildFunc = this._buildImageServiceLegend;
    } else {
      // FeatureLayer or KMLLayer should be able to get swatches right away
      if (layer.layerType === 'KML') {
        this._buildKMLLegend(layer);
      } else if (layer.layerType === 'ArcGISFeatureLayer') {
        this._buildFeatureLayerLegend(layer);
      }
      return;
    }

    esriRequest({
      url: url,
      content: {
        f: 'json'
      },
      handleAs: 'json'
    })
      .then(buildFunc.bind(this), this.legendInfoRequestError.bind(this));
  },

  legendInfoRequestError(error) {
    console.log('error requesting legend swatches', error);
  },

  _buildMapServiceLegend(response) {
    console.log(response);
    const layer = this.get('layer');
    const visibleLayerIndex = layer.layerObject.visibleLayers[0];
    const legendInfo = response.layers.filter(function (layer) { return layer.layerId === visibleLayerIndex; })[0].legend;
    let swatchInfo = [];
    let info = null;
    for (let i=0; i < legendInfo.length;i++) {
      if (i === 6) {
        break;
      }
      info = legendInfo[i];
      swatchInfo.push( `<div class='legend-item-swatch'> <img src='data:${info.contentType};base64,${info.imageData}'> </div>` );
    }

    const legendSwatchInfo = new Ember.Handlebars.SafeString(swatchInfo.join(''));
    this.set('legendSwatchInfo', legendSwatchInfo);

    layer.legendLoaded = true;
  },

  _buildImageServiceLegend(response) {
    console.log(response);
    const lengendInfo = response.layers[0].legend;
    let swatchInfo = [];
    let info = null;
    for (let i=0;i < lengendInfo.length;i++) {
      if (i === 6) {
        break;
      }
      info = lengendInfo[i];
      swatchInfo.push( `<div class='legend-item-swatch rotate-270'> <img src='data:${info.contentType};base64,${info.imageData}'> </div>` );
    }

    const legendSwatchInfo = new Ember.Handlebars.SafeString(swatchInfo.join(''));
    this.set('legendSwatchInfo', legendSwatchInfo);

    layer.legendLoaded = true;
  },

  _buildKMLLegend(layer) {
    const fLayer = layer.layerObject._fLayers[0];
    const renderer = fLayer.renderer;
    const infos = renderer.infos;

    let swatchInfo = [];
    let info = null;
    for (let i=0; i < infos.length;i++) {
      if (i === 6) {
        break;
      }
      info = infos[i];
      swatchInfo.push( `<div class='legend-item-swatch swatch-kml' style='background-color:${info.symbol.color.toHex()}'></div>` );
    }

    const legendSwatchInfo = new Ember.Handlebars.SafeString(swatchInfo.join(''));
    this.set('legendSwatchInfo', legendSwatchInfo);

    layer.legendLoaded = true;
  },

  _buildFeatureLayerLegend(layer) {
    const url = layer.url;
    if (url.indexOf('MapServer')) {
      const serviceUrl = url.substr(0, url.indexOf('MapServer')+9);
      const layerIndex = url.substr(url.indexOf('MapServer')+ 10);
      
      esriRequest({
        url: this.get('legUtil'),
        content: {
          f: 'json',
          soapUrl: serviceUrl
        },
        handleAs: 'json'
      })
        .then(
          function (response) {
            if (!response.layers || response.layers.length === 0) {
              console.log('no layer legend info for :: ' + layer.title);
              return;
            }
            const infos = response.layers[layerIndex].legend;
            let swatchInfo = [];
            let info = null;
            for (let i=0; i < infos.length;i++) {
              if (i === 6) {
                break;
              }
              info = infos[i];
              if (info.imageData && info.imageData !== '') {
                swatchInfo.push( `<div class='legend-item-swatch'> <img src='data:${info.contentType};base64,${info.imageData}'> </div>` );
              } else {
                swatchInfo.push( `<div class='legend-item-swatch'> <img class="fs-image" src='${info.url}'></div>` );                
              }
            }

            const legendSwatchInfo = new Ember.Handlebars.SafeString(swatchInfo.join(''));
            this.set('legendSwatchInfo', legendSwatchInfo);

            layer.legendLoaded = true;
          }.bind(this),
          function (error) {
            console.log('error getting legend for feature layer by map server reference', error);
          }
        );
    }
  }

});
