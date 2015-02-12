module.exports = function(app) {
  var express = require('express'),
      usersRouter = express.Router(),
      user = null,
      json;


  usersRouter.get('/', function(req, res) {
    if (req.query.authenticated && user != null) {
      json = { 'users': [user] };
    } else {
      json = { 'users': [] }
    }
    res.send(json);
  });

  usersRouter.post('/', function(req, res) {
    user = { id: 420, name: req.body.user.name, email: req.body.user.email, authenticated: true };
    console.log('received operation: ' + req.body.user.meta.operation);
    console.log('saving user');
    console.log('setting password to ' + req.body.user.meta.password);
    res.status(201).send({ user: user });
  });

  usersRouter.get('/:id', function(req, res) {
    var users = {
      '1': { id: 1, name: 'Jon Snow', email: 'jonsnow@gmail.com' },
      '2': { id: 2, name: 'Tyrion Lannister', email: 'tyrionlannister@gmail.com' },
      '3': { id: 3, name: 'Petyr Baelish', email: 'petyrbaelish@gmail.com' },
      '4': { id: 4, name: 'Ned Stark', email: 'nedstark@gmail.com' }
    };
    
    if (users[req.params.id]) {
      res.send({
        'user': users[req.params.id]
      });
    } else {
      res.status(404).send();
    }
  });

  usersRouter.put('/:id', function(req, res) {
    res.send({
      'users': {
        id: req.params.id
      }
    });
  });

  usersRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/users', usersRouter);
};
