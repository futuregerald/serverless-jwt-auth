import jwt from 'jsonwebtoken';
import add from 'date-fns/add';
import {
  generateJWTOptions,
  generateRefreshJWTOptions,
  expiryDateOptions,
} from './types';
import RefreshTokenSchema from '../DB/RefreshTokenSchema';

// const getExpDate = () => Math.floor(Date.now() / 1000) + 60 * 60;
const getExpDate = (options?: expiryDateOptions) => {
  let expiryOptions = options;
  if (!expiryOptions) {
    expiryOptions = { hours: 1 };
  }
  const expiryDate = add(new Date(), expiryOptions);
  console.log('expiryDate', Math.floor(expiryDate.getTime() / 1000));
  return Math.floor(expiryDate.getTime() / 1000);
};

export const generateUserJWT = (
  signingSecret: string,
  options: generateJWTOptions
): string =>
  jwt.sign(
    {
      exp: options.exp || getExpDate(),
      app_metadata: {
        user_id: options._id,
        user_email: options.email,
        authorization: {
          roles: options.roles,
        },
        custom: options.appMetadata,
      },
      user_metadata: options.userMetadata,
    },
    signingSecret
  );

export const generateRefreshJWT = (
  signingSecret: string,
  options: generateRefreshJWTOptions
): string =>
  jwt.sign(
    {
      exp: options.exp || getExpDate({ months: 1 }),
      app_metadata: {
        user_id: options._id,
      },
    },
    signingSecret
  );

export const generateAndSaveRefreshToken = async (
  signingSecret: string,
  options: generateRefreshJWTOptions
): Promise<string> => {
  try {
    const token = generateRefreshJWT(signingSecret, options);
    await RefreshTokenSchema.create({ token });
    return token;
  } catch (error) {
    return Promise.reject(error);
  }
};
