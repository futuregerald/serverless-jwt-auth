/* eslint-disable import/no-extraneous-dependencies */

import { signupEmailPassword } from '@architect/shared/auth/auth';
import '@architect/shared/DB/dbConnection';

const { Validator } = require('jsonschema');

const headers = {
  'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
  'content-type': 'text/html; charset=utf8',
};

const v = new Validator();
const schema = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string' },
    userMetadata: { type: 'object' },
    appMetadata: { type: 'object' },
    roles: { type: 'array' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};
v.addSchema(schema);

exports.handler = async function http(req) {
  try {
    const body = JSON.parse(req.body);

    const validationResults = v.validate(body, schema, {
      required: true,
      allowUnknownAttributes: false,
    });
    console.log(validationResults);

    const results = await signupEmailPassword(body);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(results),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers,
      body: error.message,
    };
  }
};
