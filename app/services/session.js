import Ember from 'ember';

export default Ember.Object.extend({
  user: null,

  isAuthenticated: function() {
    return this.get('user') != null;
  }.property('user')
});
