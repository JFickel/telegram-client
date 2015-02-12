import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error: function(error, transition) {
      if (error && error.status === 404) {
        return this.transitionTo('modelNotFound');
      }
    }
  }
});
