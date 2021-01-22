import mongoose, { Schema } from 'mongoose';
import { IRefreshToken } from '../types';

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    Tenant: {
      type: Schema.Types.ObjectId,
      ref: 'Tenant',
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    createdAt: { type: Date, expires: '30d', default: Date.now },
  },
  { timestamps: true }
);

const RefreshTokenModel = mongoose.model<IRefreshToken>(
  'RefreshToken',
  RefreshTokenSchema
);
export default RefreshTokenModel;
