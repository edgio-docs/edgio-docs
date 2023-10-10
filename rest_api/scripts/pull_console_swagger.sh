#!/bin/sh

# Dev / Sandbox
# curl https://api.edgio-dev.app/api/swagger_doc -o tmp/console_swagger.json
# Stage
# curl https://api.edgio-stage.app/api/swagger_doc -o tmp/console_swagger.json

# Production
curl https://api.edgio.app/api/swagger_doc -o tmp/console_swagger.json
