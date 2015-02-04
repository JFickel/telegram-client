module.exports = function(app) {
  var express = require('express');
  var usersRouter = express.Router();

  usersRouter.get('/', function(req, res) {
    res.send({
      'users': []
    });
  });

  usersRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  usersRouter.get('/:id', function(req, res) {
    var users = {
      '1': { id: 1, firstName: 'Jon', lastName: 'Snow', email: 'jonsnow@gmail.com' },
      '2': { id: 2, firstName: 'Tyrion', lastName: 'Lannister', email: 'tyrionlannister@gmail.com' },
      '3': { id: 3, firstName: 'Petyr', lastName: 'Baelish', email: 'petyrbaelish@gmail.com' },
      '4': { id: 4, firstName: 'Ned', lastName: 'Stark', email: 'nedstark@gmail.com' },
    };
    res.send({
      'user': users[req.params.id]
    });
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
