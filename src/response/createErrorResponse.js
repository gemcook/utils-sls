/* @flow */
export const createErrorResponse = (statusCode, errMessage) => {
  return {
    isBase64Encoded: false,
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({message: errMessage}),
  };
};
