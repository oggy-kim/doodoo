const passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/');
});

router.get(
  '/kakao',
  passport.authenticate('kakao', {
    authType: 'rerequest',
  })
);
router.get('/kakao/callback', passport.authenticate('kakao'), (req, res) => {
  return res.redirect('/home');
});

router.post('/signin', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(info);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      res.send(user);
    });
  })(req, res, next);
});

module.exports = router;
