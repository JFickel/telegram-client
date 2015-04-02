import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations.Mixin,{
  actions: {
    login: function() {
      var loginData;

      if (this.get('isValid')) {
        loginData = {
          email: this.get('email'),
          password: this.get('password')
        };

        this.sendAction('action', loginData);
      } else {
        this.set('displayErrors', true);
      }
    },

    githubLogin: function() {
      this.sendAction('githubLogin');
      // console.log("HI :D");
    }
  },

  validations: {
    password: {
      presence: true,
      length: { minimum: 8, messages: { tooShort: 'password must be at least 8 characters' }}
    },
    email: {
      email: true
    }
  }
});
