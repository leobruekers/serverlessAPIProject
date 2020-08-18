#!/usr/bin/env bash

jest
echo "Mailgun API Key: $1"
echo "Mailgun Domain: $2"
if [ "$1" != "-not_update" ]; then
    echo "running aws ssm put-parameter --name mailgun_api_key --value $1 --type String --overwrite"
    aws ssm put-parameter --name mailgun_api_key --value $1 --type String --overwrite
fi
if [ "$2" != "-not_update" ]; then
    echo "running aws ssm put-parameter --name mailgun_domain --value $2 --type String --overwrite"
    aws ssm put-parameter --name mailgun_domain --value $2 --type String --overwrite
fi
if [ "$3" = "-r" ]; then
    echo "$3 argument settled to remove stack from AWS first."
    serverless remove -v
fi

serverless deploy -v