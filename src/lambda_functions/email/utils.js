"use strict";
const aws_services = require("../../utils/aws_services");
const fetch = require("node-fetch");

module.exports.sendTickersViaEmail = async function () {
  let averagePrice2 = await aws_services.callLambdaFunction(
    process.env.GET_AVERAGE_TICKER_FN_NAME2
  );
  console.log("LOG1 " + averagePrice2);
  let a = averagePrice2["Payload"];
  console.log(a);

  // let a = JSON.parse(averagePrice2);
  // console.log(a);
  // let m = JSON.parse(a).message;
  // console.log(m);

  let averagePrice = await fetch(process.env.GET_AVERAGE_TICKER_FN_NAME);
  console.log(averagePrice);

  var api_key = process.env.MAILGUN_API_KEY;
  var domain = process.env.MAILGUN_DOMAIN;
  var sender = process.env.SENDER;
  var recipients = process.env.RECIPIENTS;
  var subject = process.env.SUBJECT;
  var text =
    process.env.TEXT != null
      ? process.env.TEXT.toString().replace(
          "##price##",
          averagePrice.toString()
        )
      : null;

  //sendEmail();
  return averagePrice;
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

  let result = await mailgun.messages().send(data, function (error, body) {
    if (error) {
      console.log(error);
      return error;
    } else {
      console.log(body);
      return body;
    }
  });
  console.log(result);
}
