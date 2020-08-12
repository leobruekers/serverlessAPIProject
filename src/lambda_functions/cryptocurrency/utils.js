"use strict";
const fs = require("fs");
const fetch = require("node-fetch");

module.exports.getTickersAverage = async function (
  directory = "./src/config/crypt_exchanges.json"
) {
  const crypt_exchanges = await getCryptExchanges(directory);
  const promises = crypt_exchanges.exchanges.map(
    async (exchange) => await resolveExchange(exchange)
  );
  const result = await Promise.all(promises);
  let sum = 0;
  console.log(result);
  result.forEach((res) => (sum += res));
  console.log(`Number of exchanges: ${result.length}. Sum of values: ${sum}`);
  const averagePrice = sum / result.length;
  console.log(`Average price: ${averagePrice}`);
  return averagePrice;
};

async function getCryptExchanges(directory) {
  try {
    const crypt_exchanges = await JSON.parse(fs.readFileSync(directory));
    console.log(`Crypt exchanges config file: ${crypt_exchanges}`);
    return crypt_exchanges;
  } catch (error) {
    console.log("Error while getting exchanges from config file.");
    console.log(error);
  }
}

async function resolveExchange(exchange) {
  try {
    const response = await fetch(exchange.url, { headers: exchange.headers });
    console.log(`Fetch response for ${exchange.url}:`);
    console.log(response);
    let result = await response.json();
    console.log(`JSON result for ${exchange.url}:`);
    console.log(result);
    exchange.field.split("##").forEach((field) => {
      result = result[field];
    });
    console.log(result);
    return parseFloat(result);
  } catch (error) {
    console.log(`Error while resolving exchange ${exchange.url}`);
    console.log(error);
  }
}
