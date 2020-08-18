"use strict";
const utils = require("./utils");
const AWSServices = require("../../utils/aws_services");

jest.mock("../../utils/aws_services");

beforeEach(() => {
  AWSServices.mockClear();
});

test("should calculate average properly", async () => {
  expect(AWSServices).not.toHaveBeenCalled();

  const result = await utils.sendTickersViaEmail();

  expect(AWSServices).toHaveBeenCalled();
});
