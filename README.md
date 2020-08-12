# Serverless API Project

One this project will be created an API with two different methods:

- The first one, a GET, will be responsible for getting the BTC price from different crypto exchanges and calculate the average.
- The second one, a POST, will be responsible for sending an email using **mailgum** with the average price.

## Decisions taken:

1 - Will be used **Serverless Framework** to manage the APIs and the lambda functions on AWS

2 - The crypto exchanges will be configurable, so there, adding new crypto exchanges to config file it will be able to get an average from more exchanges.

3 - Instead of calling API Gateway, the POST endpoint will call directly getAverageTickers lambda function, to gain in secutiry and performance.

## Code Structure:

The code will be structured as followed:

- src
  - config
    - crypt_exchanges.json
  - lambda_functions
    - cryptocurrency
      - handler.js
      - utils.js
      - utils.test.js
    - email
      - handler.js
      - utils.js
      - utils.test.js
  - serverless.yml
  - util
    - aws_services

### **Config:**

Config directory will be responsible for holding all configuration. For now, the only existing configuration is the crypt_exchanges.json, that contains the information needed to get BTC price.

### **Lambda_functions:**

Lambda functions folder, will be responsible for holding the code present on lambda function. The code is separated by crytocurrency interactions and email interactions. Inside each folder, there is a handler.js and an utils.js. The handler contains the main function as simple as possible while the utils will contain the business logic. Besides of this two scripts there is also a utils.test script for testing porpouses.

### **Utils:**

The utils folder stands for utilities. For now, the only utility present is aws_services, that is the script responsible for using aws services.

### **Serverless.yml:**

Serverless.yml is the file responsible for API and lambda function management on AWS.

## Backlog

- Define architecture changes.
- Move configuration to Parameter Store.
  - configuration file path.
  - Parameters from Mailgun.
- Investigate if serverless allows to configure the files to be pushed to lambda function in order to avoid heavy ones.
- Move customization for emailing to guarantee easier access.
- Remove AWS configuration from aws_services.
- Write more tests.

## Deploying:

- Clone the project: **git clone https://github.com/leobruekers/serverlessAPIProject.git**
- Follow the tutorial to install and configure serverless: **https://www.serverless.com/framework/docs/getting-started/**
- run: **npm test** and download the required libraries
- run **serverless deploy**

## Using:

- After deploying, serverless will show the application endpoints to use.
