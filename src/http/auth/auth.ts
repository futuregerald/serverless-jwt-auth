import UserModel from '../DB/UserModel';

interface signupEmailPasswordFunc {
  email: string;
  password: string;
}

export const signupEmailPassword = async ({
  email,
  password,
}: signupEmailPasswordFunc) => {
  try {
    const user = await UserModel.create({ email, password });
    return {
      user,
      error: null,
    };
  } catch (error) {
    console.log(error);
    return {
      user: null,
      error,
    };
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
