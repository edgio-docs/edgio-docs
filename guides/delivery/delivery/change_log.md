---
title: Change Log
---
This page details the latest changes to EdgePrism, Edgio's Content Delivery service.

|Version	|Date	|Type	|Change	|Improvement	|Details	|Category|
|---|---|---|---|---|---|---|
|5.1.6.0	|1.4.2024	|Feature	|This update adds support for asynchronous Arc Light execution in EdgePrism, enabling deployment of built-in suspend functions.	|This feature optimizes performance by efficiently managing suspended Arc Light functions, pausing only the specific function until it resumes and returns. This ensures that other requests continue to be processed seamlessly through EdgePrism.	|Asynchronous Arc Light execution does not affect other requests handled by EdgePrism. Use cases include user validation, real-time key value queries, and more.	|Asynchronous Arc Light|
|5.1.5.0	|11.9.2023	|Fix	|This fix improves stability by preventing a crash when opening the MPEP start-up lock file.	|This update fixes a bug that would trigger a crash in case a child took too long to start during either a new start of EdgePrism or a graceful restart.	|With the implemented fix, instead of the parent process pausing for a second, it waits for a signal from the child process. This signal indicates that the child process has finished setting up its shared state. Only then does the parent process proceed to start the next child. However, this fix is not enabled by default.|MPEP|
|5.1.4.0	|10.5.2023	|Fixes	|Internal improvements to enhance performance and stability	|Misc.|
5.1.3.0	|9.6.2023	|Fixes	|Internal improvements to enhance performance	|Misc.|
