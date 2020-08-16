const AWS = require("aws-sdk");

module.exports = class AWSServices {
  constructor(region) {
    this.lambda = new AWS.Lambda({
      region: region,
    });
  }

  async callLambdaFunction(
    lambdaFunctionName,
    InvocationType = "RequestResponse",
    payload = null
  ) {
    try {
      const params = {
        FunctionName: lambdaFunctionName,
        InvocationType: InvocationType,
        Payload: payload,
      };

      const result = this.lambda.invoke(params).promise();

      return result;
    } catch (error) {
      console.log(`Error while invoking lambda function ${lambdaFunctionName}`);
      console.log(error);
    }
  }
};
