"use strict";
const aws_services = require("../../utils/aws_services");
const fetch = require("node-fetch");

module.exports.sendTickersViaEmail = async function () {
  let averagePrice = await aws_services.callLambdaFunction(
    process.env.GET_AVERAGE_TICKER_FN_NAME2
  );
  let price = JSON.parse(JSON.parse(averagePrice["Payload"])["body"])["price"];
  console.log(price);

  var api_key = process.env.MAILGUN_API_KEY;
  var domain = process.env.MAILGUN_DOMAIN;
  var sender = process.env.SENDER;
  var recipients = process.env.RECIPIENTS;
  var subject = process.env.SUBJECT;
  var text =
    process.env.TEXT != null
      ? process.env.TEXT.toString().replace("##price##", price.toString())
      : null;

  let result = await sendEmail(
    api_key,
    domain,
    sender,
    recipients,
    subject,
    text
  );
  return { price, result };
};

async function sendEmail(
  api_key = "d56fb7f21015124aa70e65a093389faf-07e45e2a-9a7919ee",
  domain = "sandbox9c37befddffb4b4f816031a1996a2578.mailgun.org",
  sender = "Leo <leobruekers@gmail.com>",
  recipients = "leobruekers@gmail.com",
  subject = "BTC average price",
  text = "Base text"
) {
  var mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });

  console.log(mailgun);

  var data = {
    from: sender,
    to: recipients,
    subject: subject,
    text: text,
  };

  console.log(data);

  return new Promise(function (resolve, reject) {
    mailgun.messages().send(data, function (error, body) {
      if (body) {
        console.log(body);
        resolve(body);
      } else if (error) {
        reject(error);
      }
    });
  });
}
