# frozen_string_literal: true

require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'

  gem 'pry'
end

require 'cgi'
require 'uri'
require 'net/http'

api_docs_url = ENV.fetch('API_DOCS_SOURCE_URL', 'https://api.edgio.app/api/swagger_doc')
encoded_api_docs_url = CGI.escape(api_docs_url)

uri = URI("https://converter.swagger.io/api/convert?url=#{encoded_api_docs_url}")
res = Net::HTTP.get_response(uri)

if res.is_a?(Net::HTTPSuccess)
  File.open('./tmp/console_oapi3.json', 'w') do |f|
    f.puts res.body
  end
end
