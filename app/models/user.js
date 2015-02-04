import DS from 'ember-data';
var attr = DS.attr;

var User = DS.Model.extend({
  firstName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  avatar: attr('string'),
  password: attr('password'),
  passwordConfirmation: attr('password'),
  fullName: function() {
    return this.get('firstName') + " " + this.get('lastName');
  }.property('firstName', 'lastName')
});

// User.reopenClass({
//   FIXTURES: [
//     { id: 1, firstName: 'Jon', lastName: 'Snow', email: 'jonsnow@gmail.com' },
//     { id: 2, firstName: 'Tyrion', lastName: 'Lannister', email: 'tyrionlannister@gmail.com' },
//     { id: 3, firstName: 'Petyr', lastName: 'Baelish', email: 'petyrbaelish@gmail.com' },
//     { id: 4, firstName: 'Ned', lastName: 'Stark', email: 'nedstark@gmail.com' },
//   ]
// });

export default User;
