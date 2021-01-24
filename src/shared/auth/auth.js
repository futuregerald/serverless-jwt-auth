const { userSerializer } = require('../serializers/user');
const UserModel = require('../DB/UserModel');

const { generateUserJWT, generateAndSaveRefreshToken } = require('./jwt');

const signingSecret = process.env.SIGNING_SECRET;

exports.signupEmailPassword = async ({ email, password }) => {
  try {
    if (!signingSecret) {
      throw new Error('JWT Signing Secret Not Found');
    }
    const user = await UserModel.create({ email, password });
    const userObj = user;

    const userJwtOptions = {
      _id: userObj._id,
      email: userObj.email,
      appMetadata: userObj.appMetadata,
      userMetadata: userObj.userMetadata,
      roles: userObj.roles,
    };

    return {
      user: userSerializer(userObj),
      jwt: generateUserJWT(signingSecret, userJwtOptions),
      refreshToken: await generateAndSaveRefreshToken(
        signingSecret,
        userJwtOptions,
        user
      ),
    };
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
