# Bots

This guide describes provides general bot information and describes the bots that  {{ PRODUCT_NAME }}  detects. 

## General Information

  {{ PRODUCT_NAME }}  examines the `user-agent` header in an incoming request to determine if it includes a string that indicates if it is a bot, and if so, injects `1` in the `x-0-device-is-bot` request header, which will be visible to your server code. If the `user-agent` header does not include any of the strings indicating a bot, a `0` value is injected.

## User Agents and Bots

The following table list the user agents that  {{ PRODUCT_NAME }}  examines and describes the corresponding bots.

|User Agent|Bot Description|
|----------|-----------|
|embedly|Embed.ly web crawler bot that performs HTTP requests most often in automatic mode.|
|facebookexternalhit|Facebook bot that crawls the HTML of social plugins, apps, and websites shared on Facebook. The bot gathers and caches data (title, description, thumbnail image) about the shared content and presents the data as a preview.|
|flipboard|Flipboard Proxy Service bot that runs in response to a user request for the service to scan a social media feed such as Twitter, and construct a processed feed of items to deliver in real time.|
|googlepagesspeed|Google bot that assists in ranking search results based on page load speed.|
|Google web/snippet|Google+ Enterprise bot that extracts high-level data from a URL posted on Google+ Enterprise and presents the data as a snippet of the URL.|
|headless|Bots, usually scripts, that run on a scheduled basis or are triggered from an external system. Headless bots usually perform activities like sending alerts or daily digest messages. The scripts usually run for a short time, then terminate.|
|ia_archiver|Amazon Alexa bot that crawls web sites for issues related to Amazon's Site Audit service.|
|outbrain|Outbrain Recommendation Platform chat bot.|
|pinterest|Automated Pinterest bot that creates boards and schedules pins to post to customer accounts.|
|prerender|Prerender.io hosted service bot that produces an easily crawled version of dynamically rendered pages, allowing indexing by search engines.|
|preview|Yahoo bot that extracts data (title, description, thumbnail images) from a URL embedded in an email and presents the data as a preview of the URL|
|qwantify|Web crawler bot that indexes content for the Qwant search engine.|
|scanner|Bots that analyze how well your website and its security measures respond to various bot threats.|
|slurp|Yahoo Search bot for crawling and indexing web page information.|
|spider|General purpose automated bots that crawl the web to index web page information.|
|tumblr|Tumblr bot that performs automated HTTP requests as a web crawler.|
|vkshare|VK social network bot that performs automated HTTP requests usually as a web crawler.|
|w3c_validator|W3C bot that checks Web documents in formats like HTML and XHTML for conformance to W3C Recommendations and other standards.|
|whatsapp|Whatsapp platform chat bot.|
|xing-contenttabreceiver|Xing social network crawler bot that indexes content for the Xing social network.|
|yahoo|Another Yahoo Search robot for crawling and indexing web page information.|

If the set of bots detected by  {{ PRODUCT_NAME }}  is not sufficient, you can easily add your own bot detection using [EdgeJS](https://docs.layer0.co/guides/routing) and its `match` and `setRequestHeader` APIs:

```js
router.match(
  {
    headers: {
      'user-agent': /^regex-for-your-bot-detection$/i
    },
  },
  ({ setRequestHeader }) => {
    setRequestHeader('my-bot-detection-is-bot', '1')
  }
)
```
