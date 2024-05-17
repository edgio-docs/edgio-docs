---
title: File Upload End-to-End Examples
---
This section shows Python code examples that you can use for obtaining a token, uploading a file, and verifying the file was uploaded successfully. Note that rhe verification step is important because it verifies that the file you attempted to upload indeed was uploaded. For example if you attempted to upload a 10MB file and a network error occurred you need to determine if the upload was successful.

You can copy and paste the code into the Python IDE of your choice, or you can use the same concepts to upload files by creating programs in other languages such as Java, JavaScript, and C#.

## Obtain a Token {/*obtain-a-token*/}
```JSON
>>> import jsonrpclib
>>> api = jsonrpclib.Server('https://{Account name}.upload.llnw.net/jsonrpc2')
>> token, uid_gid = api.login('yourUser', 'yourPassword')
>>> print (token)
f3037573-2a6f-4042-ab8f-82d6823b0480
```

For complete details about login, see [Logging in Using the JSON-RPC Interface](/delivery/storage/apis/api_calls/logging_in_using_the_json_rpc_interface).

**HTTP Example**
```JSON
>>> import requests
>>> auth_headers = { 'X-Agile-Username': 'yourUser', 'X-Agile-Password': 'yourPassword' }
>>> url = 'https://{Account name}.upload.llnw.net/account/login'
>>> r = requests.post(url, headers=auth_headers)
>>> token = r.headers['x-agile-token']
>>> print (token)
7c164371-d581-4068-8ce1-4d17b6a9d8a3
```
For complete details about `account/login`, see [Logging in Using the HTTP Interface](/delivery/storage/apis/api_calls/logging_in_using_http_interface).



## `/post/file` Example  {/*post-file*/}
This section presents a simple example using only the X-Agile-Authorization header along with the uploadFile, basename, and directory form fields. Note that uploadFile is a multipart/form-data encoded payload so it is handled differently than other form fields.

For complete details about `/post/file`, see [Web Browser Upload](/delivery/storage/apis/api_calls/uploading_files_nonmultipart/#web-browser-upload).

**Upload a File**
```
>>> import requests
>>> basename = 'file1.txt'
>>> file_to_upload ='/' + basename
>>> upload_headers = { 'X-Agile-Authorization': token}
>>> payload = {'basename': basename, 'directory': '/zz' }
>>> files = { 'uploadFile': open(file_to_upload, 'r') }
>>> r = requests.post('http://{Account name}.upload.llnw.net/post/file', data=payload, headers=upload_headers, files=files, verify=False)
```

**Verify That the Upload Was Successful**

You can use HTTP or JSON-RPC.

HTTP Example

Look at the headers returned from the request. The `/post/raw` request returns the upload status in the X-Agile-Status header. A value of 0 (zero) means success.

```
>>> print (r.headers
{'x-agile-status': '0', 'content-length': '0', 'access-control-allow-headers': 'X-Agile-Authorization, X-Content-Type', 'x-agile-checksum': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'keep-alive': 'timeout=5, max=100', 'server': 'Apache', 'x-agile-size': '0', 'connection': 'Keep-Alive', 'date': 'Mon, 17 Aug 2015 20:23:17 GMT', 'x-agile-path': '/{Account name}/zz/file1.txt', 'access-control-allow-origin': '*', 'access-control-allow-methods': 'OPTIONS', 'content-type': 'text/json;charset=utf-8'}
```
For other status codes, see [HTTP Response Codes and Request Status Codes](/delivery/storage/apis/api_calls/uploading_files_nonmultipart/#frp-http-codes).

You can also issue a HEAD request against the object and look at the overall response code (200=OK) as well as the `X-Agile-Checksum` and `Content-Length` response headers:

```
>>> r = requests.head('http://global.mt.lldns.net/<Account Name>/zz/file1.txt')
>>> print (r)
<Response [200]>
>>> print (r.headers)
{'x-agile-checksum': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', 'accept-ranges': 'bytes', 'server': 'nginx/1.6.2', 'last-modified': 'Mon, 17 Aug 2015 20:23:17 GMT', 'connection': 'keep-alive', 'date': 'Mon, 17 Aug 2015 20:33:02 GMT', 'content-type': 'text/plain'}
```

JSON-RPC Example

Use the stat function to get information on the uploaded file. The `stat` function has an optional ‘detail’ parameter. Pass `True` for extended information, or pass `False` (or omit) for an abbreviated response. A value of 0 in the returned code field indicate success. Other values indicate failure. You can also look at other fields such as size and checksum and compare them to known values.

```
>>> api.stat(token, 'zz/file1.txt', True)
{u'mimetype': u'text/plain', u'code': 0, u'uid': 12020, u'checksum': u'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', u'gid': 100, u'mtime': 1439842997, u'size': 0, u'type': 2, u'ctime': 1439842997}
```
For more information about the stat call, see [Obtain File or Directory Metadata](/delivery/storage/apis/api_calls/working_with_methods/#metadata).

**Complete HTTP Example**

This section ties information together, providing a complete Python work sample that you can quickly and easily copy and paste into a Python file.

<Callout type="info">Always use https for logging in to prevent sniffer attacks that can detect your credentials and token.</Callout>

```
import jsonrpclib
import requests
api = jsonrpclib.Server('https://{Account Name}.upload.llnw.net/jsonrpc')
token, user = api.login('yourUser', 'yourPassword')

basename = 'file1.txt'
file_to_upload ='/' + basename
upload_headers = { 'X-Agile-Authorization': token}
payload = {'basename': basename, 'directory': '/zz' }
files = { 'uploadFile': open(file_to_upload, 'r') }
r = requests.post('http://{Account name}.upload.llnw.net/post/file', data=payload, headers=upload_headers, files=files, verify=False)
print (r)
print (r.headers)
r2 = requests.head('http://global.mt.lldns.net/{Account Name}/zz/file1.txt')
print (r2)
print (r2.headers)
api.stat(token, '/zz/file1.txt', True)
```

## `/post/raw` Example {/*post-raw*/}
This section presents a simple example using only the `X-Agile-Authorization`, `X-Agile-Basename`, and `X-Agile-Directory` headers.

For complete details about /post/raw, see [File Raw Post](/delivery/storage/apis/api_calls/uploading_files_nonmultipart/#file_raw_post).

**Upload a File**
```
>>> import requests
>>> file_to_upload = '\test.mp3'
>>> upload_headers = { 'X-Agile-Authorization': token, 'X-Agile-Basename': file_to_upload, 'X-Agile-Directory': '/' }
>>> with open(file_to_upload, 'rb') as filesrc:
   r = requests.post('http://{Account name}.upload.llnw.net/post/raw', data=filesrc, headers=upload_headers)
```
Verify That the Upload Was Successful

You can use HTTP or JSON-RPC.

HTTP Example

Look at the headers returned from the request. The `/post/raw` request returns the upload status in the `X-Agile-Status` header. A value of 0 means success.

```
>>> print (r.headers
{'x-agile-status': '0', 'content-length': '0', 'access-control-allow-headers': 'X-Agile-Authorization, X-Content-Type', 'x-agile-checksum': 'f5d56bded9d953c31d4e257ecf606e152435af1c8139d32a5b367e9070ac783f', 'keep-alive': 'timeout=5, max=100', 'server': 'Apache', 'x-agile-size': '594472', 'connection': 'Keep-Alive', 'date': 'Mon, 17 Aug 2015 17:10:23 GMT', 'x-agile-path': '/{Account Name}/test.mp3', 'access-control-allow-origin': '*', 'access-control-allow-methods': 'OPTIONS', 'content-type': 'text/json;charset=utf-8'}
```

You can also issue a HEAD request against the object and look at the headers returned and the overall response code (200=OK).

Here is an example using the Python `requests` library:

```
>>> r2 = requests.head('http://{Account name}.upload.llnw.net/{Account Name}/' + basename)
>>> print (r2)
<Response [200]>
>>> print (r2.headers)
{'content-length': '594472', 'x-agile-checksum': 'f5d56bded9d953c31d4e257ecf606e152435af1c8139d32a5b367e9070ac783f', 'accept-ranges': 'bytes', 'server': 'nginx/1.6.2', 'last-modified': 'Mon, 17 Aug 2015 17:10:25 GMT', 'connection': 'keep-alive', 'date': 'Mon, 17 Aug 2015 17:15:07 GMT', 'content-type': 'audio/mpeg'}
```

JSON-RPC Example

Use the stat function to get information on the uploaded file. The `stat` function has an optional ‘detail’ parameter. Pass `True` for extended information, or pass `False` (or omit) for an abbreviated response. A value of 0 in the returned code field indicate success. Other values indicate failure. You can also look at other fields such as size and checksum and compare them to known values.
```
>>> api.stat(token, '/test.mp3', True)
{u'mimetype': u'audio/mpeg', u'code': 0, u'uid': 12020, u'checksum': u'f5d56bded9d953c31d4e257ecf606e152435af1c8139d32a5b367e9070ac783f', u'gid': 100, u'mtime': 1439831425, u'size': 594472, u'type': 2, u'ctime': 1439831425}
```

For more information about the `stat` call, see [Obtain File or Directory Metadata](/delivery/storage/apis/api_calls/working_with_methods/#metadata).

**Complete HTTP Example**

This section ties information together, providing a complete Python working sample that you can quickly and easily copy and paste into a Python file.

<Callout type="info">Always use https for logging in to prevent sniffer attacks that can detect your credentials and token.</Callout>

```
import jsonrpclib
import requests
api = jsonrpclib.Server('https://{Account Name}.upload.llnw.net/jsonrpc')
token, user = api.login('yourUser', 'yourPassword')

basename = 'test.mp3'
file_to_upload ='/' + basename
upload_headers = { 'X-Agile-Authorization': token, 'X-Agile-Basename': file_to_upload, 'X-Agile-Directory': '/' }
with open(file_to_upload, 'rb') as filesrc:
  r = requests.post('http://{Account name}.upload.llnw.net/post/raw', data=filesrc, headers=upload_headers)
print (r.headers
r2 = requests.head('http://global.mt.lldns.net/{Account Name}/' + basename)
print (r2)
print (r2.headers)
api.stat(token, "/" + basename, True)
```

## Multipart Example {/*multipart-example*/}
This section presents a simple scenario for initiating a multipart upload, adding a piece to the upload, and completing the upload. For complete information about multipart uploads, see [Uploading Files — Multipart](/delivery/storage/apis/api_calls/uploading_files_multipart).

**Calculate the SHA-256 Checksum For the File**

You can use the value later to ensure the file was uploaded successfully.

**Initiate the Upload**
```
>>> import requests
>>> serverDirectory = '/multipart'
>>> uploadBasename = 'text-file1.txt'
>>> headers = { 'X-Agile-Authorization': token, 'X-Agile-Basename': uploadBasename, 'X-Agile-Directory': serverDirectory}
>>> r = requests.post('http://[Account name]-l.upload.llnw.net/multipart/create', headers=headers, verify=False)
```
**Verify That the Initiation Was Successful**

Look at the headers returned from the request. The `/multipart/create` request returns the upload status in the `X-Agile-Status` header. A value of 0 means success.
```
>>> print (r.headers)
{'x-agile-status': '0', 'content-length': '0', 'x-agile-meta': 'content_type=None mtime=0', 'keep-alive': 'timeout=5, max=100', 'server': 'Apache', 'connection': 'Keep-Alive', 'x-agile-multipart': 'e20207caa6234b53a93f671320ad7be6', 'date': 'Wed, 19 Aug 2015 21:23:41 GMT', 'x-agile-path': '/{Account Name}/multipart/text-file1.txt', 'access-control-allow-origin': '*', 'access-control-allow-methods': 'OPTIONS', 'content-type': 'text/json;charset=utf-8', 'access-control-allow-headers': 'X-Agile-Authorization, X-Content-Type'}
```
<Callout type="info">A multipart upload is not available until you have added pieces to it and completed it, so a HEAD request or a JSON-RPC stat request on the object at this point will fail.</Callout>

**Add a Piece To the Multipart Upload**

This is a simple example that adds a complete file to the multipart upload. In real life you would stream the object, break the stream into chunks and upload each chunk as a piece.
```
>>> mpid = r.headers['X-Agile-Multipart']
>>> pieceBasename = 'file1.txt'
>>> file_to_upload ='/' + pieceBasename
>>> headers = { 'X-Agile-Authorization': token, 'X-Agile-Multipart': mpid, 'X-Agile-Part': '1'}
>>> with open(file_to_upload, 'rb') as filesrc:
>>> r2 = requests.post('http://[Account name]-l.upload.llnw.net/multipart/piece', data=filesrc, headers=headers, verify=False)
```

**Verify That the Piece Was Uploaded Successfully**

Look at the headers returned from the request. The upload status is in the `X-Agile-Status` header. A value of 0 means success.

Compare the checksum (`X-Agile-Checksum` header) with the value you calculated earlier.
```
>>> print (r2.headers)
{'x-agile-status': '0', 'content-length': '0', 'access-control-allow-headers': 'X-Agile-Authorization, X-Content-Type', 'x-agile-checksum': 'c28a4e896970557bea969cc591299183b341d90dad44ace3684994be80e8d07c', 'keep-alive': 'timeout=5, max=100', 'server': 'Apache', 'x-agile-size': '70', 'connection': 'Keep-Alive', 'date': 'Wed, 19 Aug 2015 21:23:46 GMT', 'access-control-allow-origin': '*', 'access-control-allow-methods': 'OPTIONS', 'content-type': 'text/json;charset=utf-8'}
```

**Complete the Upload**
```
>>> headers = { 'X-Agile-Authorization': token, 'X-Agile-Multipart': mpid}
>>> r3 = requests.post('http://[Account name]-l.upload.llnw.net/multipart/complete', headers=headers, verify=False)
```

**Verify That the Upload Was Successful**

You can use HTTP or JSON-RPC.

HTTP Example

Look at the `X-Agile-Status` header. A value of 0 means success.

```
>>> print (r3.headers)
{'x-agile-status': '0', 'content-length': '0', 'x-agile-parts': '1', 'keep-alive': 'timeout=5, max=100', 'server': 'Apache', 'connection': 'Keep-Alive', 'X-Agile-Multipart': 'e20207caa6234b53a93f671320ad7be6', 'date': 'Wed, 19 Aug 2015 21:23:50 GMT', 'access-control-allow-origin': '*', 'access-control-allow-methods': 'OPTIONS', 'content-type': 'text/json;charset=utf-8', 'access-control-allow-headers': 'X-Agile-Authorization, X-Content-Type'}
```
You can also issue a `HEAD` request against the object and look at the headers returned and the overall response code (200=OK).

```
>>> r4 = requests.head('http://{Account name}.upload.llnw.net' + serverDirectory + '/' + uploadBasename)
>>> print (r4)
<Response [200]>
>>> print (r4 headers)
{'content-length': '70', 'x-agile-checksum': 'c28a4e896970557bea969cc591299183b341d90dad44ace3684994be80e8d07c', 'accept-ranges': 'bytes', 'server': 'nginx/1.6.2', 'last-modified': 'Wed, 19 Aug 2015 21:22:44 GMT', 'connection': 'keep-alive', 'date': 'Wed, 19 Aug 2015 21:23:53 GMT', 'content-type': 'text/plain'}
```

<Callout type="info">There is often a delay between the time you complete the multipart upload and the time it is ready for a HEAD request. Issuing a HEAD request too soon results in a 404 (not found) error.</Callout>

JSON-RPC Example

Use the stat function to get information on the uploaded file. The stat function has an optional ‘detail’ parameter. Pass True for extended information, or pass False (or omit) for an abbreviated response. A value of 0 in the returned code field indicate success. Other values indicate failure. You can also look at other fields such as size and checksum and compare them to known values.

```
>>> api.stat(token, serverDirectory + '/' + uploadBasename, True)
{u'mimetype': u'text/plain', u'code': 0, u'uid': 12020, u'checksum': u'c28a4e896970557bea969cc591299183b341d90dad44ace3684994be80e8d07c', u'gid': 100, u'mtime': 1440025478, u'size': 70, u'type': 2, u'ctime': 1440025489}
```

For more information about the stat call, see [Obtain File or Directory Metadata](/delivery/storage/apis/api_calls/working_with_methods/#metadata).

**Complete HTTP Example**

This section ties information together, providing a complete Python working sample that you can quickly and easily copy and paste into a Python file.

<Callout type="info">Always use https for logging in to prevent sniffer attacks that can detect your credentials and token.</Callout>

```
import jsonrpclibimport requests
import os
 
######################################

# Log in
######################################
api = jsonrpclib.Server('https://{Account Name}.upload.llnw.net/jsonrpc')
token, user = api.login('yourUser', 'yourPassword')
 
######################################
# Set Upload Variables
######################################
serverDirectory = '/multipart'
localDirectory = '/Temp/'
fileName = 'flat-irons3.jpg'
chunkSize = 200000
 
print ('==================')
print ('Upload Information')
print ('==================')
print ('Upload file: ' + fileName)
print (' Server Dir: ' + serverDirectory)
print (' Piece Size: ' + str(chunkSize))
print ('')
 
######################################
# Create multipart
######################################
print ('================')
print ('Multipart Create')
print ('================')
 
headers = { 'X-Agile-Authorization': token, 'X-Agile-Basename': fileName, 'X-Agile-Directory': serverDirectory}
r = requests.post('http://{Account Name}.upload.llnw.net/multipart/create', headers=headers, verify=False)
 
print ('Request Result')
print ('--------------')
print (str (r.status_code ) + ' (' + r.reason + ')')
 
print ('')
print ('Multipart ID')
print ('------------')
mpid = r.headers['X-Agile-Multipart']
print (mpid)
 
######################################
# Multipart Piece
######################################
print ('')

print ('===============')
print ('Multipart Piece')
print ('===============')
file_to_upload = localDirectory + fileName
pieceNum = 1
f = open(file_to_upload, 'rb')
while True:
  chunkBuff = f.read( chunkSize )
  if not chunkBuff:
    break
  else:
    headers = { 'X-Agile-Authorization': token, 'X-Agile-Multipart': mpid, 'X-Agile-Part': str( pieceNum )}
    print (' Sending piece: ' + str( pieceNum ) )
    r2 = requests.post('http://{Account Name}.upload.llnw.net/multipart/piece', data=chunkBuff, headers=headers, verify=False)
    print ('        Result: ' + str (r2.status_code ) + ' (' + r2.reason + ')')
    status = r2.headers['X-Agile-Status']
    print ('X-Agile-Status: ' + str( status ))
    print ('------------------------')
    if status != "0":
       break
    else:
      pieceNum = pieceNum +1
f.close()
 
######################################
# Multipart Complete
######################################
print ('')
print ('==================')
print ('Multipart Complete')
print ('==================')
headers = { 'X-Agile-Authorization': token, 'X-Agile-Multipart': mpid}
r3 = requests.post('http://{Account Name}.upload.llnw.net/multipart/complete', headers=headers, verify=False)
print ('Request Result')
print ('--------------')
print (str (r3.status_code ) + ' (' + r3.reason + ')')
print ('X-Agile-Status: ' + r3.headers['x-agile-status'])
 
######################################
# Sleep
######################################
from time import sleep
secs = 5
print ('')
print ('**sleeping for ' + str(secs) + ' seconds...')
sleep( secs )
 
######################################
# HEAD Request
######################################
print ('==================')
print ('HEAD Request')
print ('==================')
print ('HEAD request on ' + serverDirectory + '/' + fileName)
r4 = requests.head('http://{Account name}.upload.llnw.net' + serverDirectory + '/' + fileName)
print ('Request Result')
print ('--------------')
print (str (r4.status_code ) + ' (' + r4.reason + ')')
print ('')
print ('Checksum')
print ('--------')
print (r4.headers['x-agile-checksum'])
print ('')
print ('Content Length')
print ('--------------')
print (r4.headers['content-length'])
 
######################################
# JSON-RPC stat Request
######################################
print ('')
print ('=====================')
print ('JSON-RPC stat Request')
print ('=====================')
print ('Requesting stat on ' + serverDirectory + '/' + fileName)
results = api.stat(token, serverDirectory + '/' + fileName, True))
print ('')
print ('Request Result')
print ('--------------')
print (str (results['code'] ))
statChecksum = results['checksum']
print ('')
print ('Checksum')
print ('--------')
print (statChecksum)
print ('')
print ('File Size')
print ('---------')
print (results['size'])
 
########################################
# Get the SHA-256 hash of the local file
########################################
import hashlib
fh = None
try:
  fh = open(file_to_upload, 'rb')
except IOError, e:
  log.warn("checksum_file IOError: %s: %s" % (file_to_upload, e))
  fh = None
if fh != None:
  m = hashlib.sha256()
  while True:
    buf = fh.read(4096)
    if not buf:
      break
    m.update(buf)
  fh.close()
  localFileCkSum = m.hexdigest()
  print ('')
  print ('==========')
  print ('Local file')
  print ('==========')
  print ('Checksum')
  print ('--------')
  print (localFileCkSum)
 
fileSize = os.path.getsize(file_to_upload)
print ('')
print ('File Size')
print ('---------')
print (fileSize)
print ('')
if statChecksum == localFileCkSum:
  print ('Local file checksum matches checksum from stat call.')
else:
  print ('Local file checksum does not match checksum returned from stat call.')
 
########
#Log out
########
api.logout(token)
```
