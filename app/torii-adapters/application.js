import Ember from 'ember';
import config from '../config/environment';

export default Ember.Object.extend({
  open: function(authorization) {
    console.log('in open');
    // debugger;
    // var authorizationCode = authorization.authorizationCode;
    // return new Ember.RSVP.Promise(function(resolve, reject) {
    //   Ember.$.ajax({
    //     url: config
    //   })
    // })
  }
})
