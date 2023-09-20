# frozen_string_literal: true

require 'json'
# require 'pry'

console_openapi_path = 'tmp/console_oapi3.json'
external_schema_ref_key = 'x-externalSchemaRef'
external_schemas_path_relative_from_openapi_schemas = '../../'

oapi_schema = JSON.parse(File.read(console_openapi_path))

# Here's where the schemas live
oapi_schema['components']['schemas'].each do |_k, v|
  next unless v.key?('properties')

  v['properties'].each do |_property_name, property_definition|
    next unless property_definition.key?(external_schema_ref_key)

    external_schema_pointer = property_definition[external_schema_ref_key]
    property_definition.replace(
      {
        '$ref' => Pathname.new(external_schemas_path_relative_from_openapi_schemas).join(external_schema_pointer).to_s
      }
    )
  end
end

File.open(console_openapi_path, 'w') do |f|
  f.puts(oapi_schema.to_json)
end

# Normalize for better diffing, all the subshell dance is due to modifying the
# file in place
`(rm -f #{console_openapi_path} && jq > #{console_openapi_path}) < #{console_openapi_path}`
