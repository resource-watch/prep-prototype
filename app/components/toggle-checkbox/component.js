import Ember from 'ember';

export default Ember.Component.extend({
  
  classNames: ['layer-item'],

  labelText: '',

  didInsertElement() {
    let id = this.$(this.element).children()[0].id;
    this.$(`#${id}`).bootstrapToggle({
      onstyle: 'success',
      style: 'ios',
      size: 'mini',
      on: '',
      off: '',
      height: 15,
      width: 22
    });

    const opts = this.get('layerOptions');

    this.$(`#${id}`).prop('checked', opts.visible).change();
    this.set('labelText', opts.labelText);

    this.$(`#${id}`).change(function () {
      const checked = $(this).prop('checked');
      opts.layerObject.setVisibility(checked);
    });
  }
});
