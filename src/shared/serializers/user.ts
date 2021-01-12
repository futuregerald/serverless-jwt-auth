import pick from 'lodash/pick';
import omit from 'lodash/omit';
import cloneDeep from 'lodash/cloneDeep';
import { IUser } from '../types';

export const userSerializer = (u: IUser): IUser => {
  // you can use or not use both, or just one of the following two arrays to set which fields you want included in user object
  const allowedFields: string[] = [
    'email',
    'appMetadata',
    'userMetadata',
    'roles',
  ]; // optional, put fields you want returned to the user
  const omittedFields: string[] = []; // optional, put fields you want ommitted, like 'password'

  let userObj: IUser = cloneDeep(u);
  if (allowedFields.length > 0) {
    userObj = pick(u, allowedFields);
  }
  if (omittedFields.length > 0) {
    userObj = omit(u, omittedFields);
  }
  return userObj;
};
