# frozen_string_literal: true

require 'yaml'
require 'pathname'
require 'pry'

openapi_path = 'openapi/openapi.yaml'
console_openapi_path = 'tmp/split/openapi.yaml'
console_path_path = 'paths/console/'
console_tag_group_name = 'console'

openapi = YAML.load_file(openapi_path)
console_openapi = YAML.load_file(console_openapi_path)

console_openapi['tags'].each do |tag|
  next if openapi['tags'].find do |t|
    t['name'] == tag['name']
  end

  openapi['tags'] << tag
end

console_openapi['paths'].each do |k, v|
  next if openapi['paths'][k]

  openapi['paths'][k] = v

  # We could place APIs in their own folder, but will have to rewrite the
  # relative paths for the component references
  # pathname = Pathname(v['$ref'])
  # openapi['paths'][k] = { '$ref' => (Pathname(console_path_path) + pathname.basename).to_s }
end

console_tag_group = openapi['x-tagGroups'].find do |tag_group|
  tag_group['name'] == console_tag_group_name
end || (openapi['x-tagGroups'] << { 'name' => console_tag_group_name }).last

console_openapi['tags'].each do |tag|
  tag_group_tags = console_tag_group['tags'] ||= []

  next if tag_group_tags.include?(tag['name'])

  tag_group_tags << tag['name']
end

File.open(openapi_path, 'w') do |f|
  f.puts(openapi.to_yaml)
end
