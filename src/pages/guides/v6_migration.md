---
title: {{ PRODUCT }} Version 6 Migration Guide
---

<Callout type="important">

If you are using {{ PRODUCT }} version 4.x or earlier, you should review the [v5 Migration Guide](v5_migration) before
migrating to version 6.

</Callout>



{{ PRODUCT }} version 6 updates the NodeJS dependency to version 16.x

Migrate from version 5.x to 6 through the following steps:

## Step 1: TODO {/*step-1-todo*/}

## Deprecation: {/*deprecation*/}

TODO: JWT Support has been removed https://app.clickup.com/t/4205457/APPOPS-15740

### .noIndexPermalink() has been deprecated

Router function `.noIndexPermalink()` has been depreacated. Please remove it from your router.js file. We are now automatically excluding any perma links from search engines. If you would like to index some permalinks see [these](/guides/performance/cdn_as_code/common_routing_patterns#blocking-search-engine-crawlers) instructions. 

## Migration Complete {/*migration-complete*/}

Congratulations on successfully migrating {{ PRODUCT }} to version 6!
