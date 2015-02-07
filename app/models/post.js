import DS from 'ember-data';
var attr = DS.attr;

var Post = DS.Model.extend({
  body: attr('string'),
  user: DS.belongsTo('user', { async: true }),
  createdAt: attr('date'),
  repost: DS.belongsTo('post', { async: true })
});

export default Post;
