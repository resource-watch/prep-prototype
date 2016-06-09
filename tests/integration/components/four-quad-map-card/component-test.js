import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('four-quad-map-card', 'Integration | Component | four quad map card', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{four-quad-map-card}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#four-quad-map-card}}
      template block text
    {{/four-quad-map-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
