def remove_style_tags(head_content):
    start_tag = '<style>'
    end_tag = '</style>'
    while True:
        start = head_content.find(start_tag)
        end = head_content.find(end_tag, start)
        if start == -1 or end == -1:
            break
        head_content = head_content[:start] + head_content[end + len(end_tag):]

    return head_content

# Read the HTML file
file_path = 'rest_api.html'
with open(file_path, 'r') as file:
    html_content = file.read()

# Extract the <head> section
start_head = html_content.find('<head>')
end_head = html_content.find('</head>', start_head)
if start_head != -1 and end_head != -1:
    head_content = html_content[start_head + len('<head>'):end_head]
    cleaned_head = remove_style_tags(head_content)

    # Insert the <link> tag into the <head> section
    link_tag = '<link rel="stylesheet" href="api.css">'
    cleaned_head_with_link = cleaned_head + '\n' + link_tag

    # Update the <title> tag content
    new_title = 'Edgio API Reference'
    cleaned_head_with_title = cleaned_head_with_link.replace('API Reference | ReDoc', new_title)

    # Build the cleaned HTML
    cleaned_html = html_content[:start_head + len('<head>')] + cleaned_head_with_title + html_content[end_head:]

    # Save the modified HTML back to the original file
    with open(file_path, 'w') as file:
        file.write(cleaned_html)

    print("HTML file has been updated.")
else:
    print("No <head> section found in the HTML.")
