const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/profileimg');
  },
  filename: function (req, file, cb) {
    console.log('params check!');
    console.log(req.params);
    cb(null, `${req.params._id}.png`);
  },
});

module.exports = multer({ storage: storage, limits: 5 * 1024 * 1024 }).single(
  'img'
);
