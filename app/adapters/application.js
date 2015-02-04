import DS from 'ember-data';

export default DS.FixtureAdapter;
export default DS.RESTAdapter.extend({
  namespace: 'api'
});
