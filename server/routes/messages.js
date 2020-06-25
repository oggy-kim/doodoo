var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const User = mongoose.model('users');
const Item = mongoose.model('items');
const Group = mongoose.model('groups');
const Message = mongoose.model('messages');

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('hi');
});

router.post('/user/:_user', async (req, res) => {
  const _user = req.params._user;
  const { _group, requestMessage, _shareUser } = req.body;

  const message = new Message({
    _user,
    requestMessage,
    _shareUser,
    _group,
  });

  const sharedGroup = await Group.findOne({ _id: _group });
  console.log(sharedGroup);
  const sendMessage = await message.save();
  console.log(sendMessage);
  sharedGroup._message = sendMessage._id;
  const result = await sharedGroup.save();

  let myList = await Group.find({
    $or: [{ _shareUser: req.user._id }, { _user: req.user._id }],
  })
    .populate('_user', 'profilepic nickname')
    .populate('_shareUser', 'profilepic nickname')
    .populate('_message', 'status shareUser')
    .sort({
      _shareUser: 1,
      createDate: 1,
    });

  res.send({
    success: true,
    message: '📧 함께하기 요청이 완료되었습니다.',
    myList,
  });
});

router.get('/user/:_user', async (req, res) => {
  const messageList = await Message.find({
    _shareUser: req.params._user,
    status: true,
  })
    .populate('_group', 'title groupColor')
    .populate('_user', 'nickname profilepic')
    .sort({
      createTime: -1,
    });

  res.send({ message: messageList });
});

router.delete('/:_messageId', async (req, res) => {
  const message = await Message.findOneAndDelete({
    _id: req.params._messageId,
  });

  let myList = await Group.find({
    $or: [{ _shareUser: req.user._id }, { _user: req.user._id }],
  })
    .populate('_user', 'profilepic nickname')
    .populate('_shareUser', 'profilepic nickname')
    .populate('_message', 'status shareUser')
    .sort({
      _shareUser: 1,
      createDate: 1,
    });

  res.send({ success: true, message: '요청이 삭제되었습니다.', myList });
});

router.post('/:_messageId', async (req, res) => {
  const { type } = req.body;
  const message = await Message.findOne({ _id: req.params._messageId });
  const sharedGroup = await Group.findOne({ _id: message._group._id });
  message.status = false;

  if (type === 'accept') {
    sharedGroup._shareUser = message._shareUser;
    sharedGroup.sharedDate = Date.now();
  }

  const messageUpdate = await message.save();
  const sharedGroupUpdate = await sharedGroup.save();

  const messageList = await Message.find({
    _shareUser: req.user._id,
    status: true,
  })
    .populate('_group', 'title groupColor')
    .populate('_user', 'nickname profilepic')
    .sort({
      createTime: -1,
    });

  let myList = await Group.find({
    $or: [{ _shareUser: req.user._id }, { _user: req.user._id }],
  })
    .populate('_user', 'profilepic nickname')
    .populate('_shareUser', 'profilepic nickname')
    .populate('_message', 'status shareUser')
    .sort({
      _shareUser: 1,
      createDate: 1,
    });

  res.send({
    message: messageList,
    myList,
  });
});

module.exports = router;
