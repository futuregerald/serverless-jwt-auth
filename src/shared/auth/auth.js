const { userSerializer } = require('../serializers/user');
const UserModel = require('../DB/UserModel');
const TenantModel = require('../DB/TenantModel');

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

exports.loginEmailPassword = async ({ email, password, tenantID }) => {
  try {
    let tenantSigningSecret;
    if (tenantID) {
      const { signingSecret: secret } = await TenantModel.findById(tenantID);
      tenantSigningSecret = secret;
    }
    if (!signingSecret) {
      throw new Error('JWT Signing Secret Not Found');
    }
    const user = await UserModel.findOne({ email });
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      console.log('invalid password bruv');
      throw new Error('Invalid password');
    }
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
      jwt: generateUserJWT(
        tenantSigningSecret || signingSecret,
        userJwtOptions
      ),
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
