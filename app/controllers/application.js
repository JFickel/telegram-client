import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    logout: function() {
      console.log('hi');
      // this.store.find('user', { authenticated: true }).then(function(users) {
      //   var user = (users || []).get('firstObject');
      //   this.set('session', null);
      //   user.destroyRecord();
      //   this.transitionToRoute('welcome');
      // });
    }
  }
});
