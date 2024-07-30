---
title: Sign Playback URL Tutorial
---

Learn how to generate a signed playback URL that controls when content may be played. This tutorial provides instructions on how to stream a single asset. However, the same steps may be used to implement a media player that plays back a live channel or a live event.

**Software Prerequisites**: PHP-enabled web server

**Knowledge Prerequisites**

- Basic web server administration
- Basic HTML coding
- Basic PHP coding

**Key Steps**

1. Create a media player within a PHP file.
2. Add code to generate an authorized playback URL.
3. Test playback.

## Step 1 - Verify PHP Installation

This tutorial leverages PHP code to generate an authorization token that authorizes a media player to play back content. Since this PHP code is executed on the server, it requires PHP to be installed on the web server hosting the media player. The purpose of this step is to verify that PHP is properly installed.

<Tip>Although this tutorial uses PHP, authorization tokens can be generated using any server-side language or environment.</Tip>

1. Open a text editor.

2. Type the following code:

   ```php
   <?php
       echo "Hello, World!";
   ?>
   ```

3. Save the file as `test.php`.

4. Upload it to a directory on your web server that can execute PHP code.

5. Load `test.php` in a web browser.

   **Sample URL**: `http://www.example.com/test.php`

6. Verify that the web page looks similar to the following illustration:

    ![PHP](/images/uplynk/php.png)

    If the web page looks different, check the following items:

    - Verify that the code defined in test.php matches the code defined above.
    - Verify that PHP has been properly installed on your web server.

## Step 2 - Implement a Media Player in PHP

A media player is required to playback content. The easiest way to implement a media player within a PHP file is to simply rename the web page created in the [Adding a Media Player to a Web Page](/uplynk/deliver/media_player/add_media_player_to_web_page) tutorial.

1. Follow the [Adding a Media Player to a Web Page](/uplynk/deliver/media_player/add_media_player_to_web_page) tutorial to create `player.html`.

2. Rename `player.html` to `player.php`.

3. Move `player.php` to the directory where `test.php` was uploaded.

4. Load `player.php` in a web browser to verify that it can still playback content.

## Step 3 - Re-enable the URL Signature Requirement

The [Adding a Media Player to a Web Page](/uplynk/deliver/media_player/add_media_player_to_web_page) tutorial disabled the requirement for a digitally signed playback URL to remove any potential obstacles for content playback in a test environment. Once the asset is ready for playback in a production environment, this requirement should be reapplied to prevent unauthorized playback.

1. From the CMS, navigate to the [**Content**](https://cms.uplynk.com/static/cms2/index.html#/content) tab and then select the asset associated with `player.php`.

2. Mark the **Require a token for playback** option.

3. Click **Save**.

4. Reload `player.php`. It should no longer allow playback, as playback now requires a digitally signed playback URL.

## Step 4 - Implement Token Generation

Update the PHP file to generate a playback URL that authorizes playback for any viewer by:

1. Adding a function that:
   - Authenticates to our system using your API key.
   - Sets the requested content's Internet media type to "a."
   - Extracts the content ID from the playback URL.
   - Creates a hash value from the viewer's IP address.
   - Expires the signed playback URL after 300 seconds (recommended expiration time is 20 to 60 seconds).
   - Creates a token based on the above information that signs the playback URL.
   - Generates a signed playback URL. [Learn more about signing a playback URL](/uplynk/deliver/playback_urls/#signing-playback-urls-with-token).

2. Calling the above function when requesting content playback. This will insert an authorized playback URL into the media player code.

3. Open `player.php` in a text editor.

4. Add the following PHP function at the beginning of the file:

   ```php
   <?php
       function Call($uri)
       {
           $SECRET = 'API_Key';
           $msg = array();
           $msg['exp'] = time() + 300; // Expire 5 minutes from now.
           $msg['ct'] = 'a'; // Asset
           $parts = parse_url($uri);
           list($part1, $part2) = explode('.', $parts['path']);
           $msg["cid"] = substr($part1, 1);
           $msg['iph'] = hash('sha256', $_SERVER['REMOTE_ADDR']);
           $msg

5. Copy your API key.

    - Navigate to the [**Integration Keys** page](https://cms.uplynk.com/static/cms2/index.html#/settings/integration-keys) by clicking the **Settings** tab and then clicking **Integration Keys** from the side navigation tab.
    - Your API key(s) are listed under the API Keys section.

6. Replace the API_Key variable with your API key as shown below on line 4.

    ```php
    <?php
        function Call($uri)
        {
            $SECRET = '1234567890abcdefghijklmnopqrstuvwxyzABCD';
            $msg = array();
            $msg['exp'] = time() + 300; // Expire 5 minutes from now.
            $msg['ct'] = 'a'; // Asset
            $parts = parse_url($uri);
            list($part1, $part2) = explode('.',$parts['path']);
            $msg["cid"] = substr($part1,1);
            $msg['iph'] = hash('sha256', $_SERVER['REMOTE_ADDR']);
            $msg['sig'] = hash_hmac('sha256', http_build_query($msg), $SECRET);
            return $uri . '?' . http_build_query($msg);
        }
    ?>

    <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
    <html>
    ...
    </html>
    ```

7. Modify the function that initiates playback as indicated on line 10. Make sure to replace the playback URL with the one that corresponds to the desired content.

    ```php
    <?php
        function Call($uri)
    ...
    <body>
        <p>
        Hello, World!
        </p>
        <div id="videoPlayer"></div><script type="text/javascript">
    $(function(){
        $('#videoPlayer').player('play', '<?php echo Call('https://content.uplynk.com/468ba4d137a44f7dab3ad028915d6276.m3u8'); ?>');
        });
        </script>
    </body>
    </html>
    ```
8. Save player.php.

9. From your web browser, refresh player.php to playback your content. Playback will be authorized after the system verifies that a valid token was included with the playback request.

## Step 5 - Optional. Validate Tokens

Server-side logic may be added to selectively allow playback, such as requiring login credentials or restricting content to certain regions. To ensure that valid tokens are being generated, the CMS provides the capability to validate tokens.

<Info>A digitally signed playback URL expires after a given duration. The token generated in this tutorial expires after 300 seconds (i.e., 5 minutes). Please complete this step within 300 seconds.</Info>

1. Generate a new token by refreshing `player.php` from your web browser.

2. View the source code for `player.php` from your web browser.

3. Find and copy the entire playback URL, including its query string:

   ```javascript
   $(function(){
       $('#videoPlayer').player('play', 'https://content.uplynk.com/de01164a50d04847b5624485dae1dac3.m3u8?exp=1450813114&ct=a&cid=de01164a50d04847b5624485dae1dac3&iph=eff8e7ca506627fe15dda5e0e512fcaad70b6d520f37cc76597fdb4f2d83a1a3&sig=90c34a424037f4f85733f6487539da0a39fefa82ff02164ec2f811467773ace2');
   });
    ```

4. Navigate to the [Integration Keys page](https://cms.uplynk.com/static/cms2/index.html#/settings/integration-keys).

5. Paste the playback URL into the field provided within the Test Playback Tokens section.

6. Click **Test Token Auth URL**.

7. Review the results of the playback token test.
