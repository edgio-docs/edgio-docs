---
title: Signing Requests in the HTTP Interface
---
You can use hash-based message authentication code (HMAC) to create single use, time-limited signature-based URLs. These URLs enable you to go beyond token-based authentication and put time constraints on your one-time URLs.

## Requests That Can Be Signed  {/*signed*/}
All endpoints in the HTTP interface except /account/login accept signed requests:

- /post/directory
- /post/file
- /post/raw
- /multipart/create
- /multipart/piece
- /multipart/complete

## Signing and Submitting a Request  {/*signing-and-submitting*/}
This section explains the mechanics of signing and sending a request using `/post/raw` as an example. In this example, a file called `testfile.txt` is uploaded to the caller's namespace. To make the example simple, the only `/post/raw`-specific header involved is `X-Agile-Basename`. An `X-Agile-Directory` header is not sent, causing the file to be created under the root directory.

The example assumes you understand the `/post/raw` endpoint. See [File Raw Post](/delivery/storage/apis/api_calls/uploading_files_nonmultipart/#file-raw-post) for additional information.

Please note the following generalizations about signing all requests (not just /`post/raw`):

- Before signing a request, you must have previously generated your access key and secret using the `initKeyPair` call. See [Initializing HMAC Key Pairs](/delivery/storage/apis/api_calls/initializing_hmac_key_pairs) for additional information.
- Part of the process of signing a request involves creating a query string, which must be URL-encoded. For spaces, use \+ rather than \%20.
- Query string terms must appear in alphabetical order.
- Because your access_key is involved, you do not have to send an `X-Agile-Authorization` header.

### Sign the Request  {/*sign-request*/}
1. Construct the request's query string, adding to it the following:
    - An entry for your access key (from the `initKeyPair` call).
        Example: `access_key=3e7359107d65869061992`
    - A timestamp after which the request will be invalid. Example: `&expiry=1461084890`
- Entries for each Edgio-specific HTTP header (and its value) that you will submit with the request. Remove the "X-Agile" prefix from each header name and make the name all lower case. Example: `X-Agile-Basename` with a value of `/testfile.txt becomes &basename=testfile.txt`
2. Place the terms in the query string in ascending order by term key.
3. Combine the request's path and query string, then make an hmac SHA256 digest from the combination using your secret key as the key. For example, make the digest out of this: `/post/raw?access_key=3e7359107d65869061992&basename=testfile.txt&expiry=1461084890`
4. Then base64 encode the digest from the previous step.
5. Add the base64 encoded value to the query string in the signature term like this: ``/post/raw?access_key=asdf&basename=testfile.txt&expiry=1461084890&signature=
g97jovWlpjTP0u+1VPfWhQa5GGpdW1hf6oApxQWIgXg=``

### Submit the Request  {/*submit-request*/}
When you submit the request, you must include:

- the `X-Agile-Signature` header whose value will be the entire path + query string combination. See Sample Python Code
- any additional request headers required by the request. Do not pass an `X-Agile-Authorization` header.

## Sample Python Code  {/*python*/}
The following code signs and submits a Post Raw request, but you can use the code as a basis for any other requests that can be signed.
```Python
import requests
import base64
import hashlib
import hmac
import io
import os
import time
import argparse


def make_hmac_signature(headers, endpoint, expiry, access_key, secret_key):
    mac = [
        "access_key={access_key}".format(access_key=access_key),
        "expiry={expiry}".format(expiry=expiry),
    ]
    for header in headers:
        if header.startswith("X-Agile-"):
            mac.append("{key}={value}".format(key=header[len("X-Agile-"):].lower(), value=headers[header]))
    mac.sort()
    payload = "{endpoint}?{query_string}".format(endpoint=endpoint,query_string="&".join(mac))
    raw_signature = hmac.new(secret_key, msg=payload, digestmod=hashlib.sha256).digest()
    signature = payload + "&signature=" + base64.b64encode(raw_signature)
    return signature


def do_post_raw(local_path, remote_path, access_key, secret_key, host="api.lama.lldns.net"):
    data_stream = io.open(local_path, "rb")
    headers = {
        'X-Agile-Directory': os.path.dirname(remote_path),
        'X-Agile-Basename': os.path.basename(remote_path),
        'X-Agile-Content-Detect': 'name',
    }
    signature = make_hmac_signature(headers, "/post/raw", int(time.time()) + 10, access_key, secret_key)
    headers['X-Agile-Signature'] = signature
    post_raw_endpoint = 'https://%s/post/raw' % host
    return requests.post(post_raw_endpoint, data=data_stream, headers=headers, verify=False)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--host", default="api.lama.lldns.net")
    parser.add_argument("--local")
    parser.add_argument("--remote")
    parser.add_argument("--access-key")
    parser.add_argument("--secret-key")
    args = parser.parse_args()
    resp = do_post_raw(args.local, args.remote, args.access_key, args.secret_key)
    print (resp.headers)
```
