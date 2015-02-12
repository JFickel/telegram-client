import Ember from 'ember';
// import Authenticated from './mixins/authenticated';

export default Ember.Route.extend(Authenticated, {
  model: function() {
    return this.store.find('post', { dashboard: true });
  }
});
