"use strict";
const utils = require("./utils");
const aws_services = require("../../utils/aws_services");
const mg = require("mailgun-js");

jest.mock("../../utils/aws_services");

test("should calculate average properly", async () => {
  const callLambdaMock = aws_services.callLambdaFunction.mockImplementation(
    () => {
      return Promise.resolve(10);
    }
  );

  const result = await utils.sendTickersViaEmail();

  expect(callLambdaMock).toHaveBeenCalled();
});
