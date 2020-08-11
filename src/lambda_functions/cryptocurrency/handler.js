const utils = require("./utils");

module.exports.getAverageTickers = async (event, context, callback) => {
  try {
    let tickersAverage = await utils.getTickersAverage();

    callback(null, {
      statusCode: 200,
      body: tickersAverage,
    });
  } catch (error) {
    callback(null, {
      statusCode: 500,
      body: null,
    });
  }
};
