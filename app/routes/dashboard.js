import Ember from 'ember';
import Authenticated from 'telegram-client/mixins/authenticated';

export default Ember.Route.extend(Authenticated, {
  init: function() {
    // shouldn't this work?
    // var self = this;
    // this.get('websocketService.registerMessageHandler')('newPost', function(data) {
    //   var post = self.store.push('post', data.post);
    //   self.controllerFor('dashboard').get('model').addObject(post);
    // });

    var self = this;
    this.get('websocketService.messageHandlers')['newPost'] = function(data) {
      var post = self.store.push('post', data.post);
      self.controllerFor('dashboard').get('model').addObject(post);
    }
  },
  model: function() {
    return this.store.find('post', { dashboard: true });
  }
});
