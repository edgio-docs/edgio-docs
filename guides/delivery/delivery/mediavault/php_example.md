---
title: PHP Example
---
Here is a MD5 Hash Sample:

```PHP
<?PHP
    $url = $_POST["url"];
    $secret = $_POST["md5"];

    if (!$url && !$secret) {
        $url = "http://limelighturl/file.ext";
        $secret = "Secret";
    }
?>
<html>
    <head>
        <title>MD5 Hash Sample Page</title>
    </head>
    <body>
        <form method="post">
            URL: <input type="text" name="url" value="<?PHP print $url;?>" size=80>
            <br>
            Secret: <input type="text" name="md5" value="<?PHP print $secret;?>">
            <br>
            <br>
            <input type="submit">
        </form>

        <?PHP
            if (ereg("[&?]h=", $url)) {
                print "<p>Oops! You should not include the h= portion of the url. This script will calculate it for you!</p>\n";
                exit();
            }

            $end = time() + 24*60*60; //24 hours in seconds
            $md5 = md5("$secret$url");

            if (strpos($url, '?') > 0) {
                $auth_url = "$url&h=$md5";
            } else {
                $auth_url = "$url?h=$md5";
            }

            print "<table border>\n";
            print "<tr><td>Secret:</td><td>$secret</td></tr>\n";
            print "<tr><td>Url with options:</td><td>$url</td></tr>\n";
            print "<tr><td>MD5 Hash Input:</td><td>$secret$url</td></tr>\n";
            print "<tr><td>Generated MD5 Hash:</td><td>$md5</td></tr>\n";
            print "<tr><td>Authenticated URL</td><td><a

            href=\"$auth_url\">$auth_url</a></td></tr>\n";

            print "</table>\n";

            if (strpos($url, 'e=') <= 0) {
                print "If you want to have an expiring url that expires after a day, enter the following into the URL box:\n";
                print "<pre>\n";

                if (strpos($url, '?'))
                    print "$url&e=".(time()+24*60*60)."\n";
                else
                    print "$url?e=".(time()+24*60*60)."\n";

                print "</pre>\n";
            }

            if (strpos($url, 'rs=') <= 0) {
                print "If you want to have a rate limited url, enter the following into the URL box (where rs can equal any number greater than your minimum limit):\n";
                print "<pre>\n";

                if (strpos($url, '?'))
                    print "$url&rs=85\n";
                else
                    print "$url?rs=85\n";

                print "</pre>\n";
            }

            if (strpos($url, 'ri=') <= 0) {
                print "If you want to allow the user to download a number of bytes w/out being ratelimited, enter the following into the URL box (where ri equals the value in bytes to not be rate limited ):\n";
                print "<pre>\n";

                if (strpos($url, '?'))
                    print "$url&ri=1000\n";
                else
                    print "$url?ri=1000\n";

                print "</pre>\n";
            }
        ?>
    </body>
</html>
```
