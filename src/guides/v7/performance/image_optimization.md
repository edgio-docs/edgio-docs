---
title: Image Optimization
---

{{ PRODUCT }} can dynamically transforms your images to tailor them to your site's:

-   Design. You can apply multiple transformations (e.g., resize, blur, crop, and rotate) to a single source image according to how it should be displayed within your site's design.
-   Experience. For example, if your site has a paywall, you can effortlessly apply a blur effect to requests for images once a site visitor has met or exceeded their allotment of free access.
-   Performance. Balance image quality against performance in order to provide the optimal experience for your users. For example, you can deliver large, high-quality images for desktop users and smaller lower-quality images for mobile users from the same source image.

{{ PRODUCT }} caches your transformed images at the edge of our network. This improves performance by reducing image processing and by bringing your optimized images closer to your users.

## Quick Start {/*quick-start*/}

Optimize images through the following steps:

1.  Analyze your site to identify the images that require optimization.
2.  [Enable Image Optimization](#enabling-image-optimization) for all of the images identified in the previous step.
3.  Define the set of optimizations that will be applied to your images by:
    
    -   Including [query string parameters](#query-string-parameters) within the request URL.

        <Callout type="tip">

          One method for dynamically determining the set of optimizations that will be applied to an image is through a rule.

          For example, you may create a rule that resizes all PNG images whose URL path contains `/thumbnails/`.

        </Callout>

    -   Requesting data from the client through [client hints](#client-hints).

## How Does It Work? {/*how-does-it-work-*/}

A client's request URL determines the set of transformations that will be applied to an image. For example, the following request URL will resize the source image to 500 x 500 and then apply a blur effect to the resized image:

`https://edgeio.whitecdn.com/demo.jpg?blur=50&width=500&height=500`

<Callout type="info">

  The order in which parameters are defined in the request does not affect the order in which they will be applied to the image. Rather, {{ PRODUCT }} always uses a [predefined order](#order-of-operations) to determine how images are processed. 

</Callout>

Upon receiving a request for an optimized image, our CDN will check whether an image with the requested set of optimizations has been cached. If the optimized image has been cached, then it will be delivered immediately to the client. Otherwise, our CDN will apply the requested set of optimizations to the source image, deliver it to the client, and then cache both the source and optimized image. This workflow is illustrated below.

![How does it work?](/images/v7/performance/image-optimization-hdiw.png)

## Image Requirements{/*image-requirements*/}

Restrictions vary according to whether {{ PRODUCT }} Image Optimization will process or generate an image.

#### Source Image Requirements {/*source-image-requirements*/}

Images that meet the following requirements are eligible for processing:

-   **File Formats:** `jpg | jpeg | pjpg | pjpeg | png | ppng | webp | tiff | tif`
-   **Compression:** Standard image compression as determined by the image's file format.

    <Callout type="info">

      All other types of data compression (e.g., gzip or brotli) are unsupported. Additionally, {{ PRODUCT }} removes the `Accept-Encoding` header from all transformed images.
      
    </Callout>

-   **Maximum File Size:** 10 MB
-   **Maximum Resolution:** 4096 x 4096
-   **Color Space:** RGB

<Callout type="info">

  Our CDN service delivers the source image to the client when it does not satisfy the above requirements.
  
</Callout>

#### Optimized Image Limits {/*optimized-image-limits*/}

An optimized image must comply with the following limits:

-   **File Formats:** `jpg | jpeg | pjpg | pjpeg | png | ppng | webp | tiff | tif`
-   **Maximum Resolution:** 8192 x 8192

{{ PRODUCT }} [returns an error](#response) when an attempting to generate an image that exceeds the above limits.

## Enabling Image Optimization {/*enabling-image-optimization*/}

{{ PRODUCT }} transforms images when the following conditions are met:

-   Image optimization has been enabled on the request through a rule.
-   One or more transformation(s) have been requested through either:
    
    -   [Query string parameters](#query-string-parameters).
    -   [Request headers](#client-driven-image-optimizations-client-hints)

**To enable image optimization**

1.  **Query String Caching:** Verify that the cache key for images that will be processed by {{ PRODUCT }} excludes image optimization query string parameters. By default, {{ PRODUCT }} excludes query string parameters from the cache key.

    <Callout type="tip">

      If you must add query string parameters to the cache key, we recommend that you restrict it to the parameters that are critical to your business needs. This recommendation ensures optimal performance by allowing our CDN to serve more requests from cache. Additionally, it reduces or eliminates unnecessary image processing due to a cache miss.
      
    </Callout>

    **How do I check my query string caching configuration?**
    
    Check your query string caching configuration by reviewing your rules to check whether the:

    -   [Cache Key Query String feature (cache_key_query_string)](/guides/performance/rules/features#cache-key-query-string) has been defined. It should not be set to `Exclude All` or include [image optimization query string parameter(s)](#query-string-parameters). 
    -   [Rewrite Cache Key feature (cache_key_rewrite)](/guides/performance/rules/features#rewrite-cache-key) has been defined. The destination for this feature should not include image optimization query string parameter(s).
    
2.  Create or modify a rule that identifies the set of images that will be optimized.

    <Callout type="info">
	
      {{ PRODUCT }} removes the `Accept-Encoding` header from all requests that it processes. If you use this header to compress content, then it is important that you configure this rule to only apply to images that will be processed by {{ PRODUCT }}.
	  
    </Callout>

    <Callout type="info">

      Create a rule through either [Rules](/guides/v7/performance/rules) or a [CDN-as-code configuration](/guides/v7/performance/cdn_as_code).
    
    </Callout>

    **Example:**
    
    You can create a rule that targets images through the [Extension match condition (extension)](/guides/performance/rules/conditions#extension).
    
    ![Extension match condition](/images/v7/performance/image-optimization-extension-match-condition.png)
    
    If your images do not have file extensions, then consider using the [Request Header match condition (request.header)](/guides/performance/rules/conditions#request-header) to target images through the [Content-Type header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#image_types).
    
3.  Deploy your changes.

## Query String Parameters {/*query-string-parameters*/}

Use the following query string parameters to define the set of optimizations that will be applied to your images:

-   [auto](#auto)
-   [bg-color](#bg-color)
-   [blur](#blur)
-   [canvas](#canvas)
-   [dpr](#dpr)
-   [fit](#fit)
-   [format](#format)
-   [height](#height)
-   [pad](#pad)
-   [quality](#quality)
-   [rotate](#rotate)
-   [strip](#strip)
-   [trim](#trim)
-   [width](#width)
-   [wurfl](#wurfl)

#### Order of Operations {/*order-of-operations*/}

{{ PRODUCT }} applies the above transformations in the following order:

`Trim > Rotate > Resize (Width, Height, DPR, and Fit) > Background Color > Canvas > Pad > Blur > Image Generation (Quality, Strip, and Format)`

<Callout type="info">

  The above order of operations is only provided to help you gain a deeper understanding of how optimizations interact with each other.
  
</Callout>

### Auto {/*auto*/}

Automates image optimization. Valid values are:

-   **webp:** Generates a WebP image when a client indicates WebP image format support through the `Accept` request header.

    <Callout type="info">

    This setting overrides the [format query string parameter](#format) when a client indicates WebP image format support. Otherwise, the `format` query string parameter determines the file format for the optimized image.

    </Callout>

-   **save-data:** Applies additional image compression by reducing image quality by 45% when a client requests reduced data usage through the `Save-Data` request header.

    <Callout type="info">

      Unlike other client-driven optimizations, a user controls whether the `Save-Data` header will be included in the request. For example, Chrome requests on Android will automatically include this header once Data Saver has been enabled.

	</Callout>

-   **smallest:** Delivers the image with the smallest file size, regardless of whether it is the source or the optimized image.

Use a comma to separate multiple values.
  
**Example:** `?auto=webp,smallest`

[Try now.](https://edgeio.whitecdn.com/demo.jpg?auto=webp,smallest)

### Bg-color {/*bg-color*/}

Sets the background color for transparent content and padding added by [pad](#pad) and [canvas](#canvas).

**Syntax:** 

-   `?bg-color=<COLOR HEX CODE>`
-   `?bg-color=<RED>,<GREEN>,<BLUE>[,<ALPHA CHANNEL>]`

    `<ALPHA CHANNEL>` determines the opacity for the background color. Specify a decimal value from 0.0 (transparent) to 1.0 (opaque).

**Default value:** The default background color is white with an alpha channel of 1.0.

**Example:** Pass either of the following values to set the background color to dark gray:

-   `?bg-color=4C4C4C`
-   `?bg-color=76,76,76`

![](https://edgeio.whitecdn.com/demo.jpg?width=360&pad=50&bg-color=4C4C4C)

[Try now.](https://edgeio.whitecdn.com/demo.jpg?width=360&pad=50&bg-color=4C4C4C)

### Blur {/*blur*/}

Determines the intensity at which edges within an image will be smoothed. This transformation reduces the level of detail within the image. Valid values are from 1 to 100.

**Example:** `?blur=20`

![](https://edgeio.whitecdn.com/demo.jpg?width=460&fit=bounds&blur=20)

[Try now.](https://edgeio.whitecdn.com/demo.jpg?blur=20)

### Canvas {/*canvas*/}

Determines the size of the image's canvas and the position of the optimized image within the canvas.

**Syntax:** `?canvas=<CANVAS WIDTH>,<CANVAS HEIGHT>,x<X-COORDINATE>,y<Y-COORDINATE>`

**Key information:**

-   You must specify `<CANVAS WIDTH>` and `<CANVAS HEIGHT>` when passing this parameter. However, you may omit offset position information.
-   Use this parameter to expand or shrink the optimized image's canvas.
    
    -   Expand: Specify a dimension that is larger than the source image to pad it. Padding is distributed evenly on opposite sides of the image.
        
        **Example:** Expands the height and width dimensions of a 3520 x 2347 image:
        
        `?canvas=4020,2847`
        
        [Try now.](https://edgeio.whitecdn.com/demo.jpg?canvas=4020,2847)
        
    -   Shrink: Specify a dimension that is shorter than the source image to trim it. Our service trims the portion of the image that exceeds the specified canvas size.
        
        **Example:** Shrinks the height and width dimensions of a 3520 x 2347 image:
        
        `?canvas=3020,1847`
        
        [Try now.](https://edgeio.whitecdn.com/demo.jpg?canvas=3020,1847)
        
-   This parameter overrides the [pad parameter](#pad). You may not pad an image through the `pad` parameter when you define canvas size.

**Default value:** By default, the size of the optimized image's canvas is determined by the source image's dimensions and the `height`, `width`, `pad`, and `trim` parameters. Additionally, a default offset is not applied to the optimized image.

**Examples:**

Pass the following query string to set the canvas size to 640 x 480 for a 3520 x 2347 image:

`?canvas=640,480`

[Try now.](https://edgeio.whitecdn.com/demo.jpg?canvas=640,480)

We will now resize the image's width to 550 pixels:

`?canvas=640,480&width=550`

[Try now.](https://edgeio.whitecdn.com/demo.jpg?canvas=640,480&width=550)

We will now add a vertical offset of 113 pixels:

`?canvas=640,480,y113&width=550`

[Try now.](https://edgeio.whitecdn.com/demo.jpg?canvas=640,480,y113&width=550)

### Dpr {/*dpr*/}

Device Pixel Ratio (DPR). Scales an image with the intent of matching a device's resolution. Valid values are from 1 to 10.

**Key information:**

-   Images cannot be scaled beyond 8192 x 8192. Attempting to scale an image beyond 8192 x 8192 typically indicates a suboptimal configuration. Most devices will need to scale down images that meet or exceed this resolution.
-   Improve performance and save bandwidth by resizing an image and then scaling it to match the device's resolution through DPR.
-   The [DPR request header](#client-driven-image-optimizations-client-hints) takes precedence over this parameter.
-   A value of 1 indicates a 1:1 ratio between a device's physical and logical pixels, while a value of 3 indicates a 3:1 ratio. 

    <Callout type="info">

	  Physical pixels represent the available pixels on the device's screen. 

	  Logical pixels represent the number of pixels displayed on the device. For example, if a device's resolution is scaled by a 3:1 ratio, then the device's logical pixels is a third of its physical pixels. 

	</Callout>

-   {{ PRODUCT }} does not upscale images. 

    [Learn more.](#upscaling-images)

**Example:** Pass the following query string to resize a 3520 x 2347 image to 320 x 213 and then set a 2:1 DPR:

`?width=320&dpr=2`

The response is a 640 x 427 image.

[Try now](https://edgeio.whitecdn.com/demo.jpg?width=320&dpr=2).

### Fit {/*fit*/}

Determines the method through which the image will be resized to the dimensions defined by the `height` and `width` parameters. Valid values are:

-   **crop:** Centers, resizes, and then crops the image through the following workflow:

    1.  Centers the image within the specified region.
    2.  Resizes the image to fit or exceed the specified region while preserving aspect ratio.
    3.  Crops any portion of the image that exceeds the specified region.
    
-   **cover:** Resizes the image to cover or exceed the specified region.

    <Callout type="info">

      If the specified region's aspect ratio does not match the source image, then the optimized image will extend beyond one of the specified dimensions.

	</Callout>

-   **bounds:** Resizes the image to fit within the specified region.

    <Callout type="info">

      If the specified region's aspect ratio doesn't match the source image, then the optimized image will fall short of one of the specified dimensions.
      
    </Callout>

-   **smart:** Centers with content awareness, resizes, and then crops the image through the following workflow:

    1.  Identifies the image's subject matter and centers it within the specified region.
    2.  Resizes the image to fit or exceed the specified region while preserving aspect ratio.
    3.  Crops any portion of the image that exceeds the specified region.

[View sample implementations.](#image-resizing-examples)

### Format {/*format*/}

Encodes the image to the specified format. Valid values are:

`jpg | jpeg | pjpg | pjpeg | png | ppng | webp | tiff | tif`

<Callout type="info">

  Use `pjpg`, `pjpeg`, or `ppng` to encode a progressive JPEG or PNG image.
  
</Callout>

**Example:** `?format=png`

[Try now](https://edgeio.whitecdn.com/demo.jpg?format=png).

### Height {/*height*/}

Sets the height, in pixels, for the optimized image. Valid values are from 1 to 4096.

<Callout type="info">

  Maintain the source image's aspect ratio when resizing an image by specifying either the [width](#width) or `height` parameter. Specifying both parameters may cause the optimized image to differ in aspect ratio.
  
</Callout>

<Callout type="info">

  {{ PRODUCT }} does not upscale images. 
  
  [Learn more.](#upscaling-images)
  
</Callout>

**Example:** `?height=313`

![](https://edgeio.whitecdn.com/demo.jpg?height=313)

[Try now](https://edgeio.whitecdn.com/demo.jpg?height=313).

### Pad {/*pad*/}

Adds pixels between the edge of the image and its outer border. Specify `pad` using either of the following units:

-   Pixels
-   Percentage of an optimized image's dimension. Specify this percentage as a decimal value (e.g., 0.). For example, setting a value of 0.1 for the top position adds a 10% pad.

**Syntax:** 

-   `?pad=<TOP>,<RIGHT>,<BOTTOM>,<LEFT>`
-   You may implicitly apply padding by omitting one or more positions.
    -   `?pad=<TOP>,<LEFT & RIGHT>,<BOTTOM>`
    -   `?pad=<TOP & BOTTOM>,<LEFT & RIGHT>`
    -   `?pad=<ALL POSITIONS>`

**Examples:**

Pass the following query string to resize a 3520 x 2347 image to 420 x 280 and then apply a 5% pad to the optimized image:

`?width=420&pad=0.05`

Our service will disproportionately pad 14 pixels (280 x 0.05) will be added to the top and bottom of the image, while 21 pixels (420 x 0.05) will be added to the left and right of the image. the image since its width is larger than its height.

[Try now.](https://edgeio.whitecdn.com/demo.jpg?width=420&pad=0.05)

Alternatively, pass the following query string to specify the same padding in pixels:

`?width=420&pad=14,21`

![](https://edgeio.whitecdn.com/demo.jpg?width=420&pad=14,21)

[Try now.](https://edgeio.whitecdn.com/demo.jpg?width=420&pad=14,21)

### Quality {/*quality*/}

Sets the quality level for an image that uses lossy compression. Valid values are from 1 to 100.

<Callout type="tip">

  This setting balances an image's file size with quality. Higher numbers improve image quality while increasing file size. Likewise, lower numbers reduce file size while reducing image quality.
  
</Callout>

<Callout type="info">

  Lossy compression discards image data to reduce file size. For example, jpg and webp are examples of lossy image formats.

</Callout>

**Example:** `?quality=75`

[Try now](https://edgeio.whitecdn.com/demo.jpg?quality=75).

**Default value:** 80

### Rotate {/*rotate*/}

Rotates the image clockwise by the specified degrees. Valid values are from 1 to 360.

**Example:** `?rotate=90`

![](https://edgeio.whitecdn.com/demo.jpg?width=320&fit=bounds&rotate=90)

[Try now](https://edgeio.whitecdn.com/demo.jpg?rotate=90).

### Strip {/*strip*/}

Set to `1` to remove metadata (i.e., EXIF, IPTC-IIM, and XMP) from the image.

**Example:** `?strip=1`

[Try now](https://edgeio.whitecdn.com/demo.jpg?strip=1).

### Trim {/*trim*/}

Removes the image's outer pixels. Specify `trim` using either of the following units:

-   Pixels
-   Percentage of a source image's dimension. Specify this percentage as a decimal value (e.g., 0.). For example, setting a value of 0.1 for the top position removes 10% from the top of the optimized image.
    
**Syntax:** 

-   `?trim=<TOP>,<RIGHT>,<BOTTOM>,<LEFT>`
-   You may implicitly apply trim by omitting one or more positions.

    -   `?trim=<TOP>,<LEFT & RIGHT>,<BOTTOM>`
    -   `?trim=<TOP & BOTTOM>,<LEFT & RIGHT>`
    -   `?trim=<ALL POSITIONS>`

**Examples:**

Pass the following query string to resize a 3520 x 2347 image to 460 x 307 and then apply a 9% trim to the optimized image:

`?width=460&trim=0.09`

Our service will disproportionately trim the image since its width is larger than its height. 28 pixels (307 x 0.09) will be removed from the top and bottom of the image, while 41 pixels (460 x 0.09) will be removed from the left and right of the image. 

[Try now.](https://edgeio.whitecdn.com/demo.jpg?width=460&trim=0.09)

Alternatively, pass the following query string to specify the same trim effect in pixels:

`?width=460&trim=28,41`

![](https://edgeio.whitecdn.com/demo.jpg?width=460&trim=28,41)

[Try now.](https://edgeio.whitecdn.com/demo.jpg?width=460&trim=28,41)

### Width {/*width*/}

Sets the width, in pixels, for the optimized image. Valid values are from 1 to 4096.

<Callout type="info">

  [Data advertised by a client](#client-driven-image-optimizations-client-hints) takes precedence over this parameter.
  
</Callout>

<Callout type="info">

  {{ PRODUCT }} does not upscale images. 
  
  [Learn more.](#upscaling-images)
  
</Callout>

<Callout type="info">

  Maintain the source image's aspect ratio when resizing an image by specifying either the width or [height](#height) parameter. Specifying both parameters may cause the optimized image to differ in aspect ratio.
  
</Callout>

**Example:** `?width=460`

![](https://edgeio.whitecdn.com/demo.jpg?width=460)

[Try now.](https://edgeio.whitecdn.com/demo.jpg?width=460)

### Wurfl {/*wurfl*/}

Set to `1` to automatically define a default width based off what your mobile device can display.

**Key information:**

-   An image will maintain its aspect ratio when it is resized as a result of this parameter.
-   Both the [width](#width) and [height](#height) parameters override this parameter.
-   This parameter is only applicable for mobile devices. It will be ignored when requesting an image from other devices.

**Example:** `?wurfl=1`

[Try now.](https://edgeio.whitecdn.com/demo.jpg?wurfl=1)

## Client-Driven Image Optimizations (Client Hints) {/*client-driven-image-optimizations-client-hints*/}

Image optimizations can be tailored according to information that the client advertises about the user's device and network conditions.

#### Setup {/*setup*/}

Perform the following steps to set up client-driven image optimizations:

1.  Provide client hints by including either an `Accept-CH` header or `<meta>` tag in the response sent to the client.
    
    **Key information:**
    
    -   Client hints inform the client as to the type of client data that the server will accept. 
    -   Include an `Accept-CH-Lifetime` header or `<meta>` tag to indicate the length of time that the client should remember the supported set of client hints.
    -   Use a rule to automatically set the `Accept-CH` response header through the [Set Response Headers feature (set_response_headers)](/guides/performance/rules/features#set-response-headers). Set the **Header Name** option to `Accept-CH` and the **Value** option to the desired client hints (e.g., `DPR, Width, Viewport-Width`).

    **Response header example:**

    `Accept-CH: DPR, Viewport-Width, Width, ECT, Downlink`
    `Accept-CH-Lifetime: 86400`
    
    **&lt;meta> tag example:**
    
    `<meta http-equiv="Accept-CH" content="DPR, Viewport-Width, Width, ECT, Downlink">`
    `<meta http-equiv="Accept-CH-Lifetime" content="86400">`
    
2.  Verify that your client advertises the desired data.
    
    Upon receiving a request for data, a client should respond with the data requested in the `Accept-CH` response header by including the corresponding request headers (e.g,. `DPR` and `ECT`).
    
3.  Optional. Define a default set of image optimizations through [query string parameters](#query-string-parameters).
    
    {{ PRODUCT }} optimizes your images based off both client hints and query string parameters. However, client hints take precedence when conflicting instructions are provided.

#### Sample Scenario {/*sample-scenario*/}

In this scenario, a web browser receives a response with the following header:

`Accept-CH: DPR, ECT`

The web browser will interpret this as a request for its device pixel ratio and connection type. As a result, it should submit a request that contains `DPR` and `ECT` headers. Sample request headers are shown below.

`DPR: 2`
`ECT: 2g`

{{ PRODUCT }} will then use this information to optimize the requested image. In this case, it will double the resolution of the source image and reduce image quality by 65%. {{ PRODUCT }} will also apply any optimizations defined within the request's query string.

#### Request Headers for Client Hints {/*request-headers-for-client-hints*/}

A client advertises device information and network conditions through request headers. The manner in which {{ PRODUCT }} will interpret this data is described below.

-   **Downlink:** Reduces image quality to 60% and strips metadata when the request includes a `Downlink` header and it is set to a value below 0.5. 

    <Callout type="info">

      A `Downlink` header that meets the above requirement overrides the [quality](#quality) and [strip](#strip) query string parameters.
      
    </Callout>
    
	<Callout type="info">

      The `Downlink` header indicates the client's maximum downlink speed in megabits per second (Mbps). 
      
    </Callout>
    
-   **DPR:** Resizes an image according to the device pixel ratio defined within the `DPR` request header.
    
    <Callout type="info">

      The `DPR` request header overrides the [dpr query string parameter](#dpr). Images will be resized according to the `dpr` query string parameter when the `DPR` request header is missing.
      
    </Callout>
	
    <Callout type="info">

      {{ PRODUCT }} does not upscale images. 
	  
	  [Learn more.](#upscaling-images)
      
    </Callout>

    **Sample DPR Request Header:**
    
    The following `DPR` request header indicates that the client's ratio of physical pixels to CSS pixels is 2:1.
    
    `DPR: 2`
    
    {{ PRODUCT }} will double the resolution of the optimized image.
    
-   **ECT:** Reduces image quality to 60% and strips metadata when the request includes an `ECT` header and it is set to a value other than 4g or 3g. Valid values are:
    
    `4g | 3g | 2g | slow-2g`

    <Callout type="info">

      An `ECT` header that meets the above requirement overrides the [quality](#quality) and [strip](#strip) query string parameters.
      
    </Callout>
	
    <Callout type="info">

      The `ECT` header (Effective Connection Type) describes a client's connection by indicating the network profile that it most resembles. 
      
    </Callout>

-   **Save-Data:** Reduces quality to 45% and strips metadata when both of the following conditions are met:
    
    -   The request includes a `Save-Data` header and it is set to `On`.

        <Callout type="info">

          The `Save-Data` header indicates that less data should be sent. 
      
        </Callout>

    -   The [auto parameter](#auto) is set to `save-data`.

    <Callout type="info">

      A `Save-Data` header that meets the above requirement overrides the [quality](#quality) and [strip](#strip) query string parameters.
      
    </Callout>
    
-   **Viewport-Width:** {{ PRODUCT }} uses the viewport's width to calculate an image's dimensions, resolution, or both.

    <Callout type="info">

      The `Viewport-Width` request header overrides the [width](#width) and [height](#height) query string parameters.
      
    </Callout>

    <Callout type="info">

      The viewport identifies the viewable area of the window where web content is shown.
      
    </Callout>
	
    <Callout type="info">

      {{ PRODUCT }} does not upscale images. 
	  
	  [Learn more.](#upscaling-images)
      
    </Callout>

    **Example:**
    
    In this example, a web browser advertises information through the following elements:
    
    -   **Request Headers:**
        
        `DPR: 2`

		`Viewport-Width: 75vw`
        
    -   **&lt;img> tag:**
        
        `<img src="img_bunny.jpg" alt="bunny hopping in a garden" width="380" height="456">`
        
    {{ PRODUCT }} will use this information to resize the image. Specifically, it will calculate the image's width by doubling the device's width and then reducing it by 75% to fit within the viewport's width. In order to maintain aspect ratio, it will apply the same transformations to the image's height. The dimensions for the resulting image are 570 x 684..
    
    `0.75 * (380 * 2) = 570`

    `0.75 * (456 * 2) = 684`
    
-   **Width:** Resizes an image to fit within the width defined within an `<img>` or `<source>` tag.

    <Callout type="info">

      {{ PRODUCT }} does not upscale images. 
	  
	  [Learn more.](#upscaling-images)
      
    </Callout>    

    **Example:**
    
    In this example, a web browser advertises information through the following `<img>` tag:
    
    `<img src="img_bunny.jpg" alt="bunny hopping in a garden" width="500" height="600">`
    
    {{ PRODUCT }} will resize the image's width to 500 pixels.

## Caching {/*caching*/}

If your caching configuration allows it, our CDN caches both the source and optimized image. This improves performance for subsequent requests for that image in the same region, regardless of whether different optimizations will be applied to it.

-   **Same Optimizations:** It allows our CDN to serve subsequent requests for that image with the same set of optimizations from cache. This improves performance by eliminating the need to retrieve the image and then optimize it.
    
-   **Different Optimizations:** It allows {{ PRODUCT }} to optimize an image without having to retrieve it from an origin server.
    
Our CDN caches each unique optimized image. Our CDN builds the optimized image's cache key through its path and the set of transformations that were applied to it.

**Key information:**

-   Ensure optimal performance by ensuring that image optimization query string parameters are not explicitly added to the cache key. 

    <Callout type="important">

	  We strongly recommend that you avoid setting up query string caching to exclude all query string parameters. This mode prevents our CDN from serving images that have already been processed by {{ PRODUCT }}.

	</Callout>

    <Callout type="tip">

	  We recommend that you restrict query string caching to query string parameters that are critical to your business needs. This recommendation ensures optimal performance by allowing our CDN to serve more requests from cache. Additionally, it reduces or eliminates unnecessary image processing due to a cache miss.

	</Callout>

-   For the purposes of caching an optimized image, our CDN translates the `auto` query string parameter to reflect the optimizations that will be applied to the image.
    
    **Example:** This example assumes that the request contains the following query string:
    
    `?auto=webp`
    
    If the client indicates that it supports the WebP format, then we will convert the image and cache the WebP image with the following query string:
    
    `?format=webp`
    
-   For the purposes of caching an optimized image, our CDN translates the client hints provided by a client to reflect the optimizations that will be applied to the image.
    
    **Example:** A sample request for a 640 x 480 image contains the following headers:
    
    `DPR: 2`

    `Width: 320`
    
    These headers instruct {{ PRODUCT }} to expand the width of the image to 640 pixels and cache it with the following query string:
    
    `?width=640`
    
-   In addition to the above optimizations, {{ PRODUCT }} normalizes the cache key generated for an optimized image. This step is required to allow our CDN to serve an optimized image from cache regardless of the order in which a set of transformations are defined in the request.
    
    **Example:** {{ PRODUCT }} will generate the same cache key for both of the following requests:
    
    `https://cdn.example.com/image.jpg?width=640&blur=50`

    `https://cdn.example.com/image.jpg?blur=50&width=640`
    
-   As a result of the above optimizations and cache key normalization, the default cache key generated by {{ PRODUCT }} should provide optimal cache performance. 
    
## Response {/*response*/}

The response from our CDN varies according to results for the request to optimize an image.

|Response|HTTP Status Code|Description|
|--- |--- |--- |
|Optimized Image|200 OK|{{ PRODUCT }} optimized the requested image. The response will include the following header: <br />`x-edgeio-status: OK`|
|Partially Optimized Image|200 OK|{{ PRODUCT }} only performed some of the requested optimizations. It skipped one or more optimizations since it would have caused the image to be [upscaled](#upscaling-images). The response will include the following headers: <br />`x-edgeio-status: OK` <br />`x-edgeio-warning: Images cannot be upscaled. Requested dimensions: <WIDTH> x <HEIGHT>`|
|Source Image|200 OK|{{ PRODUCT }} was unable to optimize the requested image because the optimized image exceeds our limits. Check the request URL and try again. The response will include the following headers:<br />`x-edgeio-status: ERROR`<br />`x-edgeio-error: Error Message`<br /><br />Check the `x-edgeio-error` response header for additional information on why the request failed.|
|No Image|400 Bad Request|{{ PRODUCT }} was unable to optimize the requested image due to an unsupported query string parameter or value. Check the request URL and try again. The response will include the following headers:<br />`x-edgeio-status: ERROR`<br />`x-edgeio-error: Error Message`<br /><br />Check the `x-edgeio-error` response header for additional information on why the request failed.|
|No Image|5xx|{{ PRODUCT }} was unable to communicate with your origin server and both the source and optimized image were not previously cached.|

## Bypassing {{ PRODUCT }} Image Optimization {/*bypassing-image-optimization*/}

Prevent {{ PRODUCT }} from transforming an image by including the following header in the request:

`x-ec-edgeio-disable:1`

This configuration allows our CDN to deliver the source image to the client.

## Troubleshooting {/*troubleshooting*/}

Perform basic troubleshooting by examining basic properties for the source and transformed image. Include this information in the response by setting the `x-ec-edgeio-debug` request header to `info`.

**Request header syntax:** `x-ec-edgeio-debug: info`

The above request header instructs {{ PRODUCT }} to describe the source and output image within the `x-edgeio-info` response header.

**Sample response header:** `x-edgeio-info: ifsz=7998538; idim=3520x2347; ifmt=jpeg; ofsz=16980; odim=360x240; ofmt=jpeg; oq=80`

The keys defined within the `x-edgeio-info` response header are described below.

|Name|Description|
|--- |--- |
|ifsz | File Size (Input). Indicates the source image's file size in bytes.|
|idim | Dimensions (Input). Indicates the source image's dimensions. <br />**Syntax:** `<WIDTH>x<HEIGHT>`|
|ifmt | File Format (Input). Indicates the source image's file format.|
|ofsz | File Size (Output). Indicates the output image's file size in bytes.|
|odim | Dimensions (Output). Indicates the output image's dimensions. <br />**Syntax:** `<WIDTH>x<HEIGHT>`|
|ofmt | File Format (Output). Indicates the output image's file format.|
|oq | Quality (Output). Indicates the output image's file quality level. Valid values are from 1 to 100.|
|ms | Milliseconds. Indicates the number of milliseconds it took to transform the image.|

#### Upscaling Images {/*upscaling-images*/}

{{ PRODUCT }} does not upscale images. If the requested optimization results in an image that exceeds the dimensions of the source image, then {{ PRODUCT }} will not resize it. However, it will still perform any other requested optimizations.

## Image Resizing Examples {/*image-resizing-examples*/}

We will apply different fit modes to a source image (3520 x 2347 pixels) that has been resized to 500 x 500 using the following query string:

`?width=500&height=500`

![](https://edgeio.whitecdn.com/demo.jpg?width=500&height=500)

[Try now.](https://edgeio.whitecdn.com/demo.jpg?width=500&height=500)

#### Crop

Applying crop mode will proportionately crop the width from both sides of the image. This occurs because the source image's aspect ratio is different than the specified region.

**Query string:** `?width=500&height=500&fit=crop`

![](https://edgeio.whitecdn.com/demo.jpg?width=500&height=500&fit=crop)

[Try now.](https://edgeio.whitecdn.com/demo.jpg?width=500&height=500&fit=crop)

#### Cover

Applying `cover` mode resizes the image's height to 500 pixels. However, the image's width will extend beyond the `width` parameter in order to maintain the source image's original aspect ratio.

**Query string:** `?width=500&height=500&fit=cover`

![](https://edgeio.whitecdn.com/demo.jpg?width=500&height=500&fit=cover)

[Try now.](https://edgeio.whitecdn.com/demo.jpg?width=500&height=500&fit=cover)

#### Bounds

Applying bounds mode resizes the image's height to 500 pixels. However, the image's width will fall short of the `width` parameter in order to maintain the source image's original aspect ratio while ensuring that the image fits within the specified region.

**Query string:** `?width=500&height=500&fit=bounds`

![](https://edgeio.whitecdn.com/demo.jpg?width=500&height=500&fit=bounds)

[Try now.](https://edgeio.whitecdn.com/demo.jpg?width=500&height=500&fit=bounds)

#### Smart

Applying smart mode centers the image on its subject matter and then proportionally crops the width from both sides of the image. This occurs because the source image's aspect ratio is different than the specified region.

**Query string:** `?width=500&height=500&fit=smart`

![](https://edgeio.whitecdn.com/demo.jpg?width=500&height=500&fit=smart)

[Try now.](https://edgeio.whitecdn.com/demo.jpg?width=500&height=500&fit=smart)
