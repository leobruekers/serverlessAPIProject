#!/usr/bin/env bash

echo "Mailgun API Key: $1"
echo "Mailgun Domain: $2"
echo "running aws ssm put-parameter --name mailgun_api_key --value $1 --type String --overwrite"
aws ssm put-parameter --name mailgun_api_key --value $1 --type String --overwrite
echo "running aws ssm put-parameter --name mailgun_domain --value $2 --type String --overwrite"
aws ssm put-parameter --name mailgun_domain --value $2 --type String --overwrite

serverless deploy -v