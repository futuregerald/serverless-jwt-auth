import mongoose, { Schema, Document } from 'mongoose';

const argon2 = require('argon2');

export interface IRefreshToken extends Document {
  _id: string;
  token: string;
  createdAt?: string;
  updatedAt?: any;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    createdAt: { type: Date, expires: '30d', default: Date.now },
  },
  { timestamps: true }
);
RefreshTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: '1m' });

RefreshTokenSchema.methods.isValidPassword = async function(password) {
  try {
    const user = this;
    const compare = await argon2.verify(user.password, password);

    return compare;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const RefreshTokenModelModel = mongoose.model<IRefreshToken>(
  'User',
  RefreshTokenSchema
);
export default RefreshTokenModelModel;
