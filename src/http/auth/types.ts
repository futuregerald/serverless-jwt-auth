export interface generateJWTOptions {
  email: string;
  _id: string;
  appMetadata?: any;
  userMetadata?: any;
  roles?: string[];
  exp?: number;
}
