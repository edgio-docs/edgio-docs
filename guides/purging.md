# Purging

This guide covers how you can purge data from the Layer0 edge cache.

## Overview

Layer0 offers three ways to purge responses from the cache:

- Developer Console
- CLI
- REST API

## Devloper Console

You can purge the cache via the [Layer0 Developer Console](https://app.layer0.co) by navgating to an environment, selecting the _Caching_ tab, and clicking _Purge the Cache_ under _Cache History_:

![purge_the_cache_button](/images/purging/purge_the_cache_button.png)

You can choose to purge all entries, purge by path, or by surrogate keys. You can also save multiple paths in a group if you purge them together regularly:

![purge_dialog](/images/purging/dialog.png)

## CLI

To purge responses via the CLI, see the [CLI reference](/guides/cli#section_cache_clear).

## REST API

To purge responses via the REST API, see the [REST API reference](/guides/rest_api#section_clear_cache).
