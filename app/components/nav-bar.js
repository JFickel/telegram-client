import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    logout: function() {
      this.sendAction('logout');
    },

    search: function() {
      this.sendAction('search', this.get('searchQuery'));
    }
  }
});
