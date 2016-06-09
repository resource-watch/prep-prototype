import Ember from 'ember';

export function or(params/*, hash*/) {
  return params[0] || params[1];
}

export default Ember.Helper.helper(or);
