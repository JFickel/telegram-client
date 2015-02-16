import DS from 'ember-data';
var attr = DS.attr;

var User = DS.Model.extend({
  name: attr('string'),
  email: attr('string'),
  avatar: attr('string'),
  followedByCurrentUser: attr('boolean')
});

export default User;
