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
