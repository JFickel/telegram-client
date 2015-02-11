import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    deletePost: function () {
      this.sendAction('deletePost', this.get('post'));  
    }
  }
});
