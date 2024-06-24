import requests
import os
import pandas as pd

# Retrieve EC token from environment variables
ECTOKEN = os.getenv('EC_TOKEN')

# Define the API endpoint
API_ENDPOINT = "https://api.edgecast.com/v2/mcc/customers/93B9A/edgenodes"

# Fetch the JSON data from the API endpoint with the required headers
headers = {
    "Authorization": f"TOK:{ECTOKEN}",
    "Accept": "application/json",
    "Content-Type": "application/json"
}
response = requests.get(API_ENDPOINT, headers=headers)
data = response.json()

# Check if data is a list of dictionaries
if isinstance(data, list):
    # Extract relevant information and process it
    table_data = []
    for item in data:
        code = item.get("Code", "")  # Adjust field name if necessary
        city = item.get("City", "")  # Adjust field name if necessary
        region = item.get("Continent", "")  # Adjust field name if necessary
        table_data.append({
            "Code": code,
            "City": city,
            "Continent": region
        })

    # Convert to DataFrame for sorting and Markdown generation
    df = pd.DataFrame(table_data)

    # Sort DataFrame by 'Code' column
    df.sort_values(by="Code", inplace=True)

    # Generate Markdown table in the specified format
    markdown_table = "| Code | City | Continent |\n"
    markdown_table += "|------|------|-----------|\n"
    for index, row in df.iterrows():
        markdown_table += f"| {row['Code']} | {row['City']} | {row['Continent']} |\n"

    # Define the output file path
    output_file_path = "src/templates/pops.md"

    # Ensure the directory exists
    os.makedirs(os.path.dirname(output_file_path), exist_ok=True)

    try:
        # Write the generated Markdown content to the output file
        with open(output_file_path, "w") as output_file:
            output_file.write(markdown_table)
        
        # Print the success message only if the file was written successfully
        print(f"POPs saved to {output_file_path}")

    except Exception as e:
        # Handle the exception if any error occurs
        print(f"Failed to save POPs to {output_file_path}: {e}")

else:
    print("Unexpected API response format. Expected a list of dictionaries.")