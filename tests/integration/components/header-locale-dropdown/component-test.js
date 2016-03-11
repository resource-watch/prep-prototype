import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('header-locale-dropdown', 'Integration | Component | header locale dropdown', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{header-locale-dropdown}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#header-locale-dropdown}}
      template block text
    {{/header-locale-dropdown}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
