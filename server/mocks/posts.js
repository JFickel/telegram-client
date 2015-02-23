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
    console.log(req.query.searchQuery);
    if (req.query.dashboard) {
      payload = posts;
    } else if (req.query.hasOwnProperty("searchQuery")) {
      payload = posts.filter(function(post) {
        // console.log(req.query.searchQuery.toLowerCase());
        // console.log(post.body.toLowerCase());
        // console.log(post.body.toLowerCase().indexOf(req.query.searchQuery.toLowerCase()));

        if (post.body.toLowerCase().indexOf(req.query.searchQuery.toLowerCase()) !== -1) {
          return true
        }
      });

    } else if (req.query.profile) {
      payload = posts.filter(function(post) {
        return post.user === parseInt(req.query.userId);
      });
    }

    console.log(payload);
    res.send({posts: payload});
  });

  postsRouter.post('/', function(req, res) {
    var post = req.body.post,
        idCounter = 5;

    post.id = ++idCounter;
    posts.push(req.body.post);
    res.status(201).send({ 'post': post });
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
    posts = posts.filter(function(post) {
      return post.id != req.params.id
    });
    res.status(204).end();
  });

  app.use('/api/posts', postsRouter);
};
