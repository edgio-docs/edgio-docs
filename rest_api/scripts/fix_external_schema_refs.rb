# frozen_string_literal: true

require 'json'
require 'pry'

console_swagger_path = 'tmp/console_swagger.json'
external_schema_ref_key = 'x-externalSchemaRef'
external_schemas_path_relative_from_openapi_schemas = '../../'

swagger_schema = JSON.parse(File.read(console_swagger_path))

swagger_schema['definitions'].each do |_k, v|
  next unless v.key?('properties')

  v['properties'].each do |_property_name, property_definition|
    if property_definition.key?(external_schema_ref_key)
      external_schema_pointer = property_definition[external_schema_ref_key]
      property_definition.replace(
        {
          '$ref' => Pathname.new(external_schemas_path_relative_from_openapi_schemas).join(external_schema_pointer).to_s
        }
      )
    end

    item_additional_properties = property_definition.dig('items', 'additionalProperties')
    next unless item_additional_properties&.key?(external_schema_ref_key)

    external_schema_pointer = item_additional_properties[external_schema_ref_key]
    property_definition.replace(
      {
        '$ref' => Pathname.new(external_schemas_path_relative_from_openapi_schemas).join(external_schema_pointer).to_s
      }
    )
  end
end

File.open(console_swagger_path, 'w') do |f|
  f.puts(swagger_schema.to_json)
end

# Normalize for better diffing, all the subshell dance is due to modifying the
# file in place
`(rm -f #{console_swagger_path} && jq > #{console_swagger_path}) < #{console_swagger_path}`
