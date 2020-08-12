const AWS = require("aws-sdk");

const lambda = new AWS.Lambda({
  region: "us-east-1",
});

module.exports.callLambdaFunction = async function (
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

    const result = await lambda.invoke(params).promise();

    return result;
  } catch (error) {
    console.log(`Error while invoking lambda function ${lambdaFunctionName}`);
    console.log(error);
  }
};
