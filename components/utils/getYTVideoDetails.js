import get from 'lodash/get'

/**
 * Gets the metadata of a YouTube video. Reference to response type:
 * https://developers.google.com/youtube/v3/docs/videos/list#response
 *
 * @param {String} videoId Either the video ID or full URL including it
 *
 * @return {Object}
 */
export default function getYTVideoDetails(videoId) {
  const reVideoId = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i

  // get ID from URL or default to unchanged argument if no match
  videoId = get(reVideoId.exec(videoId), '1', videoId)

  return {
    fullUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0`,
  }

  // left available to future use of YT API
  // const apiKey = ''
  // const apiUrl = `https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&id=${videoId}&part=snippet%2CcontentDetails`

  // const details = await fetch(apiUrl)
  //   .then(res => res.json())
  //   .catch(e => {
  //     console.error(`Error fetching video '${videoId}'`, e)
  //     return {}
  //   })
  // return assign(
  //   {
  //     fullUrl: `https://www.youtube.com/watch?v=${videoId}`,
  //     embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0`,
  //   },
  //   get(details, 'items.0'),
  // )
}
