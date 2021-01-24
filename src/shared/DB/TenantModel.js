const mongoose = require('mongoose');

const { Schema } = mongoose;

const TenantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    admins: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      required: false,
      index: true,
    },
  },
  { timestamps: true }
);
TenantSchema.index({ createdAt: 1 }, { expireAfterSeconds: '1m' });

const TenantModel = mongoose.model('Tenant', TenantSchema);
module.exports = TenantModel;
