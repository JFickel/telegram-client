import Ember from 'ember';

export default Ember.Object.extend({
  token: function(key, value) {
    if (arguments.length > 1) {
      localStorage.token = value;
      return value;
    }
    return localStorage.token;
  }.property()
});
