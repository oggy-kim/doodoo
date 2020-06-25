var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

const Group = mongoose.model('groups');
const Item = mongoose.model('items');
const requireLogin = require('../middlewares/requireLogin');

router.get('/', (req, res) => {
  res.send('hi');
});

router.post('/add', requireLogin, async (req, res) => {
  console.log('Received!');
  console.log(req.body);
  console.log(req.user);
  const { _id, title, description, groupColor } = req.body;
  const group = new Group({
    title,
    description,
    groupColor,
    _user: _id,
    createDate: Date(),
  });

  let myList = await group.save();

  if (myList) {
    myList = await Group.findOne({ _id: myList._id })
      .populate('_user', 'profilepic nickname')
      .populate('_shareUser', 'profilepic nickname');
  }

  console.log(myList);
  res.send({
    myList,
  });
});

router.post('/:groupId/items/add', requireLogin, async (req, res) => {
  console.log('item add Received!');
  const { _id, content } = req.body;
  const newItem = new Item({
    content,
    _user: _id,
    _group: req.params.groupId,
    createDate: Date(),
    modifyDate: Date(),
  });

  console.log(newItem);

  const result = await newItem.save();
  const addedItem = await Item.find({ _id: newItem._id })
    .populate('_user', 'nickname profilepic')
    .populate('_group', 'title groupColor');
  res.send({ addedItem });
});

router.patch('/:groupId/items/:itemId', requireLogin, async (req, res) => {
  console.log('patch request received!');
  console.log(req.params.groupId);
  const { changedValue } = req.body;

  let editedItem = '';
  const item = await Item.findOne({ _id: req.params.itemId });
  if (changedValue === 'complete') {
    item.complete = item.complete === false ? true : false;
    item.modifyDate = Date();
    editedItem = await item.save();
  } else if (changedValue === 'favorite') {
    item.favorite = item.favorite === false ? true : false;
    item.modifyDate = Date();
    editedItem = await item.save();
  } else if (changedValue === 'status') {
    item.status = true;
    editedItem = await item.save();
  }

  if (req.params.groupId === 'recyclebin') {
    const selectedItems = await Item.find({ status: false })
      .populate({
        path: '_group',
        select: 'title _shareUser groupColor',
        match: {
          $or: [{ _shareUser: req.user._id }, { _user: req.user._id }],
        },
      })
      .populate('_user', 'profilepic nickname')
      .sort({
        modifyDate: -1,
      });
    const groupItems = await selectedItems.filter((item) => {
      return item._group;
    });
    console.log(groupItems);
    res.send({
      groupItems,
    });
  } else {
    const groupItems = await Item.find({
      _group: req.params.groupId,
      status: true,
    })
      .populate('_user', 'profilepic nickname')
      .populate('_group', 'title groupColor')
      .sort({
        complete: 1,
        favorite: -1,
        modifyDate: -1,
      });

    res.send({ groupItems });
  }
});

router.delete('/:groupId/items/:itemId', requireLogin, async (req, res) => {
  console.log('delete request received!');
  const deleteItem = await Item.findOne({ _id: req.params.itemId });
  console.log(deleteItem);
  deleteItem.status = false;
  await deleteItem.save();

  res.send({ result: 'success' });
});

router.get('/:_id', async (req, res) => {
  console.log('Group Received!');
  if (req.params._id === 'recyclebin') {
    const selectedItems = await Item.find({ status: false })
      .populate({
        path: '_group',
        select: 'title _shareUser groupColor',
        match: {
          $or: [{ _shareUser: req.user._id }, { _user: req.user._id }],
        },
      })
      .populate('_user', 'profilepic nickname')
      .sort({
        modifyDate: -1,
      });
    const groupItems = await selectedItems.filter((item) => {
      return item._group;
    });
    console.log(groupItems);
    res.send({
      groupItems,
    });
  } else {
    const groupItems = await Item.find({ _group: req.params._id, status: true })
      .populate('_user', 'profilepic nickname')
      .populate('_group', 'title groupColor')
      .sort({
        complete: 1,
        favorite: -1,
        modifyDate: -1,
      });

    res.send({
      groupItems,
    });
  }
});

router.patch('/:groupId', async (req, res) => {
  console.log('Group Edit Received!');

  switch (req.body.type) {
    case 'disconnect':
      const group = await Group.findOneAndUpdate(
        { _id: req.params.groupId },
        { _shareUser: null, sharedDate: null }
      );
      res.send({ result: group });
  }
});

router.delete('/:groupId', async (req, res) => {
  console.log('Group Delete Received!');
  const deleteItems = await Item.deleteMany({ _group: req.params.groupId });
  const deletedGroup = await Group.findOneAndDelete({
    _id: req.params.groupId,
  });
  res.send({ deletedGroup });
});

router.get('/user/:_id/items/favorite', async (req, res) => {
  const selectedItems = await Item.find({ favorite: true, status: true })
    .populate({
      path: '_group',
      select: 'title _shareUser groupColor',
      match: {
        $or: [{ _shareUser: req.params._id }, { _user: req.params._id }],
      },
    })
    .populate('_user', 'profilepic nickname')
    .sort({
      complete: 1,
      favorite: -1,
      modifyDate: -1,
    });
  const result = await selectedItems.filter((item) => {
    return item._group;
  });
  res.send({
    favoriteItems: result,
  });
});

router.get('/user/:_id', async (req, res) => {
  console.log('Received!');
  console.log(req.params._id);
  let myList = await Group.find({
    $or: [{ _shareUser: req.params._id }, { _user: req.params._id }],
  })
    .populate('_user', 'profilepic nickname')
    .populate('_shareUser', 'profilepic nickname')
    .populate('_message', 'status shareUser')
    .sort({
      _shareUser: 1,
      createDate: 1,
    });
  res.send({
    myList,
  });
});

module.exports = router;
