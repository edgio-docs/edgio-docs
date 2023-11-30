---
title: HtmlTransformer
---

The HtmlTransformer class is an edge function helper class that allows you to modify the HTML response from the origin server. The HtmlTransformer class is a wrapper for the Rust crate [lol_html::HtmlRewriter Class](https://docs.rs/lol_html/latest/lol_html/struct.HtmlRewriter.html). The HtmlTransformer class is designed to be small and efficient and is compatible with streaming HTML response bodies.

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

## Quick Start Examples {/* quickstart */}

### Example 1: Basics Usage {/* example1 */}

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

  // Flush the HTML transformer
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


### Example 2: Using fetch() {/* example2 */}

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

  // Flush the HTML transformer
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

### Example 3: Add Body Streaming  {/* example3 */}

This example extends the example above with response body streaming. Streaming is necessary when the whole response body is too large to fit into the edge function memory.

```js
export async function handleHttpRequest(request, context) {
  // HtmlTransformer definition to replace esi:include tags with the content of the src attributes
  const transformerDefinitions = [{
    selector: 'esi\\:include[src]',
    element: async (el) => {
      const url = el.getAttribute('src')
      const esiResponse = await fetch(url, { edgio: { origin: "origin_server" } })
      if (esiResponse.status == 200) {
        const body = await esiResponse.text()
        el.replace(body, 'html')
      } else {
        el.replace(`<a>We encountered an error ${esiResponse.status}, please try again later.</a>`, 'html')
      }
      el.replace(body)
    }
  }]

  // Fetch the originResponse and wrap its body stream in an html transformer stream.
  const transformerStream = fetch(request.url, { edgio: { origin: "origin_server" } })
    .then((originResponse) => {
      const originResponseReader = originResponse.body.getReader()
      return new ReadableStream({
        start(originResponseController) {
          const textDecoder = new TextDecoder()
          const htmlTransformer = new HtmlTransformer(transformerDefinitions, (chunk) => {
              // Enqueue each transformed chunk to the transformer stream
              originResponseController.enqueue(chunk)
          })
          return pump()
          function pump() {
            return originResponseReader.read().then(({ done, value }) => {
              if (value && value.length) {
                // Decode and enqueue the next chunk from the origin stream to the html transformer stream
                htmlTransformer.write(textDecoder.decode(value))
              }
              if (done) {
                // When originResponseReader reaches the end of the stream,
                // flush the htmlTransformer stream and the originResponseController.
                htmlTransformer.end()
                originResponseController.close()
                return
              }
              return pump()
            })
          }
        }
      })
    })

  // Return the transformed HTML body as a stream
  return new Response(await transformerStream)
}
```

## HtmlTransformer Class {/* class */}

### new  {/* new */}
`const htmlTransformer = new HtmlTransformer(transformerDefinitions, callback)`

Creates a new HtmlTransformer instance. The `transformerDefinitions` is an array of [transformer definitions](#definitions). The `callback` is the function `(chunk) => { ... }` that receives the transformed HTML data chunks.

### write(chunk) {/* write */}
`htmlTransformer.write(chunk)`

Writes the HTML chunk to the transformer stream. This function can be called multiple times.

### end() {/* end */}
`htmlTransformer.end()`

Flushes the transformer and completes the transformation. This function must be called after the last call to `htmlTransformer.write()`.

## Definitions {/* definitions */}

The HtmlTransformer definitions are an array of objects that define the transformations performed on the HTML stream. These definition objects can contain one selector and one asynchronous callback:
* `selector:` - A string defining the HTML selector to match. (See [Selectors](#selectors))
* `comment:` - The `async (Comment) => { }` function called when an HTML [comment](#comment) is found matching the selector.
* `element:` - The `async (Element) => { }` function called when an HTML [element](#element) is found matching the selector.
* `text:` - The `async (Text) => { }` function called when [text](#text) is found matching the selector.

These definition objects contain one callback that is not associated with a selector:
* `doc_comment:` - The `async (Comment) => { }` function called when an HTML [comment](#comment) is found in the document.
* `doc_text:` - The `async (Text) => { }` function called when [text](#text) is found in the document.
* `doc_type:` - The `async (Doctype) => { }` function called when the HTML [document type](#doctype) is found in the document.
* `doc_end:`- The `async (DocEnd) => { }` function called when the [end](#doc_end) of the HTML document is reached.


### Selectors {/* selectors */}

The HtmlTransformer supports the following selector types: (ref: [lol_html::Selector ](https://docs.rs/lol_html/latest/lol_html/struct.Selector.html#supported-selector))

|Pattern|Represents|
|------------------|----------------------------------------------|
|`*`|any element|
|`E`|any element of type `E`| 
|`E:nth-child(n)`|an `E` element, the n-th child of its parent|
|`E:first-child`|an `E` element, first child of its parent|
|`E:nth-of-type(n)`|an `E` element, the n-th sibling of its type|
|`E:first-of-type`|an `E` element, first sibling of its type|
|`E:not(s)`|an `E` element that does not match either compound selector `s`|
|`E.warning`|an `E` element belonging to the class warning|
|`E#myid`|an 1 element with ID equal to `myid`|
|`E[foo]`|an `E` element with a `foo` attribute|
|`E[foo="bar"]`|an `E` element whose `foo` attribute value is exactly equal to `bar`|
|`E[foo="bar" i]`|an `E` element whose `foo` attribute value is exactly equal to any (ASCII-range) case-permutation of `bar`|
|`E[foo="bar" s]`|an `E` element whose `foo` attribute value is exactly and case-sensitively equal to `bar`|
|`E[foo~="bar"]`|an `E` element whose `foo` attribute value is a list of whitespace-separated values, one of which is exactly equal to `bar`|
|`E[foo^="bar"]`|an `E` element whose `foo` attribute value begins exactly with the string `bar`|
|`E[foo$="bar"]`|an `E` element whose `foo` attribute value ends exactly with the string `bar`|
|`E[foo*="bar"]`|an `E` element whose `foo` attribute value contains the substring `bar`|
|`E[foo\|="en"]`|an `E` element whose `foo` attribute value is a hyphen-separated list of values beginning with `en`|
|`E F`|an `F` element descendant of an `E` element|
|`E > F`|an `F` element child of an `E` element|

**Note:** If the E selector has special characters in it, they can be escaped with a double backslash. For example, to match `<esi:include src="...">` use the selector `esi\\:include[src]`.

## Classes {/* classes */}

### Comment Class {/* comment */}

The Comment class is passed to the callback function for `comment:` and `doc_comment:` definitions. 
([ref: lol_html::html_content::Comment](https://docs.rs/lol_html/latest/lol_html/html_content/struct.Comment.html))
The Comment class has the following methods:

|Method|Description|
|------------------|----------------------------------------------|
|`text(): string`|Returns the comment text|
|`set_text(text: string)`|Sets the comment text|
|`before(text: string, content_type: string)`|Inserts the text before the comment. Content type is ['html' or 'text'](#content_types)|
|`after(text: string, content_type: string)`|Inserts the text after the comment. Content type is ['html' or 'text'](#content_types)|
|`replace(text: string, content_type: string)`|Replaces the comment with the text. Content type is ['html' or 'text'](#content_types)|
|`remove()`|Removes the entire comment|
|`removed(): boolean`|Returns true if the comment has been removed|

### Element Class {/* element */}

The Element class is passed to the callback function for `element:` definitions.
([ref: lol_html::html_content::Element](https://docs.rs/lol_html/latest/lol_html/html_content/struct.Element.html))
The Element class has the following methods:

|Method|Description|
|------------------|----------------------------------------------|
|`tag_name(): string`|Returns the tag name of the element|
|`tag_name_preserve_case(): string`|Returns the tag name of the element, preserving the case of the original tag name|
|`set_tag_name(name: string)`|Sets the tag name of the element. Returns an error if the tag name is invalid.|
|`is_self_closing(): boolean`|Returns true if the element is self closing. E.g. `<foo />`|
|`can_have_content(): boolean`|Returns true if the element can have content|
|`namespace_uri(): string`|Returns the namespace URI of the element|
|`attributes(): [Attributes]`|Returns an array of [Attribute](#attribute) objects|
|`get_attribute(name: string): string`|Returns the value of the attribute with the specified name|
|`has_attribute(name: string): boolean`|Returns true if the element has an attribute with the specified name|
|`set_attribute(name: string, value)`|Sets the value of the attribute with the specified name. Returns an error if the attribute name is invalid.|
|`remove_attribute(name: string)`|Removes the attribute with the specified name|
|`before(text: string, content_type: string)`|Inserts the text before the element. Content type is ['html' or 'text'](#content_types)|
|`after(text: string, content_type: string)`|Inserts the text after the element. Content type is ['html' or 'text'](#content_types)|
|`prepend(text: string, content_type: string)`|Prepends the text to the element. Content type is ['html' or 'text'](#content_types)|
|`append(text: string, content_type: string)`|Appends the text to the element. Content type is ['html' or 'text'](#content_types)|
|`set_inner_content(text: string, content_type: string)`|Sets the inner content of the element. Content type is ['html' or 'text'](#content_types)|
|`replace(text: string, content_type: string)`|Replaces the element with the text. Content type is ['html' or 'text'](#content_types)|
|`remove()`|Removes the entire element|
|`remove_and_keep_content()`|Removes the element and keeps its content|
|`removed(): boolean`|Returns true if the element has been removed|
|`start_tag(): StartTag`|Returns the [StartTag](#start_tag) object for the element|
|`end_tag_handlers()`|Not implemented|


### Text Class {/* text */}

The Text class is passed to the callback function for `text:` and `doc_text:` definitions.
([ref: lol_html::html_content::TextChunk](https://docs.rs/lol_html/latest/lol_html/html_content/struct.TextChunk.html))
The Text class has the following methods:

|Method|Description|
|------------------|----------------------------------------------|
|`as_str(): string`|Returns the text|
|`set_text(text: string)`|Sets the text|
|`text_type(): string`|Returns the text type.
|`last_text_in_node(): boolean`|Returns true if the chunk is last in a HTML text node.|
|`before(text: string, content_type: string)`|Inserts the text before the text chunk. Content type is ['html' or 'text'](#content_types)|
|`after(text: string, content_type: string)`|Inserts the text after the text chunk. Content type is ['html' or 'text'](#content_types)|
|`replace(text: string, content_type: string)`|Replaces the text chunk with the text. Content type is ['html' or 'text'](#content_types)|
|`remove()`|Removes the entire text chunk|
|`removed(): boolean`|Returns true if the text chunk has been removed|


### Doctype Class {/* doctype */}

The Doctype class is passed to the callback function for `doc_type:` definitions.
([ref: lol_html::html_content::Doctype](https://docs.rs/lol_html/latest/lol_html/html_content/struct.Doctype.html))
The Doctype class has the following methods:

|Method|Description|
|------------------|----------------------------------------------|
|`name(): string`|Returns the name of the document type|
|`public_id(): string`|Returns the public ID of the document type|
|`system_id(): string`|Returns the system ID of the document type|
|`remove()`|Removes the entire document type|
|`removed(): boolean`|Returns true if the document type has been removed|


### DocEnd Class {/* doc_end */}

The DocEnd class is passed to the callback function for `doc_end:` definitions.
([ref: lol_html::html_content::DocumentEnd](https://docs.rs/lol_html/latest/lol_html/html_content/struct.DocumentEnd.html))
The DocEnd class has the following methods:

|Method|Description|
|------------------|----------------------------------------------|
|`append(text: string, content_type: string)`|Appends the text to the end of the document. Content type is ['html' or 'text'](#content_types)|


### Attribute Class {/* attribute */}

The Attribute class is returned by the `attributes()` method of the [Element](#element) class.
([ref: lol_html::html_content::Attribute](https://docs.rs/lol_html/latest/lol_html/html_content/struct.Attribute.html))
The Attribute class has the following methods:

|Method|Description|
|------------------|----------------------------------------------|
|`name(): string`|Returns the name of the attribute|
|`name_preserve_case(): string`|Returns the name of the attribute, preserving its case.|
|`value(): string`|Returns the value of the attribute|

### StartTag Class {/* start_tag */}

The StartTag class is returned by the `start_tag()` method of the [Element](#element) class.
([ref: lol_html::html_content::StartTag](https://docs.rs/lol_html/latest/lol_html/html_content/struct.StartTag.html))
The StartTag class has the following methods:

|Method|Description|
|------------------|----------------------------------------------|
|`name(): string`|Returns the name of the tag|
|`name_preserve_case(): string`|Returns the name of the tag, preserving its case.|
|`set_name(name: string)`|Sets the name of the tag. Returns an error if the tag name is invalid.|
|`namespace_uri(): string`|Returns the namespace URI of the tag|
|`attributes(): [Attributes]`|Returns an array of [Attribute](#attribute) objects|
|`set_attribute(name: string, value)`|Sets the value of the attribute with the specified name. Returns an error if the attribute name is invalid.|
|`remove_attribute(name: string)`|Removes the attribute with the specified name|
|`self_closing(): boolean`|Returns true if the tag is self closing. E.g. `<foo />`|
|`before(text: string, content_type: string)`|Inserts the text before the tag. Content type is ['html' or 'text'](#content_types)|
|`after(text: string, content_type: string)`|Inserts the text after the tag. Content type is ['html' or 'text'](#content_types)|
|`replace(text: string, content_type: string)`|Replaces the tag with the text. Content type is ['html' or 'text'](#content_types)|
|`remove()`|Removes the entire tag|


## Types {/* types */}

### Text Type {/* text_type */}

([ref: lol_html::html_content::TextType](https://docs.rs/lol_html/latest/lol_html/html_content/enum.TextType.html))

Valid values are:

* `'PlainText'` - Text inside a `<plaintext>` element.
* `'RCData'` - Text inside `<title>`, and `<textarea>` elements.
* `'RawText'` - Text inside `<style>`, `<xmp>`, `<iframe>`, `<noembed>`, `<noframes>`, and `<noscript>` elements.
* `'ScriptData'` - Text inside a `<script>` element.
* `'Data'` - Regular text.
* `'CDataSection'` - Text inside a `CDATA` section.

### Content Types {/* content_types */}

The HtmlTransformer supports the following content types: ([ref: lol_html::html_content::ContentType](https://docs.rs/lol_html/latest/lol_html/html_content/enum.ContentType.html))

* `'html'` - HTML content. The transformer will not escape HTML entities.
* `'text'` - Plain text content. The transformer will escape HTML entities. E.g. `<` will be converted to `&lt;`. 
