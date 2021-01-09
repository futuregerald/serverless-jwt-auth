import { Document } from 'mongoose';

export interface generateJWTOptions {
  email: string;
  _id: string;
  appMetadata?: any;
  userMetadata?: any;
  roles?: string[];
  exp?: number;
}

export interface generateRefreshJWTOptions {
  _id: string;
  exp?: number;
}

export interface expiryDateOptions {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

export interface signupEmailPasswordFunc {
  email: string;
  password: string;
}

export interface signupReturn {
  user: any;
  jwt: string;
  refreshToken: string;
}

export interface IUser extends Document {
  email?: string;
  password?: string;
  appMetadata?: any;
  userMetadata?: any;
  roles?: [string];
  exp?: number;
  isValidPassword?: (string) => Promise<boolean>;
}
