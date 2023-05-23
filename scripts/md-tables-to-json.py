import os
import re
import json

def markdown_table_to_json(md_table):
    lines = md_table.strip().split('\n')
    header = re.split(r'\s*\|\s*', lines[1])
    rows = {}

    for line in lines[2:]:
        values = re.split(r'\s*\|\s*', line)
        if len(values) == len(header):
            url_value = values[1].lower().replace(' ', '-')
            row_data = {
                'description': values[2],
                'url': 'https://docs.edg.io/guides/performance/observability/edge_insights#' + url_value
            }
            rows[values[1]] = row_data

    return json.dumps(rows)

# Define the source folder path
source_folder = '../src/templates'

# Define the output folder path
output_folder = '../artifacts/json'
os.makedirs(output_folder, exist_ok=True)

# Iterate over files in the source folder
for filename in os.listdir(source_folder):
    source_file = os.path.join(source_folder, filename)
    if os.path.isfile(source_file) and filename.startswith('table_') and filename.endswith('.md'):
        # Read Markdown table from the file
        with open(source_file, 'r') as f:
            markdown_table = f.read()

        # Convert Markdown table to JSON
        json_output = markdown_table_to_json(markdown_table)

        # Define the output file path
        output_file = os.path.join(output_folder, os.path.splitext(filename)[0] + '.json')

        # Write the resulting JSON document to the output file
        with open(output_file, 'w') as f:
            f.write(json_output)

        print("Output JSON file created:", output_file)

