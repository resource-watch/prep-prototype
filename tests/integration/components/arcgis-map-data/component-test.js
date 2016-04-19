import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('arcgis-map-data', 'Integration | Component | arcgis map data', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{arcgis-map-data}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#arcgis-map-data}}
      template block text
    {{/arcgis-map-data}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
