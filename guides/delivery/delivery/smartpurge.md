---
title: SmartPurge
---
SmartPurge is Edgio's innovative system for removing content from CDNcache.

## Purging Cache  {/*purging-cache*/}

Objects are normally updated in or removed from cache during “freshness checks” with your origin. For a given object, a freshness check is initiated when a request has been made for the object, and the object’s TTL (Time To Live) has expired.

In general, setting object TTL is the best and most efficient way to manage cached content. For example, a news site may need to provide rapid updates to a breaking video story. The video can be updated in cache as quickly as desired by assigning it a low TTL value using an HTTP response header. In most cases, there is no need to remove the video from cache directly.

However, there are special cases where content needs to updated on the next user request or even proactively removed from cache as soon as possible. This is known as "purging the cache" or just "purging". Examples of when purging might be necessary include:

- Text is misspelled in the caption of a newly-uploaded video, and you need to update the video in cache as quickly as possible.
- You discover that some of your cached content is infringing a copyright and need to delete the content from cache as soon as possible.
- You lose a contract with a content provider and are obligated to delete the provider’s content from your cache as soon as possible.
- During a full website update, when you need to quickly update many related website objects (images, text, video, etc.) at the same time.

Edgio's SmartPurge executes purge operations more quickly and reliably than older technologies.

You can access SmartPurge through either the Control Portal or the [SmartPurge REST API](/delivery/delivery/smartpurge/smartpurge_rest_api).

## SmartPurge Guides {/*smartpurge-guides*/}

[User Guide](/delivery/smartpurge/user_guide)

[REST API Guide](/delivery/smartpurge/smartpurge_rest_api)
