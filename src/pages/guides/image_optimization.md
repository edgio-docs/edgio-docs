---
title: Image Optimization
---

{{ PRODUCT_NAME }} provides a simple HTTP service for optimizing images:

```js
https://opt.moovweb.net
```

The API accepts the following query parameters:

Required:

- `img` - the source image URL

Optional (specify one of the following):

- `quality` - quality between 1 and 99
- `width` - the maximum output width
- `height` - the maximum output height

The image optimizer will only return an optimized image for mobile browsers. Desktop browsers are served the original image.

## Examples {/*examples*/}

Quality:
![Grass with quality option set](https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Grass_dsc08672-nevit.jpg/2560px-Grass_dsc08672-nevit.jpg?quality=30)

Height:
![Grass with height option set](https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Grass_dsc08672-nevit.jpg/2560px-Grass_dsc08672-nevit.jpg?height=300)
