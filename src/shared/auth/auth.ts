import UserModel from '../DB/UserModel';
import { generateUserJWT, generateAndSaveRefreshToken } from './jwt';
import {
  signupEmailPasswordFunc,
  signupReturn,
  generateJWTOptions,
  generateRefreshJWTOptions,
} from './types';

const signingSecret = process.env.SIGNING_SECRET;

export const signupEmailPassword = async ({
  email,
  password,
}: signupEmailPasswordFunc): Promise<signupReturn> => {
  try {
    if (!signingSecret) {
      throw new Error('JWT Signing Secret Not Found');
    }
    const user = await UserModel.create({ email, password });
    const userObj = user.toObject();

    const userJwtOptions: generateJWTOptions = {
      _id: userObj._id,
      email: userObj.email,
      appMetadata: userObj.appMetadata,
      userMetadata: userObj.userMetadata,
      roles: userObj.roles,
    };

    return {
      user,
      jwt: generateUserJWT(signingSecret, userJwtOptions),
      refreshToken: await generateAndSaveRefreshToken(
        signingSecret,
        userJwtOptions
      ),
    };
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
