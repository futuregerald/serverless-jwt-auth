import mongoose, { Schema, Document } from 'mongoose';

export interface IRefreshToken extends Document {
  token?: string;
  group?: string;
  user: any;
  createdAt?: string;
  updatedAt?: any;
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    group: {
      type: String,
      default: 'global',
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
RefreshTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: '1m' });

const RefreshTokenModel = mongoose.model<IRefreshToken>(
  'RefreshToken',
  RefreshTokenSchema
);
export default RefreshTokenModel;
