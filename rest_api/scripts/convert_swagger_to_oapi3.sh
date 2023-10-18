#!/bin/sh
# See API docs for conversion here: https://converter.swagger.io/#/Converter/convertByContent

curl -H "Content-Type: application/json" \
     -X POST https://converter.swagger.io/api/convert \
     -d @tmp/console_swagger.json \
     | jq > tmp/console_oapi3.json
