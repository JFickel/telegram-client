module.exports = function(app) {
  var express = require('express');
  var postsRouter = express.Router();

  var posts =  [
    { id: 1, body: 'This is a really funny tweet.', createdAt: 'Tue Feb 03 2015 09:14:15 GMT-0600 (CST)', user: 1 },
    { id: 2, body: 'LOL! RT @whatever OH: smh omg #hashtag', createdAt: 'Tue Feb 03 2015 09:14:15 GMT-0600 (CST)', user: 2 },
    { id: 3, body: '<sarcastic comment>', createdAt: 'Tue Feb 03 2015 09:14:15 GMT-0600 (CST)', user: 3 },
    { id: 4, body: 'Check out this link: http://google.com', createdAt: 'Tue Feb 03 2015 09:14:15 GMT-0600 (CST)', user: 4 },
    { id: 5, body: 'This is a demo post for the newly created user.', createdAt: 'Tue Feb 03 2015 09:14:15 GMT-0600 (CST)', user: 420}
  ]

  postsRouter.get('/', function(req, res) {
    if (req.query.dashboard) {
      // grab posts of users followed by the current user and current user's posts
    }

    if (req.query.profile) {
      posts = posts.filter(function(post) {
        return post.user === 420;
      });
    }

    res.send({posts: posts});
  });

  postsRouter.post('/', function(req, res) {
    var post = req.body.post;
    post.id = posts[posts.length - 1] + 1;
    posts.push(req.body.post);
    res.status(201).end();
  });

  postsRouter.get('/:id', function(req, res) {
    res.send({
      'posts': {
        id: req.params.id
      }
    });
  });

  postsRouter.put('/:id', function(req, res) {
    res.send({
      'posts': {
        id: req.params.id
      }
    });
  });

  postsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/posts', postsRouter);
};
