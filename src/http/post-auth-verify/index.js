"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function http(req) {
    return {
        statusCode: 200,
        headers: {
            'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
            'content-type': 'text/html; charset=utf8',
        },
        body: 'booger',
    };
}
exports.default = http;
