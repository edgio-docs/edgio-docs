---
title: Path Segment and File Name Limitations
---
Origin Storage path segment names, file names, and path length (path + file name) can contain a maximum of 4096 bytes.

For request headers that support UTF-8 encoding, Unicode characters are encoded using byte sequences of different lengths:

- Basic Latin letters, digits, and punctuation signs use one byte.
- Most European and middle east script letters fit into a 2-byte sequence: extended Latin letters (with tilde, macron, acute, grave and other accents), Cyrillic, Greek, Armenian, Hebrew, Arabic, Syriac, and others.
- Korean, Chinese, and Japanese ideographs use 3-byte or 4-byte sequences.
UTF-8 path segments are URL-encoded ascii representations of the unicode characters.

For example, the Chinese character 今 is three bytes: '\xe4\xbb\x8a'

When URL-encoded , the character is: '%E4%BB%8A' three bytes each for a total of 9 bytes, so this single character would actually take up 9 bytes of the 4096-byte limit. See Byte Calculation for additional details.

**Byte Calculation**

Because UTF-8 is supported, it is wise to first ensure that a path segment or file name does not exceed the limitation before creating.

Using Chinese characters (3 bytes per character) as an example, here is how to determine the number of bytes in a file name in Python:

```Python
>>> # File name with 3 characters before the file extension.
>>> filename = "今日は.txt"
>>> utf8_chars = "今日は"
>>> ascii_chars = ".txt"
>>> ascii_chars
'.txt'
>>> len(utf8_chars)
9
>>> len(ascii_chars)
4
>>> ( len(utf8_chars) * 3 ) + len(ascii_chars)
31
```
