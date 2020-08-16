"use strict";
const AWSServices = require("../../utils/aws_services");
const fetch = require("node-fetch");

module.exports.sendTickersViaEmail = async function () {
  const region = process.env.AWS_REGION;
  console.log(region);
  const awsServices = new AWSServices(region);
  console.log("Aqui");
  console.log(awsServices);
  const averagePrice = await awsServices.callLambdaFunction(
    process.env.GET_AVERAGE_TICKER_FN_NAME
  );
  try {
    const price = JSON.parse(JSON.parse(averagePrice["Payload"])["body"])[
      "price"
    ];
    console.log(price);

    const api_key = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN;
    const sender = process.env.SENDER;
    const recipients = process.env.RECIPIENTS;
    const subject = process.env.SUBJECT;
    const text =
      process.env.TEXT != null
        ? process.env.TEXT.toString().replace("##price##", price.toString())
        : null;

    const result = await sendEmail(
      api_key,
      domain,
      sender,
      recipients,
      subject,
      text
    );
    return { price, result };
  } catch (error) {
    console.log("Error while running send email core.");
    console.log(error);
  }
};

async function sendEmail(
  api_key = "d56fb7f21015124aa70e65a093389faf-07e45e2a-9a7919ee",
  domain = "sandbox9c37befddffb4b4f816031a1996a2578.mailgun.org",
  sender = "Leo <leobruekers@gmail.com>",
  recipients = "leobruekers@gmail.com",
  subject = "BTC average price",
  text = "Base text"
) {
  try {
    const mailgun = require("mailgun-js")({ apiKey: api_key, domain: domain });
    console.log(mailgun);
    const data = {
      from: sender,
      to: recipients,
      subject: subject,
      text: text,
    };
    console.log(data);
    return new Promise((resolve, reject) => {
      mailgun.messages().send(data, (error, body) => {
        if (body) {
          console.log(body);
          resolve(body);
        } else if (error) {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.log("Error while sending email with mailgun");
    console.log(error);
  }
}
