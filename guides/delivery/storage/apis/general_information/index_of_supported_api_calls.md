---
title: Index of Supported API Calls
---
The following sections help you locate the information you need.

See [API Calls by Name](#api-calls-by-name) if you know the call you want to make but you need further information about it.
See [API Calls by Topic](api-calls-by-topic) if you know what you want to do but you are not sure which call to use.

Both sections contain links to detailed information.

## API Calls by Name
Calls are listed in alphabetical order within each interface. Note that there is not a one-to-one correspondence between calls in the two interfaces because the HTTP interface has fewer calls. Juxtaposition of the HTTP calls with the JSON-RPC calls in the following table is not meant to imply correspondence.

| Interface | HTTP Interface |
| --- | --- |
| abortMultipart<br><br>     See [Abort a Multipart Upload](Working with Multipart JSON RPC.htm#Abort) | account/login<br><br>     See [Log In](Logging in HTTP.htm#Log) |
| authenticate<br><br>     See [Log in to a Sub-directory](Logging In JSON RPC.htm#Log3) | multipart/complete<br><br>     See [Complete a Multipart Upload](Working with Multipart HTTP.htm#Complete) |
| checkToken<br><br>     See [Determine Your Token's Age](Working with Sessions.htm#Determin) | multipart/create<br><br>     See [Begin a Multipart Upload](Working with Multipart HTTP.htm#Create) |
| completeMultipart<br><br>     See [Complete a Multipart Upload](Working with Multipart JSON RPC.htm#Complete) | multipart-piece<br><br>     See [Create a Multipart Piece](Working with Multipart HTTP.htm#Create2) |
| deleteDir<br><br>     See [Delete a Directory](Working with Directories JSON RPC.htm#Delete) | post/file<br><br>     See [Web Browser Upload](Uploading Files.htm#File) |
| deleteFile<br><br>     See [Delete a File](Working with Files.htm#Delete) | post/raw<br><br>     See [File Raw Post](Uploading Files.htm#File4) |
| fetchFileHTTP<br><br>    See [Copy a File](Working with Files.htm#Copy). |     |
| getMultipartStatus<br><br>     See [Get Status for a Multipart Upload](Working with Multipart JSON RPC.htm#Get) |     |
| getMultipartStatusMap<br><br>     See [Get String Equivalents of Multipart Status Codes](Working with Multipart JSON RPC.htm#Get2) |     |
| initKeyPair<br><br>     See [Initializing HMAC Key Pairs](Initializing HMAC Key Pairs.htm) |     |
| listDir<br><br>     See [List Directories](Working with Directories JSON RPC.htm#List) |     |
| listFile<br><br>     See [List Files](Working with Files.htm#List) |     |
| listMultipart<br><br>     See [List Your Multipart Uploads](Working with Multipart JSON RPC.htm#List) |     |
| listMultipartPiece<br><br>     See [List Pieces in a Multipart Upload](Working with Multipart JSON RPC.htm#List2) |     |
| listPath<br><br>     See [List Files and Directories](Working With Directories and Files Common.htm#List) |     |
| login<br><br>     See [Log In](Logging In JSON RPC.htm#Log) |     |
| logout<br><br>     See [Log Out](Logging Out.htm#Log) |     |
| makeDir<br><br>     See [Create a Directory](Working with Directories JSON RPC.htm#Create) |     |
| makeDir2<br><br>     See [Create a Directory Along With Leading Paths](Working with Directories JSON RPC.htm#Create2) |     |
| mediaVaultURL<br><br>     See [Generate a URL](Working with Files.htm#Generate) |     |
| noop<br><br>     See [Perform an Authenticated Server Verification](Verifying the Server API Connection.htm#Perform) |     |
| ping<br><br>     See [Perform an Unauthenticated Server Verification](Verifying the Server API Connection.htm#Perform2) |     |
| rename<br><br>     See [Rename a File or Directory](Working With Directories and Files Common.htm#Rename) |     |
| restartMultipart<br><br>     See [Restart a Multipart Upload](Working with Multipart JSON RPC.htm#Restart) |     |
| setContentType<br><br>     See [Set a File's Content Type](Working with Files.htm#Set) |     |
| setMTime<br><br>     See [Change a File or Directory Last Modification Time](Working With Directories and Files Common.htm#Set) |     |
| stat<br><br>     See [Obtain File or Directory Metadata](Working With Directories and Files Common.htm#Obtain) |     |
| updateSession<br><br>     See [Set Your Token's Expiry](Working with Sessions.htm#Set) |     |
