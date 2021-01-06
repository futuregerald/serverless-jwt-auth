const mongoose = require('mongoose');
const argon2 = require('argon2');

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    app_metadata: {
      type: String,
    },
  },
  { timestamps: { createdAt: 'updatedAt', updatedAt: 'updatedAt' } }
);

UserSchema.pre('save', async function(next) {
  const user = this;
  let hash;
  try {
    hash = await argon2.hash(user.password, { type: argon2.argon2id });
  } catch (err) {
    console.log(err);
    user.password = 'unset';
  }

  user.password = hash;
  console.log('the user is', user);
  next();
});

UserSchema.methods.isValidPassword = async function(password) {
  try {
    const user = this;
    const compare = await argon2.verify(user.password, password);

    return compare;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
