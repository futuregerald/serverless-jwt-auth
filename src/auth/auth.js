const User = require('../DB/UserModel');

const signupEmailPassword = async ({ email, password }) => {
  console.log(email, password, 'that was it');
  try {
    const user = await User.create({ email, password });

    return user;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const loginEmailPassword = async (email, password) => {
  try {
    const user = await User.findOne({ email });

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

exports.loginEmailPassword = loginEmailPassword;
exports.signupEmailPassword = signupEmailPassword;
