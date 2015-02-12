import Ember from 'ember';
import AuthenticatedMixin from 'telegram-client/mixins/authenticated';

module('AuthenticatedMixin');

// Replace this with your real tests.
test('it works', function() {
  var AuthenticatedObject = Ember.Object.extend(AuthenticatedMixin);
  var subject = AuthenticatedObject.create();
  ok(subject);
});
