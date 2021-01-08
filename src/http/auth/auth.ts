import UserModel from '../DB/UserModel';
import { generateUserJWT, generateRefreshJWT } from './jwt';

interface signupEmailPasswordFunc {
  email: string;
  password: string;
}
const signingSecret = process.env.SIGNING_SECRET;

export const signupEmailPassword = async ({
  email,
  password,
}: signupEmailPasswordFunc) => {
  try {
    if (!signingSecret) {
      throw new Error('JWT Signing Secret Not Found');
    }
    const user = await UserModel.create({ email, password });
    const { password: _, ...userObj } = user.toObject();
    return {
      user,
      jwt: generateUserJWT(signingSecret, userObj),
      refreshToken: generateRefreshJWT(signingSecret, userObj),
      error: null,
    };
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

export const loginEmailPassword = async (email, password) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return { message: 'User not found' };
    }

    const validate = await user.isValidPassword(password);

    if (!validate) {
      return { message: 'Wrong Password' };
    }

    return { message: 'Logged in Successfully' };
  } catch (error) {
    return { message: 'Error finding user', error };
  }
};
