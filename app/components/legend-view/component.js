import Ember from 'ember';

export default Ember.Component.extend({
  
  layersDidChange: Ember.observer('session.legendLayers', function () {
    const layers = this.get('session').get('legendLayers');
    this.set('layers', layers);
    this._buildLegend(layers);
  }),

  _buildLegend(layers) {
    console.log(layers);
  }

});
