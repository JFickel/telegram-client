import Ember from 'ember';

export default Ember.Component.extend({
  repostable: function() {
    return this.get('session.user.id') != this.get('post.user.id')
  }.property(),

  actions: {
    deletePost: function () {
      this.sendAction('deletePost', this.get('post'));
    },
    repost: function() {
      this.sendAction('repost', this.get('post'));
    }
  }
});
