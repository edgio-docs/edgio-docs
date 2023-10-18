# frozen_string_literal: true

require 'json'
require 'pry'

console_openapi_path = 'tmp/console_oapi3.json'
oapi_schema = JSON.parse(File.read(console_openapi_path))

# Here's where the schemas live
oapi_schema['components']['schemas'].each do |_k, v|
  next unless v.key?('properties')

  v['properties'].each do |_property_name, property_definition|
    description = property_definition['description']

    next unless description && description =~ /Defined externally:\s*(\S+)/i

    external_schema_uri = Regexp.last_match(1)
    property_definition.replace({ '$ref' => external_schema_uri })
  end
end

File.open(console_openapi_path, 'w') do |f|
  f.puts(oapi_schema.to_json)
end

# Normalize for better diffing, all the subshell dance is due to modifying the
# file in place
`(rm -f #{console_openapi_path} && jq > #{console_openapi_path}) < #{console_openapi_path}`
