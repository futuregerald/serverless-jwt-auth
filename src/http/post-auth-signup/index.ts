/* eslint-disable import/no-extraneous-dependencies */

import { signupEmailPassword } from '@architect/shared/auth/auth';
import '@architect/shared/DB/dbConnection';
import arc from '@architect/functions';
import validatePayload from './validator';

const headers = {
  'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
  'content-type': 'application/json; charset=utf8',
};

export const handler = async function http(req) {
  try {
    const body = JSON.parse(req.body);
    validatePayload(body);

    const results = await signupEmailPassword(body);

    await arc.events.publish({
      name: 'account-new-signup',
      payload: results.user,
    });

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
