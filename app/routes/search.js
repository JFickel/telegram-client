import Ember from 'ember';
import Authenticated from 'telegram-client/mixins/authenticated';

export default Ember.Route.extend(Authenticated, {
  deactivate: function() {
    this.controllerFor('search/results').set('searchQuery', '');
  }
});
