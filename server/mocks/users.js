module.exports = function(app) {
  var express = require('express'),
      usersRouter = express.Router(),
      user = null,
      payload,
      users = {
        1: { id: 1, name: 'Jon Snow', email: 'jonsnow@gmail.com' },
        2: { id: 2, name: 'Tyrion Lannister', email: 'tyrionlannister@gmail.com', followedByCurrentUser: true },
        3: { id: 3, name: 'Petyr Baelish', email: 'petyrbaelish@gmail.com', followedByCurrentUser: true },
        4: { id: 4, name: 'Ned Stark', email: 'nedstark@gmail.com' }
      };


  usersRouter.get('/', function(req, res) {
    var key, usersArray, following;

    if (req.query.authenticated && user != null) {
      payload = { 'users': [user] };
    } else if (req.query.following) {
      usersArray = [];
      for (key in users) {
        usersArray.push(users[key]);
      }
      following = usersArray.filter(function(user) {
        return user.followedByCurrentUser === true;
      });
      payload = { 'users': following };
    } else if (req.query.followers) {
      usersArray = []
      for (key in users) {
        if (key != 420) {
          usersArray.push(users[key]);
        }
      }

      payload = { 'users': usersArray }
    } else {
      payload = { 'users': [] };
    }
    res.send(payload);
  });

  usersRouter.post('/', function(req, res) {
    if (req.body.user.meta.operation === 'signup') {
      user = { id: 420, name: req.body.user.name, email: req.body.user.email, authenticated: true };
      users[420] = user;
      payload = { user: user };
    }

    res.status(201).send(payload);
  });

  usersRouter.get('/:id', function(req, res) {
    if (users[req.params.id]) {
      res.send({
        'user': users[req.params.id]
      });
    } else {
      res.status(404).send();
    }
  });

  usersRouter.put('/:id', function(req, res) {
    if (req.body.user.meta && req.body.user.meta.operation === 'logout') {
      delete users[req.params.id].authenticated;
    } else {
      delete req.body.user.meta;
      users[req.params.id] = req.body.user;
      users[req.params.id].id = req.params.id;
    }

    res.send({
      'user': users[req.params.id]
    });
  });

  usersRouter.delete('/:id', function(req, res) {
    user = null;
    res.status(204).end();
  });

  app.use('/api/users', usersRouter);
};
