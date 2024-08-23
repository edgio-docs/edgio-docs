---
title: File Extensions
---
When downloading a file with a MediaVault-hashed URL, most HTTP clients will name the resulting file with the filename and the trailing query parameters (i.e., the entire string after the last slash of the URL). This may make the file type unknown to some Operating Systems that rely on the file extension at the end of the filename to do so, as the file extension will be the expected extension and all the query parameters. To prevent this from occurring, append the extension with a query string value at the end of the URL (e.g., &file=.exe) so that the expected file extension appears at the end of the query parameters.

## Examples

**Non-executable File** (URL with the file extension stripped from the end of the URL):

`http://securehelixproducts.real.com/encoder/Producer13_1_1_Setup.exe?e=1275930304&h=56ac8562b77f7f75e944cab4037143d9`

**Executable File** (URL with the file extension (&file=.exe) appended to the end of the URL):

`http://securehelixproducts.real.com/encoder/Producer13_1_1_Setup.exe?e=1275930304&h=56ac8562b77f7f75e944cab4037143d9&file=.exe`

**Filename of the resulting downloaded object**

`Producer13_1_1_Setup.exe?e=1275930304&h=56ac8562b77f7f75e944cab4037143d9&file=.exe`
