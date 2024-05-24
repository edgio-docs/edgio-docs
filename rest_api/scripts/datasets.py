import requests
import json
import os

# Define the authentication endpoint and client_id
AUTH_ENDPOINT = "https://id.edgio.app/connect/token"

# Make a POST request to the authentication endpoint to get the access token
auth_response = requests.post(
    AUTH_ENDPOINT,
    data = {
        "client_id": "XXXXXXXX",
        "client_secret": "XXXXXXXXXX",
        "grant_type": "client_credentials",
        "scope": "app.metrics"
    },
    headers={"Content-Type": "application/x-www-form-urlencoded"}
)

# Check if the authentication request was successful
if auth_response.status_code != 200:
    raise Exception(f"Failed to authenticate: {auth_response.status_code} {auth_response.text}")

# Extract the access token from the response
auth_data = auth_response.json()
TOKEN = auth_data.get("access_token")

if not TOKEN:
    raise Exception("Failed to retrieve access token")

# Define the API endpoint
API_ENDPOINT = "https://edgioapis.com/metrics/v1/datasets"

# Fetch the JSON data from the API endpoint with the required headers
headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json"
}
response = requests.get(API_ENDPOINT, headers=headers)
data = response.json()

# Function to generate HTML list items
def generate_html_list(items, title):
    html_list = f"\n**{title}:**\n\n"
    for item in items:
        html_list += f"-   **{item['name']}:** {item['description']}\n"
    return html_list

# Extracting the datasets
datasets = data.get('items', [])

# Generating HTML for each dataset
html_content = ""
output_content = ""
for dataset in datasets:
    name = dataset.get('name', 'Unnamed dataset')
    description = dataset.get('description', '')
    dimensions = dataset.get('dimensions', [])
    metrics = dataset.get('metrics', [])
    filters = dataset.get('filters', [])

    html_content = f"### {name} {{/*{name}*/}} \n\n{description}\n"
    html_content += generate_html_list(dimensions, "Dimensions")
    html_content += generate_html_list(metrics, "Metrics")
    html_content += generate_html_list(filters, "Filters")

    html_content += "\n"

    output_content += html_content

# Define the output file path
output_file_path = "src/templates/datasets.md"
 
# Ensure the directory exists
os.makedirs(os.path.dirname(output_file_path), exist_ok=True)
 
# Write the generated HTML content to the output file
with open(output_file_path, "w") as output_file:
    output_file.write(output_content)
 
print(f"HTML content saved to {output_file_path}")
