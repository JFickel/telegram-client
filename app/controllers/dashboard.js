import Ember from 'ember';

export default Ember.ArrayController.extend({
  message: null,
  sortProperties: ['createdAt'],
  sortAscending: false,

  actions: {
    publish: function() {
      var post = this.store.createRecord('post', {
        body: this.get('message'),
        createdAt: new Date(),
        user: this.get('session.user')
      });
      post.save().then((post) => {
        this.set('message', null);
        this.get('model').addObject(post);
      });
    },

    deletePost: function(post) {
      post.destroyRecord().then(() => {
        this.get('model').removeObject(post);
      });
    },

    repost: function(originalPost) {
      var post = this.store.createRecord('post', originalPost.toJSON());
      post.setProperties({
        user: this.get('session.user.id'),
        repost: originalPost.get('user')
      });
      post.save().then((post) => {
        this.get('model').addObject(post);
      });
    }
  }
});
