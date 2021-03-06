import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('breadcrumb-nav', 'Integration | Component | breadcrumb nav', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{breadcrumb-nav}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#breadcrumb-nav}}
      template block text
    {{/breadcrumb-nav}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
