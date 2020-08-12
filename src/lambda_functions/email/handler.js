"use strict";
const utils = require("./utils");

module.exports.sendTickersViaEmail = async (event) => {
  try {
    let result = await utils.sendTickersViaEmail();

    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: result }),
    };
    return response;
  } catch (error) {
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: error }),
    };
    return response;
  }
};
