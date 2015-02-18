import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.find('post', { profile: true, userId: this.modelFor('user').get('id') });
  }
});
