import UserModel from '../DB/UserModel';
import { generateUserJWT, generateRefreshJWT } from './jwt';
import { signupEmailPasswordFunc, signupReturn } from './types';

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
    const { password: _, ...userObj } = user.toObject();
    return {
      user,
      jwt: generateUserJWT(signingSecret, userObj),
      refreshToken: await generateRefreshJWT(signingSecret, userObj),
    };
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
