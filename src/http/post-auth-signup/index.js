require('../../DB/dbConnection');

const { signupEmailPassword } = require('../../auth/auth');

exports.handler = async function http(req) {
  const body = JSON.parse(req.body);
  const results = await signupEmailPassword(body);
  return {
    statusCode: 200,
    headers: {
      'cache-control':
        'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8',
    },
    body: JSON.stringify(results),
  };
};
