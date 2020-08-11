# Serverless API Project

One this project will be created an API with two different methods:

- The first one, a GET, will be responsible for getting the BTC price from different crypto exchanges and calculate the average.
- The second one, a POST, will be responsible for sending an email using **mailgum** with the average price.

## Decisions taken:

1 - Will be used **Serverless Framework** to manage the APIs and the lambda functions on AWS

2 - The crypto exchanges will be configurable, so there, adding new crypto exchanges to config file it will be able to get an average from more exchanges.

## Code Structure:

The code will be structured as followed:

- src
  - config
    - crypt_exchanges.json
  - lambda_functions
    - cryptocurrency
      - handler.js
      - utils.js
    - email
      - handler.js
      - utils.js
  - serverless.yml
  - test

### **Config:**

Config directory will be responsible for holding all configuration. For now, the only existing configuration is the crypt_exchanges.json, that contains the information needed to get BTC price.

### **Lambda_functions:**

Lambda functions folder, will be responsible for holding the code present on lambda function. The code is separated by crytocurrency interactions and email interactions. Inside each folder, there is a handler.js and an utils.js. The handler contains the main function as simple as possible while the utils will contain the business logic.

### **Serverless.yml:**

Serverless.yml is the file responsible for API and lambda function management on AWS.

### **Test:**

Test directory contains the unit tests. It follow an structure similar to lambda functions folder.

## Deploying:

## Using:
