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

https://opt.moovweb.net?quality=30&img=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F68%2FGrass_dsc08672-nevit.jpg%2F2560px-Grass_dsc08672-nevit.jpg

Height example: `https://opt.moovweb.net?height=300&img=<SOURCE IMAGE URL>`

https://opt.moovweb.net?height=300&img=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F68%2FGrass_dsc08672-nevit.jpg%2F2560px-Grass_dsc08672-nevit.jpg

