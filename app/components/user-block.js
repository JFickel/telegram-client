import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    follow: function() {
      this.sendAction('follow', this.get('user'), this.get('followingModel'));
    },
    unfollow: function() {
      this.sendAction('unfollow', this.get('user'), this.get('followingModel'));
    }
  }
});
