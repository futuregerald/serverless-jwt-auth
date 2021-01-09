import mongoose, { Schema, Document } from 'mongoose';

const argon2 = require('argon2');

export interface IRefreshToken extends Document {
  _id: string;
  token: string;
  group: string;
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
    group: {
      type: String,
      default: 'global',
    },
    createdAt: { type: Date, expires: '30d', default: Date.now },
  },
  { timestamps: true }
);
RefreshTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: '1m' });

const RefreshTokenModel = mongoose.model<IRefreshToken>(
  'RefreshToken',
  RefreshTokenSchema
);
export default RefreshTokenModel;
