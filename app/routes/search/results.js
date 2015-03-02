import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    searchQuery: {
      refreshModel: true
    }
  },

  model: function(params) {
    this.controllerFor('search').set('searchQuery', params.searchQuery);
    var self = this;
    return new Promise(function(resolve) {
      setTimeout(function() {
        self.store.find('post', params).then(function(results) {
          resolve(results);
        });
      }, 2000)
    })
  },

  deactivate: function() {
    this.controllerFor('application').set('searchQuery', '');
    this.controllerFor('search').set('searchQuery', '');
  }
});
