const { User } = require('./db/models')

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  },
  req.session.save(()=> res.redirect('/home'))
}

const restoreUser = async (req, res, next) => {

  console.log(req.session);

  if (req.session.auth) {
    const { userId } = req.session.auth;

    try {
      const user = await User.findByPk(userId);

      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
      }
    } catch (err) {
      res.locals.authenticated = false;
      next(err);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
};

const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/');
  }
  return next();
};

const logoutUser = (req, res) => {
  delete req.session.auth;
  req.session.save(()=> res.redirect('/'))
}

module.exports = { loginUser, restoreUser, logoutUser, requireAuth }
