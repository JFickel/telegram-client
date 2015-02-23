import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('welcome', { path: '/' });
  this.route('dashboard');
  this.route('recover');
  this.route('search');
  this.resource('user', { path: '/users/:user_id' }, function () {
    this.route('posts', { path: '/' });
    this.route('following');
    this.route('followers');
  });
  this.route('modelNotFound', { path: '404'});
});

export default Router;
