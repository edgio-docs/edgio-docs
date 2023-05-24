---
title: Operators Reference
---

A comparison operator determines when a request satisfies a condition by defining the relationship between a variable and a value. Each operator is briefly described below.

### Equals

Indicates that the value derived from the request must be an exact match to the value defined within a condition.

A comparison will be performed against the exact value defined within the condition. The only exception occurs for the `%` symbol. This symbol represents a URL-encoded character (e.g., `%20` represents a space character).

**Example:**

The following request will result in a match when the `Query String` condition is set to `media\'*'`:

`http://cdn.example.com?media\'*'`

### Does Not Equal

Indicates that the value derived from the request must be different from the value defined within a condition.

A comparison will be performed against the exact value defined within the condition. The only exception occurs for the `%` symbol. This symbol represents a URL-encoded character (e.g., `%20` represents a space character).

**Example:**

The following request will result in a match when the `Query String` condition is set to `media\'*'`:

`http://cdn.example.com?type=media\video`

### Matches (Simple)

Indicates that the value derived from the request must match the pattern defined within a condition. You may define a pattern using our [route path syntax](/guides/performance/cdn_as_code#route-pattern-syntax).

<Callout type="info">

  The intended use for this operator is to create a pattern for a URL path. For all other patterns, our recommendation is to use the `matches regular expression` operator.

</Callout>

**Example:**

The following request will result in a match when the `Path` condition is set to `/shows/:id`:

`http://cdn.example.com/shows/5309`

### Matches Regular Expression

Indicates that the value derived from the request must match a [Perl-compatible regular expression](https://pcre.org/) defined within the **Match Value** option.

Regular expressions define a pattern that will be searched for within a text value. Regular expression notation defines specific meanings to a variety of symbols. Information on how special characters are handled within a regular expression is provided below. This information is not meant to be a comprehensive guide on regular expression usage or syntax. 

-   `/`**:** A forward slash is treated as a literal character instead of a special regular expression character. Do not escape it.
-   `\`**:** A backslash in a regular expression typically:
	-   Defines a shorthand character class (e.g., `\d` instead of `[0-9]`).
	-   Escapes the character that follows it. This causes that character to be treated as a literal value instead of taking on its regular expression meaning.

		For example, the following syntax escapes an asterisk: `\*`

		<Callout type="important">

		  A single backslash is always ignored when defining a regular expression for a match condition. Contact our customer support team if you would like to escape a special character when defining a regular expression for a match condition.

		</Callout>

-   `%`**:** The meaning of a percentage symbol depends on its usage.
	-   `%{<HTTP VARIABLE>}:` This syntax identifies an HTTP variable.
	-   `%{<HTTP VARIABLE%PATTERN>}:` This syntax uses a percentage symbol to identify an HTTP variable and as a delimiter.
	-   `\%:` Escaping a percentage symbol allows it to be used as a literal value or to indicate URL encoding (e.g., `\%20`).

-   `*`**:** An asterisk allows the preceding character to be matched zero or more times.
-   `<SPACE>`**:** A space character is typically treated as a literal character.
-   `'`**:** Single quotes are treated as literal characters. A set of single quotes does not have special meaning.

**Example:**

The following request will result in a match when the `Path` condition is set to `/shows/[0-9]+`:

`http://cdn.example.com/shows/5309`

### Does Not Match Regular Expression

Indicates that the value derived from the request must not match a regular expression. 

**Example:**

The following request will result in a match when the `Path` condition is set to `/shows/[0-9]+`:

`http://cdn.example.com/shows/cdn-detectives`

### In

Indicates that the value derived from the request must be an exact match to the one of the value(s) defined within a condition.

<Callout type="info">

  Add a value by typing it and then pressing `ENTER`. Remove a value from the list by clicking the `x` icon that appears directly to the right of it. A sample list item is shown below.

  ![List item](/images/v7/performance/list-item.png)

</Callout>

### Not In

Indicates that the value derived from the request must not be an exact match to the one of the value(s) defined within a condition.

<Callout type="info">

  Add a value by typing it and then pressing `ENTER`. Remove a value from the list by clicking the `x` icon that appears directly to the right of it.

</Callout>

### Less than

Indicates that the value derived from the request must be less than the value(s) defined within a condition.

### Less than or Equal

Indicates that the value derived from the request must be less than or equal to the value(s) defined within a condition.

### Greater than

Indicates that the value derived from the request must be greater than the value(s) defined within a condition.

### Greater than or Equal

Indicates that the value derived from the request must be greater than or equal to the value(s) defined within a condition.