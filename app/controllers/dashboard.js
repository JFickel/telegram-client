import Ember from 'ember';

export default Ember.ArrayController.extend({
  message: null,
  sortProperties: ['createdAt'],
  sortAscending: false,
  init: function() {
    this._super();
    this.set('skipLimit', this.store.metadataFor('post').skipLimit);
  },

  hasMore: function() {
    return this.get('skipLimit') > this.get('model.length');
  }.property('model'),

  fetchMoreItems: function() {
    return this.store.find('post', {
      dashboard: true,
      limit: 2,
      skip: this.get('model.length')
    })
  },


  actions: {
    whatever: function() {
      debugger;
    },

    fetchMore: function(callback) {
      var promise = this.fetchMoreItems();
      callback(promise);
    },

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

      // I think it's better to set the repost attr to the original post
      // instead of a user and have all reposts refer to the original
      // you'd need to have a repostedAt attr, but there'd be a conflict
      // between sorting createdAt and repostedAt — how is that handled?
      // you'd want to sort by createdAt if it's not a repost and
      // repostedAt if it's a repost

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
