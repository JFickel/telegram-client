import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    signup: function() {
      var user = this.store.createRecord('user', {
        name: this.get('name'),
        email: this.get('email'),
        password: this.get('password'),
        operation: 'login',
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
  }
});
