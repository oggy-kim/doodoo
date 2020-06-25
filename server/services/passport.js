var passport = require('passport');
var KakaoStrategy = require('passport-kakao').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var keys = require('../config/keys');
var mongoose = require('mongoose');
var request = require('request');
var fs = require('fs');

var User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // mongoDB에 있는 id로 만들어준다.
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new KakaoStrategy(
    {
      clientID: keys.kakaoClientKey,
      clientSecret: '',
      callbackURL: 'http://localhost:3050/api/auth/kakao/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        sns: 'kakao',
        userId: profile.id,
      });
      if (existingUser) {
        done(null, existingUser);
      } else {
        console.log(profile._json.properties.profile_image);
        const user = await new User({
          sns: 'kakao',
          userId: profile.id,
          nickname: profile.username,
          email:
            profile._json.kakao_account.has_email &&
            profile._json.kakao_account.is_email_verified
              ? profile._json.kakao_account.email
              : undefined,
          status: false,
          profilepic: profile._json.properties.profile_image ? true : false,
        }).save();

        await request(
          profile._json.properties.profile_image,
          { encoding: 'binary' },
          function (error, response, body) {
            fs.writeFile(
              `./public/images/profileimg/${user._id}.png`,
              body,
              'binary',
              function (err) {}
            );
          }
        );

        done(null, user);
      }
    }
  )
);

passport.use(
  new LocalStrategy(
    {
      usernameField: 'userId',
      passwordField: 'password',
      session: true,
      passReqToCallback: true,
    },
    async (req, userId, password, done) => {
      const existingUser = await User.findOne({
        sns: null,
        userId: userId,
      });
      console.log('existingUser');
      console.log(existingUser);
      if (!existingUser) {
        done(null, false, { message: '회원 정보가 없습니다.' });
      }
      const checkPwd = await existingUser.comparePassword(
        password,
        existingUser.password
      );
      if (!existingUser.status) {
        done(null, false, { message: '회원가입 완료가 필요합니다.' });
      }

      if (!checkPwd) {
        done(null, false, { message: '비밀번호를 확인해주세요.' });
      } else {
        done(null, existingUser);
      }
    }
  )
);
