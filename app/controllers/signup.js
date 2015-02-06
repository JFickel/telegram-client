import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Controller.extend(EmberValidations.Mixin, {
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

      user.save().then(user => {
        user.set('password', '');
        // should the token be an attribute on user
        // or is there a way of getting it from the json?
        // this.set('session.token', ???)
        console.log(user);
        this.transitionToRoute('dashboard');
      }, response => {
        console.log(response);
      });
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
