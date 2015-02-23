import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    logout: function() {
      var controller = this;
      var user = this.get('session.user');
      user.set('meta', { operation: 'logout' });
      user.save().then(function() {
        controller.set('session.user', null);
        controller.store.unloadAll('user');
        controller.store.unloadAll('post');
        controller.transitionToRoute('welcome');
      });
    },

    search: function(searchQuery) {
      this.transitionToRoute('search', { queryParams: { searchQuery: searchQuery }});
    }
  }
});
