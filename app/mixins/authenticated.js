import Ember from 'ember';

export default Ember.Mixin.create({
  beforeModel: function(transition) {
    if (!this.get('session.isAuthenticated')) {
      this.set('session.attemptedTransition', transition);
      this.transitionTo('welcome');
    }
  }
});
