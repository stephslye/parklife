const User = require('../models/user');

function newRoute(req, res) {
  res.render('sessions/index');
}

function createRoute(req, res) {
  User
    .findOne({email: req.body.email})
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) {
        res.status(401).render('sessions/index', {message: 'Sorry, either your email or password is wrong'});
      }
      req.session.userId = user.id;
      res.redirect('/reviews');
    });
}

function deleteRoute(req, res) {
  return req.session.regenerate(() => res.redirect('/'));
}

module.exports = {
  new: newRoute,
  create: createRoute,
  delete: deleteRoute
};