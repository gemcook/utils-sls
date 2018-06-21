/* @flow */
export const getBodyOptions = event => {
  const body = JSON.parse(event.body);
  return body.options;
};
