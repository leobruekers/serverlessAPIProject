"use strict";
const AWSServices = require("../../utils/aws_services");
const fetch = require("node-fetch");

module.exports.sendTickersViaEmail = async function () {
  const region = process.env.AWS_REGION;
  console.log(region);
  const awsServices = new AWSServices(region);
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
    console.log("Mailgun API Key: " + api_key);
    const domain = process.env.MAILGUN_DOMAIN;
    console.log("Mailgun Domain: " + domain);
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
  api_key = isRequired("The api_key is required to send email."),
  domain = isRequired("The domain is required to send email."),
  sender = isRequired("The sender is required to send email."),
  recipients = isRequired("At least one recipients is required to send email."),
  subject = "",
  text = ""
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

function isRequired(message) {
  console.log(message);
  throw Error("Required value not found.");
}
