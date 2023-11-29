---
title: HtmlTransformer
---

The HtmlTransformer class is an edge function helper class that allows you to modify the HTML response from the origin server. The HtmlTransformer class is a wrapper for the [lol_rewriter::HtmlRewriter Class](https://docs.rs/lol_html/latest/lol_html/struct.HtmlRewriter.html). The HtmlTransformer class is designed to be small and efficient and is compatible with streaming HTML response bodies.

To use the HtmlTransformer create an instance of the class with `new HtmlTransformer(definitions, callback)`, passing in the rewriter `definitions` and the `callback` function for the streaming output. Arriving HTML response data is passed into the HtmlTransformer via the `await htmlTransformer.write(data)` method. The `write()` function can be called multiple times. Once the HTML response is complete the `await htmlTransformer.end()` method must be called to complete the transformation and flush the streaming data.

There are two types of rewriter callback definitions that can be passed into the HtmlTransformer:

* Transformations that match an HTML selector and trigger a callback function when the selector is found.
  * `comment` - Operates on any HTML comments matching the specified selector
  * `element` - Operates on the HTML element and its attributes matching the specified selector
  * `text` - Operates on any text matching the specified selector
* Transformations that trigger the callback function when the HTML document is found (these do not require an HTML selector.)
  * `doc_comment` - Operates on any HTML comments in the document
  * `doc_text` - Operates on any text in the document
  * `doc_type` - Provides read-only information on the HTML document type
  * `doc_end` - Triggered when the end of HTML document is reached

## Example 1: Basics Usage {/* example1 */}

Here is an edge function that uses HtmlTransform to:
  
  * ensure all `<a href="...">` links are HTTPS
  * remove all HTML comments 
  * append a transformation timestamp to the end of the document as a comment

```js
export async function handleHttpRequest(request, context) {
  const transformerDefinitions = [
    // This first definition replaces http with https in the <a href=...> elements
    {
      // This selector will match all <a> elements which have an href attribute
      selector: 'a[href]',
      element: async (el) => {
        const href = el.get_attribute('href')
        el.set_attribute('href', href.replace('http://', 'https://'))
      }
    },

    // This second definition removes all comments from the <body>
    {
      selector: 'body',
      comment: async (c) => {
        // remove the comment
        c.remove()
      }
    },

    // This third definition appends a timestamp to the end of the HTML document
    {
      // Since this operates on the document, there is no need to specify a selector
      doc_end: async (d) => {
        // Use the append() method to append the timestamp to the end of the document
        // Specify 'html' as the second arguemnt to indicate the content is HTML, not plain text
        d.append(`&lt;!-- Transformed at ${new Date().toISOString()} by Edg.io -->`, 'html')
      }
    }
  ]

  // Define the callback function to accept the transformed HTML stream
  let responseBody = ''
  const streamingCallback = (chunk) => {
    responseBody += chunk
  }

  // Create a new HTML transformer, passing in the definitions and streaming callback
  let htmlTransformer = new HtmlTransformer(transformerDefinitions, streamingCallback)

  // Get the HTML from the origin server
  const response = await fetch(request.url, { edgio: { origin: 'api_backend' } })
  const html = await response.text()

  // Write the HTML to the transformer
  await htmlTransformer.write(html)

  // flush the HTML transformer
  await htmlTransformer.end()

  // Return the transformed HTML body
  return new Response(responseBody)
}
```

When this edge function is run and the origin returns the following HTML:

```html
<!DOCTYPE html>
<html>
<head><title>Script Example</title></head>
<body>
  <h1>Script Example</h1>
  <p>Script example.
    &lt;!-- This is a <p> comment -->
  </p>
  <a href="http://edg.io/">Edgio Homepage</a>
  &lt;!-- This is a <body> comment -->
</body>
</html>
```

The transformed HTML has:

* the `http` replaced with `https` in the `<a href="...">` element
* the comments removed from the body
* the timestamp comment appended to the end of the document

```html
<!DOCTYPE html>
<html>
<head><title>Script Example</title></head>
<body>
  <h1>Script Example</h1>
  <p>Script example.
  
  </p >
  <a href="https://edg.io/">Edgio Homepage</a>
  
</body>
</html>&lt;!-- Transformed at 2023-11-29T00:52:09.942Z by Edg.io -->
```


## Example 2: Using fetch() {/* example2 */}

Here is an edge function that uses HtmlTransform to replace all `<esi:include src="..."/>` elements with the content of the specified URL.

```js
export async function handleHttpRequest(request, context) {
  // This definition replaces <esi:include src="..." /> the response from the src
  const transformerDefinitions = [{
    // This selector will match all <esi:include /> elements which have a src attribute.
    // We escape the : character with 2 backslashes to indicate it is part of the tag name
    // and not an attribute of the selector.
    selector: 'esi\\:include[src]',
    element: async (el) => {
      const url = el.get_attribute('src')
      const response = await fetch(url, { edgio: { origin: "api_backend" } })
      if (response.status == 200) {
        const body = await response.text()
        el.replace(body, 'html')
      } else {
        el.replace('<a>We encountered an error, please try again later.</a>', 'html')
      }
    }
  }]

  // Define the callback function to accept the transformed HTML stream
  let responseBody = ''
  const streamingCallback = (chunk) => {
    responseBody += chunk
  }

  // Create a new HTML transformer, passing in the definitions and streaming callback
  let htmlTransformer = new HtmlTransformer(transformerDefinitions, streamingCallback)

  // Get the HTML from the origin server
  const response = await fetch(request.url, { edgio: { origin: 'api_backend' } })
  const html = await response.text()

  // Write the HTML to the transformer
  await htmlTransformer.write(html)

  // flush the HTML transformer
  await htmlTransformer.end()

  // Return the transformed HTML body
  return new Response(responseBody)
}
```

When this edge function is run and the origin returns the following HTML:

```html
<!DOCTYPE html>
<html>
<head><title>Script Example</title></head>
<body>
  <h1>Script Example</h1>
  <esi:include src="https://api.backend.com/body" />
</body>
</html>
```

The transformed HTML has the `<esi:include ... />` replaced with results of the fetch

```html
<!DOCTYPE html>
<html>
<head><title>Script Example</title></head>
<body>
  <h1>Script Example</h1>
  <div>
    <p>Here is some HTML text with a link returned by the fetch().</p >
    <a href="https://edg.io/">Edgio Homepage</a>
  </div>
</body>
</html>
```

## Example 3: Add Body Streaming  {/* example3 */}

This example extends the example above with response body streaming. Streaming is necessary when the whole response body is too large to fit into the edge function memory.

```js
export async function handleHttpRequest(request, context) {
  // This definition replaces <esi:include src="..."/> the response from the src
    const transformerDefinitions = [{
      // This selector will match all <esi:include/> elements with a src attribute.
      // We escape the : character with a backslashes to indicate it is part of the tag name.
      selector: 'esi\\:include[src]',
      element: async (el) => {
        const url = el.get_attribute('src')
        const response = await fetch(url, { edgio: { origin: "api_backend" } })
        if (response.status == 200) {
          const body = await response.text()
          el.replace(body, 'html')
        } else {
          el.replace('<a>We encountered an error, please try again later.</a>', 'html')
        }
      }
    }]

  // Define the callback function to accept the transformed HTML stream
  let responseBody = ''
  const streamingCallback = (chunk) => {
    responseBody += chunk
  }

  // Create a new HTML transformer, passing in the definitions and streaming callback
  let htmlTransformer = new HtmlTransformer(transformerDefinitions, streamingCallback)

  // Get the HTML from the origin server
  const response = await fetch(request.url', { edgio: { origin: "api_backend" } })

  // Write the HTML to the transformer
  await htmlTransformer.write(html)

  // flush the HTML transformer
  await htmlTransformer.end()

  // Return the transformed HTML body
  return new Response(responseBody)
}
```