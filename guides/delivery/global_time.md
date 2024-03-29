---
title: Global Time Reference
---
## Overview

*time.llnw.com* provides a global time reference via GET requests to accommodate MPEG-DASH live streams whose devices/ players request a specific segment number based on a trusted time source.

<Callout type="info">
Time references provided by this service are deemed accurate for the purpose of playback of live content and are made available without any guarantees or warranties, express or implied.
</Callout>

## Options
GET requests can retrieve the edge server’s current time in these formats: UNIX, ISO, and XML.

<Callout type="info">
Time references provided by this service are deemed accurate for the purpose of playback of live content and are made available without any guarantees or warranties, express or implied.Access URLs work with both HTTP and HTTPS prefixes.
</Callout>

### UNIX
|Function|Retrieve the current time on the edge server in UNIX format.|
|--|--|
|Access URLs|http://time.llnw.com <br> https://time.llnw.com|
|Sample Request|```$ curl -i http://time.llnw.com```|
|Sample Response|1596816231|

|Function|Retrieve the current time on the edge server with additional granularity in UNIX format.|
|--|--|
|Access URLs|http://time.llnw.com/?ms <br> https://time.llnw.com/?ms|
|Sample Request|```$ curl -i http://time.llnw.com/?ms```|

### ISO
|Function|Retrieve the current time on the edge server in [ISO 8601]("https://www.iso.org/iso-8601-date-and-time-format.html") format (YYYY-MM-DD). |
|--|--|
|Access URLs|http://time.llnw.com/?iso <br> https://time.llnw.com/?iso|
|Sample Request| ```$ curl -i http://time.llnw.com/?iso```|
|Sample Response|```2020-08-07T15:57:44Z```|

|Function|Retrieve the current time on the edge server with additional granularity in [ISO 8601]("https://www.iso.org/iso-8601-date-and-time-format.html") format (YYYY-MM-DD). <br> The default ms value is always 500; this option enables response granularity and does not accurately represent the ms value by default.|
|--|--|
|Access URLs|http://time.llnw.com/?xml&ms <br> https://time.llnw.com/?iso&ms|
|Sample Request|```$ curl -i http://time.llnw.com/?iso&ms```|

### XML

|Function|Return an XML document with the current time on the edge server in both UNIX and [ISO 8601]("https://www.iso.org/iso-8601-date-and-time-format.html") formats.|
|--|--|
|Access URLs|http://time.llnw.com/?xml <br> https://time.llnw.com/?xml|
|Sample Request|```$ curl -i http://time.llnw.com/?xml```|
|Sample Response|<time><utc>1596815360</utc><isostring>2020-08-07T15:49:20Z</isostring></time>|

|Function|Retrieve an XML document with additional granularity of the current time on the edge server in both UNIX and [ISO 8601]("https://www.iso.org/iso-8601-date-and-time-format.html") formats. <br> The default ms value is always 500; this option enables response granularity and does not accurately represent the ms value by default.|
|--|--|
|Access URLs|http://time.llnw.com/?xml&ms <br> https://time.llnw.com/?xml&ms|
|Sample Request|```$ curl -i http://time.llnw.com/?xml&ms```|
|Sample Response|```<time><utc>1596817099.500</utc><isostring>2020-08-07T16:18:19.500Z</isostring></time>```|
