---
title: HtmlTransformer
---

The `HtmlTransformer` class is a powerful and efficient edge function helper designed to modify HTML responses from the origin server. It serves as a wrapper for the [lol_html::HtmlRewriter Class](https://docs.rs/lol_html/latest/lol_html/struct.HtmlRewriter.html) Rust crate, ensuring seamless compatibility and supporting streaming HTML response bodies.

This class provides a simple and intuitive API for transforming HTML responses. It allows you to [define transformations](#definitions) based on [HTML selectors](#selectors), such as elements, comments, and text, and apply these transformations to the HTML response as it streams in from the origin server. This approach is more efficient and avoids memory limitations, making it ideal for processing large HTML responses.

To use the `HtmlTransformer`, you'll first need to define the transformations you want to apply to the HTML response. The following sample code demonstrates how to create an instance of the `HtmlTransformer` class and define the transformations:

```js
const transformerDefinitions = [
  {
    selector: 'a[href]',
    element: async (el) => {
      const href = el.get_attribute('href');
      el.set_attribute('href', href.replace('http://', 'https://'));
    },
  },
  {
    selector: 'body',
    comment: async (c) => {
      c.remove();
    },
  },
  {
    doc_end: async (d) => {
      d.append(
        `&lt;!-- Transformed at ${new Date().toISOString()} by Edg.io -->`,
        'html'
      );
    },
  },
];
```

There are two types of rewriter callback definitions that can be passed into the `HtmlTransformer`:

- Transformations that match an HTML selector and trigger a callback function when the selector is found.
  - `comment`**:** Operates on any HTML comment matching the specified selector.
  - `element`**:** Operates on the HTML element matching the specified selector and the element's attributes.
  - `text`**:** Operates on any text matching the specified selector.
- Transformations that trigger the callback function when the HTML document is found. This type of transformation does not require an HTML selector.
  - `doc_comment`**:** Operates on any HTML comment in the document.
  - `doc_text`**:** Operates on any text in the document.
  - `doc_type`**:** Provides read-only information on the HTML document type.
  - `doc_end`**:** Triggered when the end of the HTML document is reached.

Learn more about [Definitions](#definitions) and [Selectors](#selectors).

## Quick Start Examples {/* quickstart */}

### Example 1: Basic Usage {/* example1 */}

Here is an edge function that uses HtmlTransform to:

- Ensure all `<a href="...">` links are HTTPS.
- Remove all HTML comments.
- Append a comment for the transformation timestamp to the end of the document.

```js
export async function handleHttpRequest(request, context) {
  const transformerDefinitions = [
    // This first definition replaces http with https in the <a href=...> elements
    {
      // This selector will match all <a> elements which have an href attribute
      selector: 'a[href]',
      element: async (el) => {
        const href = el.get_attribute('href');
        el.set_attribute('href', href.replace('http://', 'https://'));
      },
    },

    // This second definition removes all comments from the <body>
    {
      selector: 'body',
      comment: async (c) => {
        // remove the comment
        c.remove();
      },
    },

    // This third definition appends a timestamp to the end of the HTML document
    {
      // Since this operates on the document, there is no need to specify a selector
      doc_end: async (d) => {
        // Use the append() method to append the timestamp to the end of the document
        // Specify 'html' as the second arguemnt to indicate the content is HTML, not plain text
        d.append(
          `&lt;!-- Transformed at ${new Date().toISOString()} by Edg.io -->`,
          'html'
        );
      },
    },
  ];

  // Get the HTML from the origin server and stream the response body through the HtmlTransformer
  return fetch(request.url, {edgio: {origin: 'api_backend'}}).then(
    (response) => {
      let transformedResponse = HtmlTransformer.stream(
        transformerDefinitions,
        response
      );
      // Make any changes to the response headers here.
      transformedResponse.headers.set('x-html-transformer-ran', 'true');
      return transformedResponse;
    }
  );
}
```

We will now examine how this edge function will transform the following HTML response provided by an origin server:

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

This edge function transforms the above HTML to ensure HTTPS links, remove HTML comments, and append a transformation timestamp. The transformed HTML is shown below.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Script Example</title>
  </head>
  <body>
    <h1>Script Example</h1>
    <p>Script example.</p>
    <a href="https://edg.io/">Edgio Homepage</a>
  </body>
</html>
&lt;!-- Transformed at 2023-11-29T00:52:09.942Z by Edg.io -->
```

### Example 2: Edge Side Includes with fetch() {/* example2 */}

This sample edge function uses HtmlTransform to replace all `<esi:include src="..."/>` elements with the content of the specified URL.

```js
export async function handleHttpRequest(request, context) {
  // This definition replaces <esi:include src="..." /> the response from the src
  const transformerDefinitions = [
    {
      // This selector will match all <esi:include /> elements which have a src attribute.
      // We escape the : character with 2 backslashes to indicate it is part of the tag name
      // and not an attribute of the selector.
      selector: 'esi\\:include[src]',
      element: async (el) => {
        const url = el.get_attribute('src');
        const response = await fetch(url, {edgio: {origin: 'api_backend'}});
        if (response.status == 200) {
          const body = await response.text();
          el.replace(body, 'html');
        } else {
          el.replace(
            '<a>We encountered an error, please try again later.</a>',
            'html'
          );
        }
      },
    },
  ];

  // Get the HTML from the origin server and stream the response body through the HtmlTransformer
  return fetch(request.url, {edgio: {origin: 'api_backend'}}).then(
    (response) => {
      let transformedResponse = HtmlTransformer.stream(
        transformerDefinitions,
        response
      );
      // Make any changes to the response headers here.
      transformedResponse.headers.set('x-html-transformer-ran', 'true');
      return transformedResponse;
    }
  );
}
```

We will now examine how this edge function will transform the following HTML response provided by an origin server:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Script Example</title>
  </head>
  <body>
    <h1>Script Example</h1>
    <esi:include src="https://api.backend.com/body" />
  </body>
</html>
```

This edge function transforms the above HTML to replace `<esi:include ... />` with the results of the fetch. The transformed HTML is shown below.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Script Example</title>
  </head>
  <body>
    <h1>Script Example</h1>
    <div>
      <p>Here is some HTML text with a link returned by the fetch().</p>
      <a href="https://edg.io/">Edgio Homepage</a>
    </div>
  </body>
</html>
```

### Example 3: Using fetch() with response streaming {/* example4 */}

This example is a modified version of [Example 2](#example2) without the `HtmlTransformer.stream()` helper function.

```js
export async function handleHttpRequest(request, context) {
  // This definition replaces <esi:include src="..." /> the response from the src
  const transformerDefinitions = [
    {
      // This selector will match all <esi:include /> elements which have a src attribute.
      // We escape the : character with 2 backslashes to indicate it is part of the tag name
      // and not an attribute of the selector.
      selector: 'esi\\:include[src]',
      element: async (el) => {
        const url = el.get_attribute('src');
        const response = await fetch(url, {edgio: {origin: 'api_backend'}});
        if (response.status == 200) {
          const body = await response.text();
          el.replace(body, 'html');
        } else {
          el.replace(
            '<a>We encountered an error, please try again later.</a>',
            'html'
          );
        }
      },
    },
  ];
  const textDecoder = new TextDecoder();

  // Get the HTML from the origin server and stream the response body through the
  // HtmlTransformer to the Response object
  const response = fetch(request.url, {edgio: {origin: 'api_backend'}})
    // Retrieve its body as ReadableStream
    .then(async (response) => {
      const reader = response.body.getReader();
      return new ReadableStream({
        start(controller) {
          const htmlTransformer = new HtmlTransformer(definitions, (chunk) => {
            controller.enqueue(chunk);
          });
          return pump();
          function pump() {
            return reader.read().then(async ({done, value}) => {
              if (value) {
                await htmlTransformer.write(textDecoder.decode(value));
              }
              // When no more data needs to be consumed, close the stream
              if (done) {
                await htmlTransformer.end();
                controller.close();
                return;
              }
              // Send the html to the HtmlTransformer.
              return pump();
            });
          }
        },
      });
    })
    // Create a new response out of the stream
    .then((stream) => new Response(stream));

  return response;
}
```

## HtmlTransformer Class {/* class */}

### static async stream(transformerDefinitions, response) {/* stream */}

Static helper function to easily stream `fetch()` responses through the HtmlTransformer. This is the recommended method to use when transforming HTML responses.

- `transformerDefinitions` is an array of [transformer definitions](#definitions).
- `response` is the `fetch()` response object.

```js
// Transforms response from origin
return fetch(request.url, {edgio: {origin: 'api_backend'}}).then((response) =>
  HtmlTransformer.stream(transformerDefinitions, response)
);
```

```js
// Transforms response from origin and optionally manipulates the response headers
return fetch(request.url, {edgio: {origin: 'api_backend'}}).then((response) => {
  let transformedResponse = HtmlTransformer.stream(
    transformerDefinitions,
    response
  );
  // Make any changes to the response headers here.
  transformedResponse.headers.set('x-html-transformer-ran', 'true');
  return transformedResponse;
});
```

### new {/* new */}

Creates a new HtmlTransformer instance. The `transformerDefinitions` is an array of [transformer definitions](#definitions). The `callback` is the function `(chunk) => { ... }` that receives the transformed HTML data chunks.

<Important>

This usgae is not recommended for large responses as it may exceed memory
limitations. Use the [`HtmlTransformer.stream()`](#stream) method to stream the response
body during transformation.

</Important>

```js
const htmlTransformer = new HtmlTransformer(transformerDefinitions, callback);
```

### async write(string) {/* write-string */}

Writes the string to the transformer stream. This function can be called multiple times.

```js
await htmlTransformer.write('<html><body><h1>Hello World</h1>');
await htmlTransformer.write('<a href="https://edg.io/">Edgio Homepage</a>');
await htmlTransformer.write('</body></html>');
await htmlTransformer.end();
```

### async write(Promise&lt;Response>) {/* write-promise */}

Pass the Response's Promise to the transformer stream. This writes the entire response to the transformer as a stream.

```js
const responsePromise = fetch(request.url, {edgio: {origin: 'api_backend'}});
await htmlTransformer.write(responsePromise);
await htmlTransformer.end();
```

### async write(Response) {/* write-response */}

Pass the Response Object to the transformer stream. This writes the entire response to the transformer as a stream.

```js
const response = await fetch(request.url, {edgio: {origin: 'api_backend'}});
if (response.status == 200) {
  await htmlTransformer.write(response);
  await htmlTransformer.end();
}
```

### async write(readableStream) {/* write-readable-stream */}

Pass the ReadbleStream to the transformer stream. This writes the entire response to the transformer as a stream.

```js
const response = await fetch(request.url, {edgio: {origin: 'api_backend'}});
if (response.status == 200) {
  if (response.headers.get('content-type') == 'text/html') {
    const reableStream = response.body;
    await htmlTransformer.write(reableStream);
    await htmlTransformer.end();
  }
}
```

### async end() {/* end */}

Flushes the transformer and completes the transformation. This function must be called after the last call to `await htmlTransformer.write()`.

```js
await htmlTransformer.end();
```

## Definitions {/* definitions */}

The HtmlTransformer definitions are an array of objects that define the transformations performed on the HTML stream. These definition objects can contain one selector and one asynchronous callback:

- `selector:` - A string defining the HTML selector to match. (See [Selectors](#selectors))
- `comment:` - The `async (Comment) => { }` function called when an HTML [comment](#comment) is found matching the selector.
- `element:` - The `async (Element) => { }` function called when an HTML [element](#element) is found matching the selector.
- `text:` - The `async (Text) => { }` function called when [text](#text) is found matching the selector.

These definition objects contain one callback that is not associated with a selector:

- `doc_comment:` - The `async (Comment) => { }` function called when an HTML [comment](#comment) is found in the document.
- `doc_text:` - The `async (Text) => { }` function called when [text](#text) is found in the document.
- `doc_type:` - The `async (Doctype) => { }` function called when the HTML [document type](#doctype) is found in the document.
- `doc_end:`- The `async (DocEnd) => { }` function called when the [end](#doc_end) of the HTML document is reached.

### Selectors {/* selectors */}

The HtmlTransformer supports the following selector types: (ref: [lol_html::Selector ](https://docs.rs/lol_html/latest/lol_html/struct.Selector.html#supported-selector))

| Pattern            | Represents                                                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `*`                | any element                                                                                                                 |
| `E`                | any element of type `E`                                                                                                     |
| `E:nth-child(n)`   | an `E` element, the n-th child of its parent                                                                                |
| `E:first-child`    | an `E` element, first child of its parent                                                                                   |
| `E:nth-of-type(n)` | an `E` element, the n-th sibling of its type                                                                                |
| `E:first-of-type`  | an `E` element, first sibling of its type                                                                                   |
| `E:not(s)`         | an `E` element that does not match either compound selector `s`                                                             |
| `E.warning`        | an `E` element belonging to the class warning                                                                               |
| `E#myid`           | an `E` element with ID equal to `myid`                                                                                      |
| `E[foo]`           | an `E` element with a `foo` attribute                                                                                       |
| `E[foo="bar"]`     | an `E` element whose `foo` attribute value is exactly equal to `bar`                                                        |
| `E[foo="bar" i]`   | an `E` element whose `foo` attribute value is exactly equal to any (ASCII-range) case-permutation of `bar`                  |
| `E[foo="bar" s]`   | an `E` element whose `foo` attribute value is exactly and case-sensitively equal to `bar`                                   |
| `E[foo~="bar"]`    | an `E` element whose `foo` attribute value is a list of whitespace-separated values, one of which is exactly equal to `bar` |
| `E[foo^="bar"]`    | an `E` element whose `foo` attribute value begins exactly with the string `bar`                                             |
| `E[foo$="bar"]`    | an `E` element whose `foo` attribute value ends exactly with the string `bar`                                               |
| `E[foo*="bar"]`    | an `E` element whose `foo` attribute value contains the substring `bar`                                                     |
| `E[foo\|="en"]`    | an `E` element whose `foo` attribute value is a hyphen-separated list of values beginning with `en`                         |
| `E F`              | an `F` element descendant of an `E` element                                                                                 |
| `E > F`            | an `F` element child of an `E` element                                                                                      |

<Callout type="info">

Use a double backslash to escape special characters within an `E` selector. For example, use the selector `esi\\:include[src]` to match `<esi:include src="...">`.

</Callout>

## Classes {/* classes */}

### Comment Class {/* comment */}

The Comment class is passed to the callback function for `comment:` and `doc_comment:` definitions.
([ref: lol_html::html_content::Comment](https://docs.rs/lol_html/latest/lol_html/html_content/struct.Comment.html))
The Comment class has the following methods:

| Method                                        | Description                                                                             |
| --------------------------------------------- | --------------------------------------------------------------------------------------- |
| `text(): string`                              | Returns the comment text                                                                |
| `set_text(text: string)`                      | Sets the comment text                                                                   |
| `before(text: string, content_type: string)`  | Inserts the text before the comment. Content type is ['html' or 'text'](#content_types) |
| `after(text: string, content_type: string)`   | Inserts the text after the comment. Content type is ['html' or 'text'](#content_types)  |
| `replace(text: string, content_type: string)` | Replaces the comment with the text. Content type is ['html' or 'text'](#content_types)  |
| `remove()`                                    | Removes the entire comment                                                              |
| `removed(): boolean`                          | Returns true if the comment has been removed                                            |

### Element Class {/* element */}

The Element class is passed to the callback function for `element:` definitions.
([ref: lol_html::html_content::Element](https://docs.rs/lol_html/latest/lol_html/html_content/struct.Element.html))
The Element class has the following methods:

| Method                                                  | Description                                                                                                 |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `tag_name(): string`                                    | Returns the tag name of the element                                                                         |
| `tag_name_preserve_case(): string`                      | Returns the tag name of the element, preserving the case of the original tag name                           |
| `set_tag_name(name: string)`                            | Sets the tag name of the element. Returns an error if the tag name is invalid.                              |
| `is_self_closing(): boolean`                            | Returns true if the element is self closing. E.g. `<foo />`                                                 |
| `can_have_content(): boolean`                           | Returns true if the element can have content                                                                |
| `namespace_uri(): string`                               | Returns the namespace URI of the element                                                                    |
| `attributes(): [Attributes]`                            | Returns an array of [Attribute](#attribute) objects                                                         |
| `get_attribute(name: string): string`                   | Returns the value of the attribute with the specified name                                                  |
| `has_attribute(name: string): boolean`                  | Returns true if the element has an attribute with the specified name                                        |
| `set_attribute(name: string, value)`                    | Sets the value of the attribute with the specified name. Returns an error if the attribute name is invalid. |
| `remove_attribute(name: string)`                        | Removes the attribute with the specified name                                                               |
| `before(text: string, content_type: string)`            | Inserts the text before the element. Content type is ['html' or 'text'](#content_types)                     |
| `after(text: string, content_type: string)`             | Inserts the text after the element. Content type is ['html' or 'text'](#content_types)                      |
| `prepend(text: string, content_type: string)`           | Prepends the text to the element. Content type is ['html' or 'text'](#content_types)                        |
| `append(text: string, content_type: string)`            | Appends the text to the element. Content type is ['html' or 'text'](#content_types)                         |
| `set_inner_content(text: string, content_type: string)` | Sets the inner content of the element. Content type is ['html' or 'text'](#content_types)                   |
| `replace(text: string, content_type: string)`           | Replaces the element with the text. Content type is ['html' or 'text'](#content_types)                      |
| `remove()`                                              | Removes the entire element                                                                                  |
| `remove_and_keep_content()`                             | Removes the element and keeps its content                                                                   |
| `removed(): boolean`                                    | Returns true if the element has been removed                                                                |
| `start_tag(): StartTag`                                 | Returns the [StartTag](#start_tag) object for the element                                                   |
| `end_tag_handlers()`                                    | Not implemented                                                                                             |

### Text Class {/* text */}

The Text class is passed to the callback function for `text:` and `doc_text:` definitions.
([ref: lol_html::html_content::TextChunk](https://docs.rs/lol_html/latest/lol_html/html_content/struct.TextChunk.html))
The Text class has the following methods:

| Method                                        | Description                                                                                |
| --------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `as_str(): string`                            | Returns the text                                                                           |
| `set_str(text: string)`                       | Sets the text                                                                              |
| `text_type(): string`                         | Returns the text type.                                                                     |
| `last_in_text_node(): boolean`                | Returns true if the chunk is last in a HTML text node.                                     |
| `before(text: string, content_type: string)`  | Inserts the text before the text chunk. Content type is ['html' or 'text'](#content_types) |
| `after(text: string, content_type: string)`   | Inserts the text after the text chunk. Content type is ['html' or 'text'](#content_types)  |
| `replace(text: string, content_type: string)` | Replaces the text chunk with the text. Content type is ['html' or 'text'](#content_types)  |
| `remove()`                                    | Removes the entire text chunk                                                              |
| `removed(): boolean`                          | Returns true if the text chunk has been removed                                            |

### Doctype Class {/* doctype */}

The Doctype class is passed to the callback function for `doc_type:` definitions.
([ref: lol_html::html_content::Doctype](https://docs.rs/lol_html/latest/lol_html/html_content/struct.Doctype.html))
The Doctype class has the following methods:

| Method                | Description                                        |
| --------------------- | -------------------------------------------------- |
| `name(): string`      | Returns the name of the document type              |
| `public_id(): string` | Returns the public ID of the document type         |
| `system_id(): string` | Returns the system ID of the document type         |
| `remove()`            | Removes the entire document type                   |
| `removed(): boolean`  | Returns true if the document type has been removed |

### DocEnd Class {/* doc_end */}

The DocEnd class is passed to the callback function for `doc_end:` definitions.
([ref: lol_html::html_content::DocumentEnd](https://docs.rs/lol_html/latest/lol_html/html_content/struct.DocumentEnd.html))
The DocEnd class has the following methods:

| Method                                       | Description                                                                                     |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `append(text: string, content_type: string)` | Appends the text to the end of the document. Content type is ['html' or 'text'](#content_types) |

### Attribute Class {/* attribute */}

The Attribute class is returned by the `attributes()` method of the [Element](#element) class.
([ref: lol_html::html_content::Attribute](https://docs.rs/lol_html/latest/lol_html/html_content/struct.Attribute.html))
The Attribute class has the following methods:

| Method                         | Description                                             |
| ------------------------------ | ------------------------------------------------------- |
| `name(): string`               | Returns the name of the attribute                       |
| `name_preserve_case(): string` | Returns the name of the attribute, preserving its case. |
| `value(): string`              | Returns the value of the attribute                      |

### StartTag Class {/* start_tag */}

The StartTag class is returned by the `start_tag()` method of the [Element](#element) class.
([ref: lol_html::html_content::StartTag](https://docs.rs/lol_html/latest/lol_html/html_content/struct.StartTag.html))
The StartTag class has the following methods:

| Method                                        | Description                                                                                                 |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `name(): string`                              | Returns the name of the tag                                                                                 |
| `name_preserve_case(): string`                | Returns the name of the tag, preserving its case.                                                           |
| `namespace_uri(): string`                     | Returns the namespace URI of the tag                                                                        |
| `attributes(): [Attributes]`                  | Returns an array of [Attribute](#attribute) objects                                                         |
| `set_attribute(name: string, value)`          | Sets the value of the attribute with the specified name. Returns an error if the attribute name is invalid. |
| `remove_attribute(name: string)`              | Removes the attribute with the specified name                                                               |
| `self_closing(): boolean`                     | Returns true if the tag is self closing. E.g. `<foo />`                                                     |
| `before(text: string, content_type: string)`  | Inserts the text before the tag. Content type is ['html' or 'text'](#content_types)                         |
| `after(text: string, content_type: string)`   | Inserts the text after the tag. Content type is ['html' or 'text'](#content_types)                          |
| `replace(text: string, content_type: string)` | Replaces the tag with the text. Content type is ['html' or 'text'](#content_types)                          |
| `remove()`                                    | Removes the entire tag                                                                                      |

## Types {/* types */}

### Text Type {/* text_type */}

([ref: lol_html::html_content::TextType](https://docs.rs/lol_html/latest/lol_html/html_content/enum.TextType.html))

Valid values are:

- `'PlainText'` - Text inside a `<plaintext>` element.
- `'RCData'` - Text inside `<title>`, and `<textarea>` elements.
- `'RawText'` - Text inside `<style>`, `<xmp>`, `<iframe>`, `<noembed>`, `<noframes>`, and `<noscript>` elements.
- `'ScriptData'` - Text inside a `<script>` element.
- `'Data'` - Regular text.
- `'CDataSection'` - Text inside a `CDATA` section.

### Content Types {/* content_types */}

The HtmlTransformer supports the following content types: ([ref: lol_html::html_content::ContentType](https://docs.rs/lol_html/latest/lol_html/html_content/enum.ContentType.html))

- `'html'` - HTML content. The transformer will not escape HTML entities.
- `'text'` - Plain text content. The transformer will escape HTML entities. E.g. `<` will be converted to `&lt;`.
