import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    error: function(error) {
      if (error && error.status === 404) {
        return this.transitionTo('modelNotFound');
      }
    },
    follow: function(user, followingModel) {
      followingModel.addObject(user);
      user.set('followedByCurrentUser', true);
      user.save();
    },
    unfollow: function(user, followingModel) {
      followingModel.removeObject(user);
      user.set('followedByCurrentUser', false);
      user.save();
    }
  }
});
