import Ember from 'ember';
import Authenticated from 'telegram-client/mixins/authenticated';

export default Ember.Route.extend(Authenticated, {
  queryParams: {
    searchQuery: {
      refreshModel: true
    }
  },

  model: function(params) {
    console.log(params);
    return this.store.find('post', params);
  },

  deactivate: function() {
    this.controllerFor('application').set('searchQuery', '');
    this.controllerFor('search').set('searchQuery', '');
  }

});
