import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    searchQuery: {
      refreshModel: true
    }
  },

  model: function(params) {
    var self = this;
    return new Promise(function(resolve) {
      setTimeout(function() {
        self.store.find('post', params).then(function(results) {
          resolve(results);
        });
      }, 2000)
    })
  }
});
