import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    logout: function() {
      this.store.find('user', { authenticated: true }).then((users) => {
        var user = (users || []).get('firstObject');
        this.set('session.user', null);
        user.destroyRecord().then(() => this.transitionToRoute('welcome'));
      });
    }
  }
});
