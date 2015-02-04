import DS from 'ember-data';
var attr = DS.attr;

var Post = DS.Model.extend({
  body: attr('string'),
  user: DS.belongsTo('user', { async: true }),
  createdAt: attr('date')
});

// Post.reopenClass({
//   FIXTURES: [
//     { id: 1, body: 'This is a really funny tweet.', createdAt: 'Tue Feb 03 2015 09:14:15 GMT-0600 (CST)', user: 1 },
//     { id: 2, body: 'LOL! RT @whatever OH: smh omg #hashtag', createdAt: 'Tue Feb 03 2015 09:14:15 GMT-0600 (CST)', user: 2 },
//     { id: 3, body: '<sarcastic comment>', createdAt: 'Tue Feb 03 2015 09:14:15 GMT-0600 (CST)', user: 3 },
//     { id: 4, body: 'Check out this link: http://google.com', createdAt: 'Tue Feb 03 2015 09:14:15 GMT-0600 (CST)', user: 4 }
//   ]
// });

export default Post;
