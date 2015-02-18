import Ember from 'ember';

export default Ember.ArrayController.extend({
  message: null,
  sortProperties: ['createdAt'],
  sortAscending: true,

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
      // just experimenting with cloning the data from an object
      var post,
          originalData = originalPost.toJSON();

      delete originalData.user;
      post = this.store.createRecord('post', originalData);

      // if this is a repost of a repost, the repost will be set
      // to the reposter and not the original poster

      // it's probably better to set the repost attr to the original post
      // instead of a user and have all reposts refer to the original
      post.setProperties({
        createdAt: originalPost.get('createdAt'),
        user: this.get('session.user'),
        repost: originalPost.get('user')
      });

      post.save().then((post) => {
        this.get('model').addObject(post);
      });
    }
  }
});
