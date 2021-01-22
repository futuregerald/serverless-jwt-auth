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

export interface IUser extends Document {
  _id?: any;
  email?: string;
  password?: string;
  appMetadata?: any;
  userMetadata?: any;
  roles?: [string];
  exp?: number;
  tenant: string;
  confirmed: boolean;
  isValidPassword?: (string) => Promise<boolean>;
}

export interface signupReturn {
  user: IUser;
  jwt: string;
  refreshToken: string;
}

export interface IRefreshToken extends Document {
  token?: string;
  Tenant?: any;
  user: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface IVerificationToken extends Document {
  token?: string;
  user: any;
  createdAt?: string;
  updatedAt?: string;
}

export interface ITenant extends Document {
  name?: string;
  slug?: string;
  admins?: [string];
  disabled: boolean;
  createdAt?: string;
  updatedAt?: any;
}
