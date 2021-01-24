const add = require('date-fns/add');
const jwt = require('jsonwebtoken');
const RefreshTokenModel = require('../DB/RefreshTokenModel');

// const getExpDate = () => Math.floor(Date.now() / 1000) + 60 * 60;
const getExpDate = options => {
  let expiryOptions = options;
  if (!expiryOptions) {
    expiryOptions = { hours: 1 };
  }
  const expiryDate = add(new Date(), expiryOptions);
  return Math.floor(expiryDate.getTime() / 1000);
};

const generateUserJWT = (signingSecret, options) =>
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

const generateRefreshJWT = (signingSecret, options) =>
  jwt.sign(
    {
      exp: options.exp || getExpDate({ months: 1 }),
      app_metadata: {
        user_id: options._id,
      },
    },
    signingSecret
  );

const generateAndSaveRefreshToken = async (signingSecret, options, user) => {
  try {
    const token = generateRefreshJWT(signingSecret, options);
    await RefreshTokenModel.create({ token, user });
    return token;
  } catch (error) {
    return Promise.reject(error);
  }
};
exports.generateAndSaveRefreshToken = generateAndSaveRefreshToken;
exports.generateRefreshJWT = generateRefreshJWT;
exports.generateUserJWT = generateUserJWT;
