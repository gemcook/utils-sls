/* @flow */
export const getBody = event => {
  const result = JSON.parse(event.body);
  return result;
};
