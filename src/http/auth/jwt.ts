import jwt from 'jsonwebtoken';
import { generateJWTOptions } from './types';

const getExpDate = () => Math.floor(Date.now() / 1000) + 60 * 60;

export const generateUserJWT = (
  signingSecret: string,
  options: generateJWTOptions
): string =>
  jwt.sign(
    {
      exp: options.exp || getExpDate(),
      app_metadata: {
        user_id: options._id,
        authorization: {
          roles: options.roles,
        },
        custom: options.appMetadata,
      },
      user_metadata: options.userMetadata,
    },
    signingSecret
  );
