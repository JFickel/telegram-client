import Ember from 'ember';

export default Ember.Controller.extend({
  needs: ['search'],
  searchParam: Ember.computed.alias('controllers.search.searchQuery'),
  searchQuery: '',
  searchQueryBinding: Ember.Binding.oneWay("searchParam"),

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
      this.transitionToRoute('search.results', { queryParams: { searchQuery: searchQuery }});
    }
  }
});
