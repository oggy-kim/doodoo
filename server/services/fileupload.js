const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const keys = require('../config/keys');

AWS.config.update({
  accessKeyId: keys.AWSaccessKeyId,
  secretAccessKey: keys.AWSsecretAccessKey,
  region: 'ap-northeast-2',
});

let s3 = new AWS.S3();

const storage = multerS3({
  s3: s3,
  bucket: process.env.NODE_ENV === 'production' ? 'doodoo-prod' : 'doodoo-dev',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read-write',
  key: (req, file, cb) => {
    console.log(file);
    var fullPath = 'profileimg/' + `${req.params._id}.png`;
    cb(null, fullPath);
  },
});

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/images/profileimg');
//   },
//   filename: function (req, file, cb) {
//     console.log('params check!');
//     console.log(req.params);
//     cb(null, `${req.params._id}.png`);
//   },
// });

module.exports = multer({ storage: storage, limits: 5 * 1024 * 1024 }).single(
  'img'
);
