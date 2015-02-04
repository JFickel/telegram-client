import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('signup', { path: '/' });
  this.route('login');
  this.route('dashboard');
  this.route('recover');
  this.resource('user', { path: '/users/:user_id' }, function () {
    this.route('posts', { path: '/' });
    this.route('following');
    this.route('followers');
  });
});

export default Router;
