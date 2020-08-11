const AWS = require("aws-sdk");

const lambda = new AWS.Lambda({
  region: "us-west-2",
});

module.exports.callLambdaFunction = async function (
  lambdaFunctionName,
  InvocationType = "RequestResponse",
  payload = null
) {
  const params = {
    FunctionName: lambdaFunctionName,
    InvocationType: InvocationType,
    Payload: payload,
  };

  return lambda.invoke(params, function (error, data) {
    if (error) {
      console.error(JSON.stringify(error));
      return new Error(`Error printing messages: ${JSON.stringify(error)}`);
    } else if (data) {
      console.log(data);
      return data;
    }
  });
};
