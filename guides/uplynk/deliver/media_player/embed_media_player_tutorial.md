---
title: Embed Media Player Tutorial
---

Learn how to embed a media player to Tumblr, Blogger, or a self-hosted web page.

Software Prerequisites

- CMS or
- Web server

Knowledge Prerequisites

- Basic CMS administration or
- Basic web hosting

Key Steps

1. Copy the embed media player code.
2. Paste the embed media player code.
3. Apply security to the embedded media player.

## Step 1 - Copy the HTML Embed Code

The CMS provides HTML code that may be embedded onto a web page.

1. Sign in to the [CMS](https://cms.uplynk.com/static/cms2/index.html).

2. Select one of the following:
   - Asset: From the [Content tab](https://cms.uplynk.com/static/cms2/index.html#/content), select the desired asset.
   - Live Event: From the [Live Events page](https://cms.uplynk.com/static/cms2/index.html#/live-events/events), select the desired live event.
   - Live Channel: From the Live Channels tab, select the desired live channel.

3. Click the Playback tab.

4. Optional: Set the dimensions, in pixels, for the embedded media player through the iFrame Width and iFrame Height options.

5. Click Copy to copy the HTML code provided under the Embed HTML option.

## Step 2 - Paste the HTML Embed Code

The HTML embed code provided within the CMS is compatible with a variety of platforms. Instructions are provided below on how to add it to various popular solutions.

### Tumblr

1. Log in to [Tumblr](http://tumblr.com/).
2. Open the [Dashboard](http://www.tumblr.com/dashboard).
3. Click Video to create a video entry.
4. From the Add a Video page, paste the embed code into the Embed a Video tab.
5. Click Create Post and then view the embedded video.

### Blogger: Embed Video Within a Post

1. Log in to [Blogger](http://www.blogger.com/).

2. Create a post.

3. Click HTML to edit the source code for the new post.

4. Paste the embed code on a new line at the end of the HTML code.

5. Click Publish and then view the embedded video.

## Self-Hosted Web Page: Embed Video

1. Open the desired HTML file within a text editor.

2. Paste the embed code within the `<body>` tag (lines 7 - 13).

   Sample HTML code:

   ```html
   <html>
     <head>
       <title>My Sample Web Page</title>
     </head>
     <body>
       ...
       <p>Body text goes here.</p>
       <iframe style="border:none" allow="encrypted-media" width="640" height="480" src="https://content.uplynk.com/player5/345pms4DsfMCxnPXoChv0def.html"></iframe>
     </body>
   </html>

3. Save your changes.

4. Upload the updated HTML file to the desired web server.

5. Load the web page and view the embedded video.

## Step 3 - Optional: Restrict Playback to Specific Domains

Playback of the content referenced within embedded code may be restricted to a set of authorized domains. Attempting playback from an unauthorized domain will result in a "Not found" message.

Example

If you set `www.example.com` as the only allowed domain, playback will only be permitted when the player code is embedded on a web page accessed through the `www.example.com` domain.

This means that playback will be allowed for the following web page:
- [http://www.example.com/videos/marketing.html](http://www.example.com/videos/marketing.html)

The embedded video cannot be played back through any of the following web pages:
- [http://cdn.example.com/videos/marketing.html](http://cdn.example.com/videos/marketing.html)
- [http://www2.example.com/videos/marketing.html](http://www2.example.com/videos/marketing.html)
- [http://www.example.org/videos/marketing.html](http://www.example.org/videos/marketing.html)

Instructions

1. From the Playback tab, set the **Allowed Domains** option to a comma-separated list of domains that will be allowed to play your content via the embedded code.

2. Set the **Allowed Domains** option to a blank value to allow playback from any domain.

3. Click **Save**.

4. Test playback by refreshing the web page to which the player was embedded.

## Step 4 - Optional: Expire HTML Embed Code

Expire the HTML embed code associated with an asset, live event, or live channel to disable playback via that code. Upon expiring embed code, new embed code will be generated.

<Info>Expiring embed code takes effect immediately and is permanent. Attempting to playback expired embed code will result in a "Not found" message.</Info>

1. From the Playback tab, click **Expire Embed Code** to prevent playback using that version of the embed code.

2. Click **Save** to apply this change and to automatically generate new embed code.

3. Replace the HTML code that was embedded in step 2 with the updated version.
