import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    login: function(loginData) {
      var self = this;
      // debugger;
      loginData.login = true;
      this.store.find('user', loginData).then(function(users) {

        var user = (users || []).get('firstObject');
        console.log(user)
        self.set('session.user', user);
        console.log(self.get('session.user'))
        self.transitionToRoute('dashboard');
      });
    },

    signup: function(signUpData) {
      var user = this.store.createRecord('user', signUpData);

      user.save().then(user => {
        // localStorage.user = JSON.stringify(user.toJSON({ includeId: true }));
        this.set('session.user', user);
        if (this.get('session.attemptedTransition')) {
          this.get('session.attemptedTransition').retry();
        } else {
          this.transitionToRoute('dashboard');
        }
      }, response => {
        console.log(response);
      });
    }
  },

});
