/* @flow */
import AWS from 'aws-sdk';
import {createResponse} from './../response/createResponse';
import {createErrorResponse} from './../response/createErrorResponse';

const client = new AWS.DynamoDB.DocumentClient({
  region: 'ap-northeast-1',
});

console.log(process.env.REGION);

export const doScan = (params, callback, region = 'ap-northeast-1') => {
  let results = [];

  console.log(region);

  if (region !== 'ap-northeast-1') {
    client.region = region;
  }

  client.scan(params, (err, res) => {
    if (err) {
      console.error(err);
      const response = createErrorResponse(500, err);
      return callback(err, response);
    }

    if (res['LastEvaluatedKey']) {
      params.ExclusiveStartKey = res.LastEvaluatedKey;

      res.Items.map(item => {
        results.push(item);
      });

      this.doScan(params);
    } else {
      res.Items.map(item => {
        results.push(item);
      });

      const response = createResponse(200, results);
      return callback(null, response);
    }
    return null;
  });
};
