# Image Optimization

The Moovweb XDN provides a simple HTTP service for optimizing images:

```js
https://opt.moovweb.net
```

The API accepts the following query parameters:

Required:

- img - the source image URL

Optional (specify one of the following):

- quality - quality between 1 and 99
- width - the maximimum output width
- height - the maximimum output height

The image optimizer will only return an optimized image for mobile browsers. Desktop browsers are served the original image.

## Examples:

Quality:

https://opt.moovweb.net?quality=30&img=https://opt.moovweb.net/?img=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F68%2FGrass_dsc08672-nevit.jpg%2F2560px-Grass_dsc08672-nevit.jpg

Height:

https://opt.moovweb.net?height=300&img=https://opt.moovweb.net/?img=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F6%2F68%2FGrass_dsc08672-nevit.jpg%2F2560px-Grass_dsc08672-nevit.jpg
