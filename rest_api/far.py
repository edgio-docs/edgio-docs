import re

# Define a dictionary of replacements
replacements = {
    r'/%7B(.*?)%7D': r'/{\1}',  # Replace /%7BVALUE%7D with {VALUE}
    r'Node\s*\+\s*Request': r'Node',      # Replace Node + Request with Node
    r'Javascript\s*\+\s*Xhr': r'JavaScript',  # Replace Javascript + Xhr with JavaScript
    r'Shell\s*\+\s*Curl': r'curl',         # Replace Shell + Curl with curl
    r'com\/\/': r'com/',         # Replace com// with com/
    r'\"\/\/': r'"/',         # Replace com// with com/
    r'Python\s*\+\s*Python3': r'Python3'   # Replace Python + Python3 with Python3
}

# Function to replace occurrences and write back to the file
def replace_and_write(input_file_path, output_file_path):
    try:
        with open(input_file_path, 'r') as input_file:
            content = input_file.read()
            # Perform all replacements defined in the dictionary
            for pattern, replacement in replacements.items():
                content = re.sub(pattern, replacement, content)
        
        with open(output_file_path, 'w') as output_file:
            output_file.write(content)
        
        print(f"Replacements completed and saved to {output_file_path}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Input and output file paths
input_file_path = "rest_api.html"  # Replace with your input file path
output_file_path = "rest_api_with_examples.html"  # Replace with your output file path

# Call the function to replace occurrences and write to the output file
replace_and_write(input_file_path, output_file_path)

