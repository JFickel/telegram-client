import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function() {
    },

    signup: function(signUpData) {
      var user = this.store.createRecord('user', signUpData);

      user.save().then(user => {
        this.set('session.user', user);
        localStorage.user = JSON.stringify(user.toJSON({ includeId: true }));
        this.transitionToRoute('dashboard');
      }, response => {
        console.log(response);
      });
    }
  },

});
