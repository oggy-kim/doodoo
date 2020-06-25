const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto');
var keys = require('../config/keys');

const userSchema = new Schema({
  userId: String,
  password: String,
  email: String,
  nickname: String,
  profilepic: { type: Boolean, default: false },
  sns: { type: String, default: null },
  joinDate: { type: Date, default: Date.now() },
  status: { type: Boolean, default: false },
});

userSchema.methods.encryptPassword = (pwd) => {
  return new Promise((resolve) => {
    crypto.pbkdf2(pwd, keys.salt, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) resolve(err);
      resolve(derivedKey.toString('hex'));
    });
  });
};

userSchema.methods.comparePassword = async (inputPassword, dbPassword) => {
  const encryptedPassword = await userSchema.methods.encryptPassword(
    inputPassword
  );
  if (encryptedPassword === dbPassword) {
    return true;
  } else {
    return false;
  }
};

mongoose.model('users', userSchema);
