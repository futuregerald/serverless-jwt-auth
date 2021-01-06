import UserModel from '../DB/UserModel';

export const signupEmailPassword = async ({ email, password }) => {
  console.log(email, password, 'that was it');
  try {
    const user = await UserModel.create({ email, password });

    return user;
  } catch (error) {
    console.log(error);
    return error;
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
