var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const fs = require('fs');
const passport = require('passport');
var upload = require('../services/fileupload');

const User = mongoose.model('users');
const Item = mongoose.model('items');
const Group = mongoose.model('groups');

router.get('/current_user', (req, res) => {
  res.send(req.user);
});

router.post('/signup', async (req, res) => {
  const existingId = await User.findOne({
    userId: req.body.userId,
  });
  if (existingId) {
    return res.send({ duplicate: 'userId', error: 'ID가 이미 존재합니다. ' });
  }
  const existingEmail = await User.findOne({
    email: req.body.email,
  });
  if (existingEmail) {
    return res.send({
      duplicate: 'email',
      error: '이미 존재하는 이메일 주소입니다.',
    });
  }
  const existingNick = await User.findOne({
    nickname: req.body.nickname,
  });
  if (existingNick) {
    return res.send({
      duplicate: 'nickname',
      error: '이미 존재하는 닉네임입니다.',
    });
  }

  const { userId, password, email, nickname, profilepic } = req.body;
  const user = new User({
    userId,
    email,
    nickname,
    profilepic: `${profilepic === 'false'}` ? false : true,
    joinDate: Date.now(),
    status: true,
  });

  user.password = await user.encryptPassword(password);

  user.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('join complete!');
      req.login(user, function (err) {
        if (err) {
          console.log(err);
        }
        res.send({
          duplicate: '',
          error: '',
          user,
        });
      });
    }
  });
});

router.patch('/signupviasns', async (req, res) => {
  const user = await User.findOne({
    _id: req.body._id,
  });

  const existingEmail = await User.findOne({
    email: req.body.email,
  });

  const existingNick = await User.findOne({
    nickname: req.body.nickname,
  });

  if (existingEmail && existingEmail._id != req.body._id) {
    return res.status(409).send({
      success: false,
      message: '이미 사용중인 이메일입니다.',
    });
  } else {
    user.email = req.body.email;
  }

  if (existingNick && existingNick._id != req.body._id) {
    return res.status(409).send({
      success: false,
      message: '이미 사용중인 닉네임입니다.',
    });
  } else {
    user.nickname = req.body.nickname;
  }

  user.status = true;
  user.joinDate = Date.now();

  user.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('join complete!');
      req.login(user, function (err) {
        if (err) {
          console.log(err);
        }
        res.send({
          duplicate: '',
          error: '',
          user,
        });
      });
    }
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.post('/:_id/addprofilepic', upload, async (req, res) => {
  const user = await User.findOne({ _id: req.params._id });
  user.profilepic = true;
  const modifedUser = await user.save();
  res.send({ user: modifedUser });
});

router.patch('/:_id', async (req, res) => {
  const user = await User.findOne({ _id: req.params._id });
  if (req.body.profilepic === 'delete') {
    user.profilepic = false;
    const path = `./public/images/profileimg/${req.params._id}.png`;
    fs.unlinkSync(path);
  }
  if (req.body.nickname) {
    if (await User.findOne({ nickname: req.body.nickname })) {
      return res.status(409).send({
        success: false,
        message: '이미 사용중인 닉네임입니다.',
      });
    } else {
      user.nickname = req.body.nickname;
    }
  }
  if (req.body.email) {
    if (await User.findOne({ email: req.body.email })) {
      return res
        .status(409)
        .send({ success: false, message: '이미 사용중인 이메일입니다. ' });
    } else {
      user.email = req.body.email;
    }
  }
  if (req.body.password) {
    const encryptedPassword = await new User().encryptPassword(
      req.body.checkPassword
    );
    if (user.password === encryptedPassword) {
      user.password = await user.encryptPassword(req.body.password);
    } else {
      return res
        .status(403)
        .send({ success: false, message: '비밀번호가 올바르지 않습니다.' });
    }
  }
  const modifedUser = await user.save();
  res.send({ success: true, user: modifedUser });
});

router.delete('/:_id', async (req, res) => {
  const deletedItems = await Item.deleteMany({ _user: req.params._id });
  const deletedGroup = await Group.deleteMany({
    _user: req.params._id,
  });
  const disconnectGroup = await Group.find({
    $or: [{ _shareUser: req.params._id }, { _user: req.params._id }],
  }).updateMany({
    _shareUser: null,
    sharedDate: null,
  });

  const deletedUser = await User.findOneAndDelete({ _id: req.params._id });
  if (deletedUser.profilepic) {
    const path = `./public/images/profileimg/${req.params._id}.png`;
    fs.unlinkSync(path);
  }

  req.logout();
  res.send({
    success: true,
    deletedItems: deletedItems.deletedCount,
    deletedGroup: deletedGroup.deletedCount,
    user: deletedUser,
  });
});

router.get('/find', async (req, res) => {
  const user = await User.findOne({ nickname: req.query.nickname });
  res.send({ user });
});

module.exports = router;
