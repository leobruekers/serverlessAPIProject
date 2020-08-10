"use strict";

module.exports.sendTickersViaEmail = async (event) => {
  // TODO:
  // - call get tickers function
  // - send email

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "sendTickersViaEmail called successfully",
        input: event,
      },
      null,
      2
    ),
  };
};
