"use strict";
const fs = require("fs");
const fetch = require("node-fetch");

module.exports.getTickersAverage = async function (
  directory = "./src/config/crypt_exchanges.json"
) {
  let crypt_exchanges = await getCryptExchanges(directory);
  const promises = crypt_exchanges.exchanges.map(
    async (exchange) => await resolveExchange(exchange)
  );
  let result = await Promise.all(promises);
  let sum = 0;
  result.forEach((res) => (sum += res));
  console.log(`Number of exchanges: ${result.length}. Sum of values: ${sum}`);
  let averagePrice = sum / result.length;
  console.log(`Average price: ${averagePrice}`);
  return averagePrice;
};

async function getCryptExchanges(directory) {
  let crypt_exchanges = await JSON.parse(fs.readFileSync(directory));
  console.log(`Crypt exchanges config file: ${crypt_exchanges}`);
  return crypt_exchanges;
}

async function resolveExchange(exchange) {
  let response = await fetch(exchange.url, { headers: exchange.headers });
  console.log(`Fetch response for ${exchange.url}: ${response}`);
  let result = await response.json();
  console.log(`JSON result for ${exchange.url}: ${result}`);
  exchange.field.split("##").forEach((field) => {
    result = result[field];
  });
  return parseFloat(result);
}
