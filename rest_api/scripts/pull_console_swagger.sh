#!/bin/sh

# Local dev
# curl http://localhost:3000/api/swagger_doc | jq > tmp/console_swagger.json
# Dev / Sandbox
# curl https://api.edgio-dev.app/api/swagger_doc | jq > tmp/console_swagger.json
# Stage
# curl https://api.edgio-stage.app/api/swagger_doc | jq > tmp/console_swagger.json

# Production
curl https://api.edgio.app/api/swagger_doc | jq > tmp/console_swagger.json
