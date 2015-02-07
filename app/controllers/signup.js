import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
  displayErrors: false,

  actions: {
    signup: function() {
      var user = this.store.createRecord('user', {
        name: this.get('name'),
        email: this.get('email'),
        meta: {
          password: this.get('password'),
          operation: 'signup'
        }
      });

      if (this.get('isValid')) {
        user.save().then(user => {
          this.set('sessionService.user', user);
          localStorage.user = JSON.stringify(user.toJSON({ includeId: true }));
          this.transitionToRoute('dashboard');
        }, response => {
          console.log(response);
        });
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
