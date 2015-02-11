import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Component.extend(EmberValidations.Mixin, {
  displayErrors: false,

  actions: {
    signup: function() {
      var signUpData;

      if (this.get('isValid')) {
        signUpData = {
          name: this.get('name'),
          email: this.get('email'),
          meta: {
            password: this.get('password'),
            operation: 'signup'
          }
        };
        this.sendAction('action', signUpData)
      } else {
        this.set('displayErrors', true);
      }
    }
  },

  validations: {
    name: {
      presence: true,
      length: { minimum: 2, messages: { tooShort: 'name must be at least 2 characters' }}
    },
    password: {
      presence: true,
      length: { minimum: 8, messages: { tooShort: 'password must be at least 8 characters' }}
    },
    email: {
      email: true
    }
  }
});
