import Base from 'ember-validations/validators/base';

export default Base.extend({
  call: function() {
    var validEmailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmailRegExp.test(this.model.get(this.property))) {
      this.errors.pushObject('invalid email');
    }
  }
});
