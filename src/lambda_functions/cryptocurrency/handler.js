"use strict";

module.exports.getAverageTickers = async (event) => {
  // TODO: write the code to get average tickers

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "getAverageTickers called successfully",
        input: event,
      },
      null,
      2
    ),
  };
};
