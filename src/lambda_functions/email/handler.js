"use strict";
const utils = require("./utils");

module.exports.sendTickersViaEmail = async (event) => {
  try {
    let result = await utils.sendTickersViaEmail();

    console.log("Chegou aqui 7.");

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: result,
          input: event,
        },
        null,
        2
      ),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: error,
          input: event,
        },
        null,
        2
      ),
    };
  }
};
