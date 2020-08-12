"use strict";
const utils = require("./utils");

module.exports.getAverageTickers = async (event, context) => {
  try {
    const tickersAverage = await utils.getTickersAverage();

    const response = {
      statusCode: 200,
      body: JSON.stringify({ price: tickersAverage }),
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
