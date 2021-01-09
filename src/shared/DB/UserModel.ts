import mongoose, { Schema, Document } from 'mongoose';
import argon2 from 'argon2';

export interface IUser extends Document {
  email?: string;
  password?: string;
  appMetadata?: any;
  userMetadata?: any;
  roles?: [string];
  exp?: number;
  isValidPassword?: (string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
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
    appMetadata: {
      type: Object,
    },
    userMetadata: {
      type: Object,
    },
    roles: {
      type: Array,
    },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>('save', async function(next) {
  const user = this;
  if (!this.isModified('password')) {
    return next();
  }
  let hash;

  try {
    hash = await argon2.hash(user.password, { type: argon2.argon2id });
  } catch (err) {
    console.log(err);
    user.password = '';
  }

  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function(
  password: string
): Promise<boolean> {
  try {
    const user = this;
    const compare = await argon2.verify(user.password, password);

    return compare;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;
