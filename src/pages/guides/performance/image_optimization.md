---
title: Image Optimization
---

Optimize images by passing query string parameters to the following base URL:

```
https://opt.moovweb.net
```

## Source Image Requirement {/*source-image-requirement*/}

Images that use the following file formats are eligible for processing:

` jpg | jpeg | png | webp`

<Callout type="info">

  {{ PRODUCT }} delivers the source image when attempting to process an image that uses an unsupported file format.

</Callout>

## Query String Parameters {/*query-string-parameters*/}
Use the following query string parameters to identify an image and the set of optimizations that will be applied to it:

Required:

- `img` - the source image URL

Optional:

- `quality` - quality between 1 and 99
- `width` - the maximum output width
- `height` - the maximum output height

## Examples {/*examples*/}

Quality example: `https://opt.moovweb.net?quality=30&img=<SOURCE IMAGE URL>`

https://opt.moovweb.net?quality=30&img=https://docs.edg.io/images/performance/product-apps-image_optimization.png

Height example: `https://opt.moovweb.net?height=300&img=<SOURCE IMAGE URL>`

https://opt.moovweb.net?height=300&img=https://docs.edg.io/images/performance/product-apps-image_optimization.png

