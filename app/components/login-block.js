import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    login: function() {
      
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
