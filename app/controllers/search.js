import Ember from 'ember';

export default Ember.ArrayController.extend({
  needs: ['search/results'],
  searchParam: Ember.computed.alias('controllers.search/results.searchQuery'),
  searchQuery: '',
  searchQueryBinding: Ember.Binding.oneWay("searchParam"),
});
