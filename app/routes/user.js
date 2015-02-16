import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error: function(error) {
      if (error && error.status === 404) {
        return this.transitionTo('modelNotFound');
      }
    },
    follow: function(user) {
      debugger;
      user.set('followedByCurrentUser', true);
      user.save();
    },
    unfollow: function(user) {
      debugger;
      user.set('followedByCurrentUser', false);
      user.save();
    }
  }
});
