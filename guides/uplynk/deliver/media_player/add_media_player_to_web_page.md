---
title: Add a Media Player to a Web Page
---

Learn how to add a media player to a web page hosted on a web server.

This section provides instructions on how to host a media player that can stream an asset. However, the same steps may be used to implement a media player that plays back a live channel or a live event.

**Software Prerequisites**:

- Web server

**Knowledge Prerequisites**:

- Basic web server administration
- Basic HTML coding

## Key Steps:

1. Verify web server access.
2. Link to libraries.
3. Play content.

## Step 1 - Verify Web Server Access

1. Verify write access to the desired web server by uploading an HTML file.
2. Open a text editor.
3. Save the following code as an HTML file called "player.html":

   ```html
   <!DOCTYPE html>
   <html>
     <head>
       <title>Add a Media Player to a Web Page</title>
     </head>
     <body>
       <p>Hello, World!</p>
     </body>
   </html>
   ```

4. Upload the above HTML file (player.html) to the root folder of the desired web server.
5. Open a web browser and load the web page (http://www.example.com/player.html).
6. Verify that the web page looks similar to the following illustration:

    ![MPA Player](/images/uplynk/mpa-player.png)

## Step 2 - Add Library Links

1. Add a media player to the web page by adding links to:
   - **jQuery:** jQuery is a popular JavaScript helper library that facilitates common tasks with an API that works across multiple browsers.
   - **Media Player:** This media player is implemented as a jQuery plugin. The script that references this plugin runs after the page loads, ensuring that the player is loaded into the div container.

2. Modify `player.html` to match the following code:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Add a Media Player to a Web Page</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script type="text/javascript" src="http://storage.uplynk.com/js/swfobject.js"></script>
    <script type="text/javascript" src="http://storage.uplynk.com/js/uplynk.js"></script>
    <style type="text/css">
      html { margin: 0; padding: 0; border: 0; outline: 0; }
      body { background-color: #000; overflow: hidden; }
      #videoPlayer { position: absolute; top: 0; bottom: 0; left: 0; right: 0; }
    </style>
  </head>
  <body>
    <p>Hello, World!</p>
    <div id="videoPlayer"></div>
    <script type="text/javascript">
      $(function(){
        $('#videoPlayer').player('play', 'https://content.uplynk.com/468ba4d137a44f7dab3ad028915d6276.m3u8');
      });
    </script>
  </body>
</html>
```
3. From your web browser, refresh player.html. The playback of a video called "Big Buck Bunny" should start.

## Step 3 - Play Your Own Content

By default, playback is only allowed when the playback URL has been signed. This security feature prevents playback when a digital signature is not present. For the sake of simplicity during player development, this tutorial disables this security feature on a particular asset. However, it should be re-enabled once the player is ready for the production environment.

[See how to sign a playback URL](/uplynk/deliver/playback_urls/sign_playback_url).

1. **Disable signature requirement on the desired asset:**

   - From the CMS, navigate to the [Content tab](https://cms.uplynk.com/static/cms2/index.html#/content) and then select the desired asset.
   - Go to the Playback tab.
   - Clear the **Require a token for playback** option.
   - Click **Save**.

2. **Copy the playback URL:**

   - From the CMS, navigate to the [Content tab](https://cms.uplynk.com/static/cms2/index.html#/content) and then select the desired asset.
   - Go to the Playback tab.
   - Click **Copy** next to either the HLS or DASH playback URL.

3. **Update `player.html` with the playback URL:**

   - Locate the script tag at the bottom of the HTML code in `player.html`.
   - Replace the playback URL with the desired asset's playback URL (line 12).

        ```html
        <!DOCTYPE html>
        <html>
            <head>
            <title>Add a Media Player to a Web Page</title>
            </head>
            <body>
            <p>Hello, World!</p>
            <div id="videoPlayer"></div>
            <script type="text/javascript">
                $(function(){ $('#videoPlayer').player('play', 'https://content.uplynk.com/asset/5fa468149f304cbca25db3f4268c2654.mpd'); });
            </script>
            </body>
        </html>
        ```

4. Save player.html and then upload it to the root folder of your web server.

5. From your web browser, refresh player.html. The playback of the desired asset should start.
