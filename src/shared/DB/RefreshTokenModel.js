const mongoose = require('mongoose');

const { Schema } = mongoose;

const RefreshTokenSchema = new Schema(
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

const RefreshTokenModel = mongoose.model('RefreshToken', RefreshTokenSchema);
module.exports = RefreshTokenModel;
