/* eslint-disable import/no-extraneous-dependencies */
require('@architect/shared/DB/dbConnection');

const { signupEmailPassword } = require('@architect/shared/auth/auth');

const headers = {
  'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
  'content-type': 'text/html; charset=utf8',
};

exports.handler = async function http(req) {
  try {
    const body = JSON.parse(req.body);
    const results = await signupEmailPassword(body);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(results),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: error.message,
    };
  }
};
