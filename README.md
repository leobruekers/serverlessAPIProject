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
  - infra
    - deploy.sh
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

### **Infra:**

Infra directory will be responsible for holding the scripts related to infrastructure. For now, it only contains the script to deploy SSM parameters and the service.

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
- Create a config file to customize the email text and subject.

## Testing:

- Clone the project: **git clone https://github.com/leobruekers/serverlessAPIProject.git**
- run: **npm test**

## Deploying:

- Clone the project: **git clone https://github.com/leobruekers/serverlessAPIProject.git**
- Follow the tutorial to install and configure serverless: **https://www.serverless.com/framework/docs/getting-started/**
- Install and configure AWS as sollowing:
  - AWS config file:
    ```
    [default]
    region=us-east-1
    output=json
    ```
  - AWS credentials file:
    ```
    [default]
    aws_access_key_id=<YOUR_AWS_ACCESS_KEY>
    aws_secret_access_key=<YOUR_AWS_SECRET_ACCESS_KEY>
    ```
- run: **npm run deploy -- <YOUR_MAILGUN_API_KEY> <YOUR_MAILGUN_DOMAIN> \[-r\]**

  ** If you don't want to update your SSM variables you can pass **-not_update** instead of a value. i.e. **npm run deploy -- -not_update -not_update\*\*

  ** If you pass the flag '-r', the command **serverless remove\*\* will be run before serverless deploy. It will recreate all AWS stack, including the endpoints.

**PS: Ensure that you are using the same aws_region on your serverless.yml file and on your AWS config file**

## Using:

- After deploying, serverless will show the application endpoints to use.
