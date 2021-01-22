import mongoose, { Schema } from 'mongoose';
import { uid } from 'rand-token';
import { IVerificationToken } from '../types';

const VerificationTokenSchema = new Schema<IVerificationToken>(
  {
    token: {
      type: String,
      required: true,
      default: uid(12),
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    createdAt: { type: Date, expires: '1d', default: Date.now },
  },
  { timestamps: true }
);

const VerificationTokenModel = mongoose.model<IVerificationToken>(
  'VerificationToken',
  VerificationTokenSchema
);
export default VerificationTokenModel;
