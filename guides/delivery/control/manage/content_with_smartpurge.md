---
title: Content with SmartPurge
---
SmartPurge is Edgio's innovative system for removing content from CDN cache.

## Why Purge?  {/*why-purge*/}

Objects are normally updated in or removed from cache during “freshness checks” with your origin. For a given object, a freshness check is initiated when a request has been made for the object, and the object’s TTL (Time To Live) has expired.

In general, setting object TTL is the best and most efficient way to manage cached content. For example, a news site may need to provide rapid updates to a breaking video story. The video can be updated in cache as quickly as desired by assigning it a low TTL value using an HTTP response header. In most cases, there is no need to remove the video from cache directly.

However, there are special cases where content needs to updated on the next user request or even proactively removed from cache as soon as possible. This is known as "purging the cache" or just "purging". Examples of when purging might be necessary include:

- Text is misspelled in the caption of a newly-uploaded video, and you need to update the video in cache as quickly as possible.
- You discover that some of your cached content is infringing a copyright and need to delete the content from cache as soon as possible.
- You lose a contract with a content provider and are obligated to delete the provider’s content from your cache as soon as possible.
- During a full website update, when you need to quickly update many related website objects (images, text, video, etc.) at the same time.

Edgio's SmartPurge executes purge operations more quickly and reliably than older technologies.

You can access SmartPurge through either the Control Portal or the [SmartPurge REST API](/delivery/delivery/smartpurge/smartpurge_rest_api).

<Callout type="info">Access to SmartPurge is granted by default for Company Admins but must be explicitly granted for uses with other roles. <br /> <br />SmartPurge also purges "negatively cached" content, such as HTTP error responses (404, etc.). This lets you remove negatively cached content when the content lifetime has been extended, such as when the origin includes a Cache-Control header that has a max-age value much greater than the default. <br />Purging MMD OD assets is supported only by public manifest on the [Enter URLs Tab](#enter-urls-tab).</Callout>

## SmartPurge Page Overview  {/*smartpurge-page-overview*/}

The SmartPurge page has two tabs: [Requests](#requests-tab) and [Templates](#templates-tab).

Controls at the top of the page allow you to choose an account and [create a new purge request](#creating-a-new-purge-request), [create a new template](#creating-a-new-template), or [create a new request from a template](#creating-a-new-request-from-a-template).

From the **Requests** tab only, you can filter the list of requests by date range and do a host/account lookup.

### Requests Tab  {/*requests-tab*/}

The Requests tab lists all currently configured purge requests. Each request shows this information:
-   Time, timezone, and purge date.
-   A 'Dry Run' icon if the request was a dry run.
-   Total bytes invalidated and deleted.
-   Request ID.
-   Number of patterns, URLs, and tags in the request.
-   Information icon beside patterns, URLs, and tags. Click the icon to view details.

#### What You Can Do on the Requests Tab {/*what-you-can-do-on-the-requests-tab*/}

Use the icons on the right of each row to :

-   [View a Request's Stats (Results)](#viewing-a-requests-stats)
-   [Save a Request as a Template](#saving-a-request-as-a-template)
-   [Do a Dry Run](#doing-a-dry-run)
-   Rerun the request. See [Doing a Purge](#doing-a-purge).

### Templates Tab  {/*templates-tab*/}

The *Templates* tab lists purge requests that have been saved as templates for easy reuse and minimal duplication of effort. Each template shows this information:
-   Template name.
-   Date and time the template was created.
-   User that created the template.
-   Number of patterns, URLs, and tags in the template.

#### What You Can Do on the Templates Tab {/*what-you-can-do-on-templates-tab*/}

Use the icons on the right of each row to:

-   [View Template Summary](#viewing-template-summary)
-   [Edit a Template](#editing-a-template)
-   [Duplicate a Template](#duplicating-a-template)
-   [Delete a Template](#deleting-a-template)
-   [Do a Dry Run](#doing-a-dry-run)
-   [Do a Purge](#doing-a-purge)

## Creating a New Purge Request  {/*creating-a-new-purge-request*/}

You can create a purge request from an existing template or from scratch using the New Purge request for page.

1.  Click the **+ new** button and select **Request** from the subsequent .
2.  Choose an option for creating the request:
    -   Request: See [Creating a Purge Request from Scratch](#creating-a-purge-request-from-scratch).
    -   From existing template: See [Creating a Request from a Template](#creating-a-new-request-from-a-template).

### Creating a Purge Request from Scratch  {/*creating-a-purge-request-from-scratch*/}

SmartPurge provides four tabs for specifying objects to purge. You can use all or any of the tabs for one request. Change you make in one tab are reflected in the others. The tabs are:
-   [Build Patterns](#build-patterns-tab)
-   [Enter URLs](#enter-urls-tab)
-   [Apply Tags](#apply-tags-tab)
-   [Upload File](#upload-file-tab)

#### Build Patterns Tab {/*build-patterns-tab*/}

This tab allows you to configure items to purge by specifying patterns. Patterns can include any portion of the Origin URL, path, filename, or extension.

|  Setting   |  Information Requested   | Purpose |  Selecting the Right Option   |
| --- | --- | --- | --- |
|   Protocol  | Whether to purge objects that were previously requested with the HTTP protocol, the HTTPS protocol, or both | The protocol is part of the for cached objects | In the *Protocol* dropdown, select the protocol(s) used in your published links to the content you want to purge. |
|  Published Host   | Which of your existing s should be used when matching cached objects | The *Published Host* is part of the used to retrieve cached objects | In the *Published Host* dropdown, select the desired entry. |
|  Published Path   | Whether to limit matches to a specific URL path when matching cached objects | Select this option to limit the purge operation to content in a specific folder or folders. | If desired, enter a path in the *Published Host* field.<br /><br />Pathnames are case sensitive |
| Include query string |   Whether to include the query string, if any, when matching cached objects   | Select this option to limit the purge operation to URLs with a specific pattern in the query string | If desired, check the *Include query string* checkbox to include cached query strings in the match<br /><br />Query strings are case sensitive |
| Origin URL / Cache Key | Populated after you click the Apply button. See [Pattern Details](#smartpurge-pattern-details) for more information. |     |     |

##### SmartPurge Pattern Details {/*smartpurge-pattern-details*/}

SmartPurge patterns can include any portion of the Origin URL, path, filename, or extension. For example, `*.mysite.com` will match all content from Published Hostnames associated with `mysite.com`, `/abc/` will match all directories named “abc” across all hostnames, and `*.mp4` will match all MP4 files across all hostnames.

<Callout type="info">In the Origin URL or Pattern field, <br /> - **Case Sensitivity**. Patterns are case sensitive. <br /> - *Wildcards*. The wildcard character “*” is allowed but cannot be used by itself. <br /> - The use of (“*”) alone is only supported in the SmartPurge API. <br /> - *Spaces & Other Normally Encoded Characters*. Spaces in patterns must be URL encoded (replaced with "%20"), and other characters normally URL encoded must be similarly replaced. <br /> - *Folder Paths*. For patterns that begin with a folder name (including root directory folders), you must prefix the folder name with "*/". This is because SmartPurge compares the pattern to the entire cache key, which begins with the protocol and Origin URL, not just the folder path.  <br /> If you are having trouble creating a pattern, click the *Host/account lookup* button at the top right of the tab headers. Entering an exact Published Host will yield the corresponding exact Origin URL, including URL encoded characters. You can then use the exact Origin URL as the basis for your pattern.</Callout>

When you've finished entering the above settings, click the **Apply** button, and the Cache Key prefix(es) (*Protocol + Published Host + Published Path*) will be shown in the *Origin URL / Cache Key* section.

You can now continue entering purge settings:

|  Setting   |  Information Requested   | Purpose |  Selecting the Right Option   |
| --- | --- | --- | --- |
| What do you want to purge? | Which pattern type(s) to use when matching cached objects | At least one type of pattern must be specified before SmartPurge can begin matching cached objects | Click one or more of these pattern types:<br />-   **Exact origin URLs** - if you know exactly which Origin URLs you want to purge. You can also load them from a file using the **Upload file** tab.<br />-   File extensions - to purge all files with the file extensions you enter in the associated field<br />-   **File names** - to purge all files with the file names you enter in the associated field<br />-   **Directories** - to purge all files in the directories, you select Directories. To include all files below the selected directory, choose **Include subdirectories & contents**.<br />-   **Entire sites/origin hosts** - to purge all files from the paths shown in **Origin URL / Cache Key**, without limitation.<br />-   This option is mutually exclusive with **Exact origin URLs** - only one of the two may be selected.<br /><br />For File extensions, File names, and Directories, you must enter values in the text box, and press the Enter key after entering each value. You can remove an entry by clicking the x on the right side of the entry.<br /><br />For each type of match you select, you must:<br />-   Select Delete or Invalidate to the right of the text box.<br />-   Click the **Add** button to save each entry, after which it will appear in the **List of** **patterns/URLs/tags** field<br />-   Specify whether to Invalidate or Delete the matched objects<br />-   Patterns are case sensitive |
| List of patterms/URLs/tags |  Whether you want to delete or invalidate an entry in the list.<br /><br />Whether you want to delete an entry from the list.   |  This section contains a list of the patterns, URLs, and tags to purge that you configured in all four tabs.<br /><br />You can use the section to make a final decision whether:<br />- To delete or invalidate the objects specified by the entries.<br />- You indeed want to do a purge by removing one or all entries from the list.   |  To change the purge type, click **Delete** or **Invalidate**.<br /><br />Remove single items as needed from the section by clicking the trash can icon on the right side of the row.<br /><br />Remove all items by clicking the clear all button above the list on the right side of the screen.   |
| Notes | Optional notes that you can refer to later when browsing historical configuration changes | Notes allow you to include additional information for others (what files were targeted, why the purge was needed, etc.) | If you want to save notes with your purge request, just enter them in the **Notes** field |
| Save this request as a template | Whether you want to save the for future re-use | If you plan to purge the same objects again in the future, you may want to re-use the | To save the as a template, check the **Save this request as a template** checkbox.<br /><br />You can also save the request as a template, without sending a purge request, by clicking **Save** (instead of **Purge**) when you are finished. |
| Notify when completed | Whether you want to be notified via email when your has been completed | A notification is sent when the purge is complete. This provides the option to take additional action or inform others when the purge is complete | To be notified via email when your has completed, check the **Notify when completed** checkbox, and enter the email address(es) to notify.<br /><br />In the notification email, the purged object count is approximate and may increase after the email has been sent |
| Run request in stealth mode | Whether to make the request visible to all users or just internal user roles. | Create requests that are not visible to other users. | To make the request invisible to other users, select the option. |

<Callout type="info">Information in these fields are reflected in all tabs:<br /> - List of patterns/URLs/tags<br /> - Notes<br /> - Notify when completed and email addresses</Callout>

When you have finished making changes, click [**Save as template**](#saving-a-request-as-a-template) to save your request so you can continue work later, **Cancel** to discard your settings, [**Dry run**](#doing-a-dry-run) to test your settings, or [**Purge**](#doing-a-purge) to submit a purge request with your settings.

<Callout type="info">When you click **Save as template**, the *Create template for page* displays so you can save the request as a template.</Callout>

#### Enter URLs Tab {/*enter-urls-tab*/}

This tab allows you to specify exact URLs to purge.

|  Setting   |  Information Requested   | Purpose |  Selecting the Right Option   |
| --- | --- | --- | --- |
| Protocol    | Whether to purge objects that were previously requested with the HTTP protocol, the HTTPS protocol, or both | The protocol dropdown is part of the for cached objects | In the *Protocol* dropdown, select the protocol(s) used in your published links to the content you want to purge |
| Exact | The exact to purge | Select this option to purge specific *s* rather than using a pattern match | Enter the exact Published URL in the field.<br />-   Asterisk (*) characters are accepted, but are interpreted as literals, not wildcards.<br />-   URLs are case sensitive |
| Invalidate/Delete | Whether to or the matched objects | In many cases, it is acceptable to flag objects for replacement on the next user request. However, in some cases, you may need to remove content from cache proactively. | To update matching objects on the next user request, choose **Invalidate** under Purge Type. To proactively remove objects from the cache, choose **Delete**.<br /><br />When you are finished, click the **Add** button, and the target URL you specified will appear in the *List of patterns/URL/stags* field. |
| List of patterms/URLs/tags |  Whether you want to delete or invalidate an entry in the list.<br /><br />Whether you want to delete an entry from the list.   |  This section contains a list of the patterns, URLs, and tags to purge that you configured in all four tabs.<br /><br />You can use the section to make a final decision whether:<br />- To delete or invalidate the objects specified by the entries.<br />- You indeed want to do a purge by removing one or all entries from the list.   |  To change the purge type, click Delete or Invalidate.<br /><br />Remove single items as needed from the section by clicking the trash can icon on the right side of the row.<br /><br />  |
| Notes | Optional notes that you can refer to later when browsing historical configuration changes | Notes allow you to include additional information for others (what files were targeted, why the purge was needed, etc.) | If you want to save notes with your purge request, just enter them in the **Notes** field |
| Notify when completed | Whether you want to be notified via email when your has been completed | A notification is sent when the purge is complete. This provides the option to take additional action or inform others when the purge is complete | To be notified via email when your has completed, check the **Notify when completed** checkbox, and enter the email address(es) to notify |

<Callout type="info">Information in these fields are reflected in all tabs:<br /> - List of patterns/URLs/tags<br /> - Notes<br /> - Notify when completed and email addresses</Callout>

<Callout type="info">A maximum of 100 URLs and/or 100 Patterns may be submitted per request, and a maximum of 60 URLs and/or 60 Patterns may be submitted per minute (i.e., one URL or Pattern per second) per Account (shortname). For example: after submitting a purge request with 100 URLs, it is necessary to wait for 100 seconds before submitting the next request.</Callout>

When you have finished making changes, click [**Save as template**](#saving-a-request-as-a-template) to save your request so you can continue work later, **Cancel** to discard your settings, [**Dry run**](#doing-a-dry-run) to test your settings, or [**Purge**](#doing-a-purge) to submit a purge request with your settings.

<Callout type="info">When you click **Save as template**, the *Create template for page* displays so you can save the request as a template.</Callout>

#### Apply Tags Tab {/*apply-tags-tab*/}
This tab allows you to purge by a metadata tag that was previously supplied with the cached object via headers.

|  Setting   |  Information Requested   | Purpose |  Selecting the Right Option   |
| --- | --- | --- | --- |
| Purge by tag | One or more tags on which to base the purge. | At least one tag must be specified before SmartPurge can begin matching cached objects | Enter one or more tags. Press enter after you type each. When you have entered all tags, click **Add** to save the tags in the *List of patterns/URLs/tags* field.<br /><br />-   You can also enter patterns and URLs.<br />-   You can paste tags into the field.<br />-   If you make an invalid entry, tag specifications and a warning are displayed above and below the field. |
|  Purge by tag |Whether to invalidate the items or remove them. | This setting allows you to intelligently manage your cache and minimize requests to the origin. | Select **Delete** to completely remove the item from cache. This has a performance impact because the next time the item is requested, the item has to be retrieved from your origin.<br /><br />Select **Invalidate** to simply hide objects from user access and cause an If-Modified-Since request against your origin, and will only cause cache-fill for objects that have changed. |
| List of patterms/URLs/tags |  Whether you want to delete or invalidate an entry in the list. <br /><br />Whether you want to delete an entry from the list.   |  This section contains a list of the patterns, URLs, and tags to purge that you configured in all four tabs.<br /><br />You can use the section to make a final decision whether:<br />- To delete or invalidate the objects specified by the entries.<br />- You indeed want to do a purge by removing one or all entries from the list.   |  To change the purge type, click **Delete** or **Invalidate**.<br /><br />Remove single items as needed from the section by clicking the trash can icon on the right side of the row.<br /><br />Remove all items by clicking the **clear all** button above the list on the right side of the screen.   |
| Notes | Optional notes that you can refer to later when browsing historical configuration changes | Notes allow you to include additional information for others (what files were targeted, why the purge was needed, etc.) | If you want to save notes with your purge request, just enter them in the **Notes** field |
| Notify when completed | Whether you want to be notified via email when your has been completed | A notification is sent when the purge is complete. This provides the option to take additional action or inform others when the purge is complete | To be notified via email when your has completed, check the **Notify when completed** checkbox, and enter the email address(es) to notify |
| Run requests in stealth mode | Whether to make requests visible to all users or just internal user roles. | This option allows you to submit requests that are only visible to internal user roles. | To make the requests invisible to other user roles, select the option. |

<Callout type="info">Information in these fields are reflected in all tabs:<br /> - List of patterns/URLs/tags<br /> - Notes<br /> - Notify when completed and email addresses</Callout>

When you have finished making changes, click [**Save as template**](#saving-a-request-as-a-template) to save your request so you can continue work later, **Cancel** to discard your settings, [**Dry run**](#doing-a-dry-run) to test your settings, or [**Purge**](#doing-a-purge) to submit a purge request with your settings.

<Callout type="info">When you click **Save as template**, the *Create template for page* displays so you can save the request as a template.</Callout>

#### Upload File Tab {/*upload-file-tab*/}
This tab allows you to upload a CSV file that contains specifications of objects to purge.

|  Setting   |  Information Requested   | Purpose |  Selecting the Right Option   |
| --- | --- | --- | --- |
| Select a file | The file containing specifications of objects to purge. | At least one specification must be in the file before SmartPurge can begin matching cached objects | Click in the associated field and select a file of purge specifications to upload. If the file contains errors, a description of the first error is displayed below the field. Fix the error and upload the file again.<br /><br />You can download a sample file by clicking the link under the field.<br /><br />When the upload is complete, the patterns in the file will appear in the **List of patterns/URLs** field.<br /><br />See [Purge File Format Details](#purge-file-format-details) for additional information. |
| List of patterms/URLs/tags |  Whether you want to delete or invalidate an entry in the list.<br /><br />Whether you want to delete an entry from the list.   |  This section contains a list of the patterns, URLs, and tags to purge that you configured in all four tabs.<br /><br />You can use the section to make a final decision whether:<br />- To delete or invalidate the objects specified by the entries.<br />- You indeed want to do a purge by removing one or all entries from the list.   |  To change the purge type, click **Delete** or **Invalidate**.<br /><br />Remove single items as needed from the section by clicking the trash can icon on the right side of the row.<br /><br />Remove all items by clicking the **clear all** button above the list on the right side of the screen.   |
| Notes | Optional notes that you can refer to later when browsing historical configuration changes | Notes allow you to include additional information for others (what files were targeted, why the purge was needed, etc.) | If you want to save notes with your purge request, just enter them in the **Notes** field |
| Save this request as a template | Whether you want to save the for future re-use | If you plan to purge the same objects again in the future, you may want to re-use the | To save the as a template, check the **Save this request as a template** checkbox.<br /><br />You can also save the request as a template, without sending a purge request, by clicking **Save** (instead of **Purge**) when you are finished. |
| Notify when completed | Whether you want to be notified via email when your has been completed | A notification is sent when the purge is complete. This provides the option to take additional action or inform others when the purge is complete | To be notified via email when your has completed, check the **Notify when completed** checkbox, and enter the email address(es) to notify |

<Callout type="info">Information in these fields are reflected in all tabs:<br /> - List of patterns/URLs/tags<br /> - Notes<br /> - Notify when completed and email addresses</Callout>

When you have finished making changes, click [**Save as template**](#saving-a-request-as-a-template) to save your request so you can continue work later, **Cancel** to discard your settings, [**Dry run**](#doing-a-dry-run) to test your settings, or [**Purge**](#doing-a-purge) to submit a purge request with your settings.

<Callout type="info">When you click **Save as template**, the *Create template for* page displays so you can save the request as a template.</Callout>

#### Purge File Format Details  {/*purge-file-format-details*/}

Each line within the text file is case sensitive and should be in the following format:<br /> `pattern,exact_match,evict,include_query_string,tag`

| Parameter | Description | Syntax |
| --- | --- | --- |
| accountname | The Edgio account (shortname) to purge. | string |
| pattern | A pattern that describes the content to purge. Matched against content in all s associated with the Account.<br /><br />The pattern is matched against s only (not s). | string<br />-   a *partial URL*, or<br />-   a *pattern*, or<br />-   a |
| exact_match | Whether to treat the pattern as a partial URL or pattern, or as an exact match for a<br /><br />exact_match patterns can operate on s only. | integer (0 or 1)<br />-   0 - *partial URL* or *pattern*<br />-   1 - |
| evict |  Whether to *Invalidate* or *Evict* targeted content. Invalidating ensures that freshness checks are made for matching objects on the next user request. Evicting causes them to be deleted from cache entirely.   | integer (0 or 1)<br />-   0 -<br />-   1 - *Evict* |
| include_query_string |  Whether to include the query string, if any, when matching cached objects   | integer (0 or 1)<br />-   0 - Ignore<br />-   1 - *Include* |
| tag | Tag to invalidate or delete, preceded by integers indicating whether to invalidate or evict. | string |

For example, to perform this purge operation:
- Pattern: http://www.example.com/home/index/ (a partial URL)
- Purge Type: `Invalidate`

The corresponding line in the URL file would be: `http://www.example.com/home/index/,0,0,0`

As another example to evict objects identified by tag1, and invalidate objects identified by tag2, the corresponding lines would be:
- `,0,1,0,tag1`
- `,0,0,0,tag2`

### Creating a Request from a Template  {/*creating-a-request-from-a-template*/}

1.  Click the **+ new** button, then select **Request from template**.

    The *New purge request from template* for page displays.

2.  Select one or more previously saved templates that will form the (up to the 100-Pattern limit),

<Callout type="info">If you combine multiple templates, notes, and notifications associated with the individual templates are not included in the combined template.</Callout>

When you have finished making changes, click [**Save as template**](#saving-a-request-as-a-template) to save your request so you can continue work later, **Cancel** to discard your settings, [**Dry run**](#doing-a-dry-run) to test your settings, or [**Purge**](#doing-a-purge) to submit a purge request with your settings.

## Creating a New Template  {/*creating-a-new-template*/}

To create a new template, click the **+ new** button and select **Template** from the subsequent dropdown menu. You then can specify what to purge using one of the tabs in the *Create new template for page*.

See [Creating New Purge Requests](#creating-a-new-purge-request) for instructions.

## Doing a Dry Run  {/*doing-a-dry-run*/}
| Starting Tab or Page | Instructions |
| --- | --- |
| [Requests Tab](#requests-tab)<br /><br />[Templates Tab](#templates-tab) | 1.  Click the request's or template's **dry run** icon.<br />2.  In the subsequent dialog, confirm that you want to run the request or template.<br />    -   Request initiated from *Requests* tab: The request is added to the top of the list in the *Requests* tab. When the request is finished, you can click the new row to view the request's [*Stats for request* page](#stats-for-request-page).<br />    -   Request initiated from the Templates tab: when the request is finished, the [*Stats for request* page](#stats-for-request-page) displays. |
| [*New purge request from template for* Page](#creating-a-request-from-a-template)<br /><br />[*New purge request for* Page](#creating-a-new-purge-request)<br /><br />[*Stats for request* Page](#stats-for-request-page) | 1.  Click the **Dry run** button or the **dry run** icon, depending on the tab or page.<br />2.  In the subsequent dialog, confirm that you want to run the request.The request is added to the *Requests* tab.<br />3.  Click the new row to view the request's [*Stats for request* page](#stats-for-request-page). |
| [*Template Summary* Page](#template-summary-page) | 1.  Click the **dry run** icon.<br />2.  In the subsequent dialog, confirm that you want to run the request.<br />    <br />    The [*Stats for request dry run* page](#stats-for-dry-run-page) displays. |


## Doing a Purge  {/*doing-a-purge*/}
| Starting Tab or Page | Instructions |
| --- | --- |
| [Requests Tab](#requests-tab)<br /><br />[Templates Tab](#templates-tab) | 1.  Initiate the request.<br />    -   From the [Requests Tab](#requests-tab): click the request's **rerun** icon.<br />    -   From the [Templates Tab](#templates-tab): click the template's **purge** icon.<br />2.  In the subsequent dialog, confirm that you want to run the request or template. The request is added to the *Requests* tab.<br />3.  Click the new row to view the request's [*Stats for request* page](#stats-for-request-page). |
| [*New purge request for* Page](#creating-a-new-purge-request)<br /><br />[New purge request from template for Page](#creating-a-request-from-a-template)<br /><br />[*Stats for request* Page](#stats-for-request-page) | 1.  Click the **Purge** button or **rerun** icon depending on the page.<br />2.  In the subsequent dialog, confirm that you want to run the request. The request is added to the *Requests* tab. <br />3.  Click the new row to view the request's [*Stats for request* page](#stats-for-request-page). |

## Other Request Tasks  {/*other-request-tasks*/}
### Viewing a Request's Stats (Results)  {/*viewing-a-requests-stats*/}

1.  Locate the desired request in the Requests tab.
2.  Click the request or click the request's view stats icon.
    The [Stats for request page](#stats-for-request-page) page displays.

### Saving a Request as a Template  {/*saving-a-request-as-a-template*/}

| Starting Tab or Page | Instructions |
| --- | --- |
| [*New purge request for* Page](#creating-a-new-purge-request)<br /><br />[Requests Tab](#requests-tab)<br /><br />[*Stats for request* Page](#stats-for-request-page) | 1.  Initiate the save action.<br />    -From *New purge request for* page:<br />-- Click the **Save as template** button.<br />-- Enter a name in the *SAVE AS TEMPLATE* dialog.<br />    -   From the *Requests* tab or *Stats for request* page:<br />-- Click the request's **save as template** icon.<br />-- The *Create new template for page* displays.<br />- Enter a name in the *Template name* field; then make any other changes following instructions in [Creating a New Template](#creating-a-new-template).<br /><br />2.  Click the **Save** button.<br />- The template is added to the *Templates* tab. |

## Other Template Tasks  {/*other-template-tasks*/}
### Viewing a Template Summary  {/*viewing-template-summary*/}

Starting Tab or Page | Instructions |
| --- | --- |
| [Templates Tab](#templates-tab) | 1.  Click the row containing the template or click the template's preview icon.<br />    The [Template Summary](#template-summary-page) page displays. |

### Editing a Template  {/*editing-a-template*/}

| Starting Tab or Page | Instructions |
| --- | --- |
| [Templates Tab](#templates-tab)<br /><br />[Template Summary Page](#template-summary-page) | 1.  Click the **edit** icon.<br />- The *Edit template page* displays. All details copied from the template.<br />2.  Make desired changes following instructions in [Creating a New Template](#create-a-new-template).<br />3.  Click the **Save** button. |

### Duplicating a Template  {/*duplicating-a-template*/}

| Starting Tab or Page | Instructions |
| --- | --- |
| [Templates Tab](#templates-tab)<br /><br />[Template Summary Page](#template-summary-page) | 1.  Click the **duplicate** icon.<br />- The *Clone template for page* displays with all details except the template name cloned from the template.<br />2.  Make desired changes following instructions in [Creating a New Template](#creating-a-new-template).<br />3.  Click the **Save** button. |

### Deleting a Template  {/*deleting-a-template*/}

| Starting Tab or Page | Instructions |
| --- | --- |
| [Templates Tab](#templates-tab)<br /><br />[Template Summary Page](#template-summary-page)| 1.  Click the **delete** icon.<br />2.  Click **Continue** in the dialog that prompts you to delete the template.<br />    - The template is removed from the Templates tab. |

## *Stats for Request* Page  {/*stats-for-request-page*/}

Stats for request pages display information about a dry run or purge.

### Request ID  {/*request-id*/}

The request's id is displayed at the top left side of the page.

### Toolbar {/*toolbar*/}

Text and icons on the right above the *Status* section provide information about the request and allow you to do additional tasks.

-   template name: If the request was based on a template, the template name is displayed.
-   save as template icon: [save the request as a template](#saving-a-request-as-a-template). Available only in the *Stats for request* page.
-   dry run icon: [do a dry run based on the request](#doing-a-dry-run).
-   run icon: [do a purge using the request](#doing-a-purge).
-   request information: date and time submitted, and submitter.

### Status Section {/*status-section*/}

Shows the request run time, number of deleted and invalidated objects, number of bytes for deleted, and invalidated objects.

### Request Details Section {/*request-details-section*/}

Selectable tabs allow you to view lists of items purged by patterns, URLs, and Tags. For longer lists, use the **Filter** field to locate the information you need.

## *Template Summary* Page  {/*template-summary-page*/}

The *Template Summary* page provides read-only information about a template, including identifying information, notes, edits applied to it, and history of its use.

Icons at the top of the page allow you to [edit](#editing-a-template) or [duplicate](#duplicating-a-template) the template, [delete](#deleting-a-template) it, [do a dry run](#do-a-dry-run), or [do a purge](#do-a-purge).

The *Details* section provides historical information about template creation and modification as well as run information (dry runs are not included). The section also shows items purged by patterns, URLs, and Tags. For longer lists, use the **Filter** field to locate the information you need.

<Callout type="info">For dry runs, the Last run and Last run by fields contain only a dash.</Callout>

## Purge Notifications  {/*purge-notifications*/}

Purge notifications are displayed in the *Activity and Events* section of your account's dashboard.

## The SmartPurge REST API  {/*the-smartpurge-rest-api*/}

The SmartPurge REST API provides programmatic access to all SmartPurge features.

For more information, please see the [SmartPurge REST API User Guide](/delivery/delivery/smartpurge/smartpurge_rest_api).

## SmartPurge Best Practices  {/*smartpurge-best-practices*/}

-   Consider the impact of deletions. Objects will be removed and cause cache fill for every purged object on the next request from a user. A large 'delete' purge can send a high amount of unwanted traffic back to your origin.

-   When in doubt, invalidate. Invalidation hides objects from user access and causes an If-Modified-Since request HTTP header request against your origin, which will only cause cache fill only for objects that have changed.

-   Don't submit more patterns than necessary. A wildcard at the root directory will reliably clear it out, so submitting secondary patterns for the same path will result in failed requests and are not needed. The *Stats for request dry run* page will verify that the purge successfully hit its mark.

-   Wildcards can be used against s only. Published s require a pattern with an exact match.

-   Build your patterns for maximum effect, so you don't lose valuable time editing and resubmitting failed requests. Every purge request is sent to every server in 's infrastructure.

-   Use wildcards (asterisks) wisely and sparingly, especially in root directories, or when a bulk purge is not the intended outcome. Unexpected cache fills, lost files, rate limits, or failed purge requests can result.

-   Know your workflow, especially if you find yourself juggling purge requests frequently. If your developers use versions on their CSS or JavaScript includes, you could lower their time to live (TTL) in the cache to better meet their needs. You can employ configuration techniques to decrease your need to purge. Reach out to your when in doubt.
