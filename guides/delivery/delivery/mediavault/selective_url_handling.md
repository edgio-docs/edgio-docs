---
title: Selective URL Handling
---
`hashsecret_queryterm_list <val_only> <order> <exclude> <qt_list>`

This option allows you to specify which queryterms are to be included in the authentication. The queryterms in the list will be used in the authentication if they are present in the URL. The list does not indicate required queryterms that must be present in the URL. The option has flags to control its behavior.

### Rewrite Options  {/*rewrite-options*/}
|   Option  |   Type  | Description    |
| --- | --- | --- |
| `<val_only>` | flag | Determines if we are using just the queryterm value.  <br />-0 (zero) means we use the queryterm name and value in the calculation (like we do today).  <br />-1 (one) means we just use the queryterm values. |
| `<order>` | flag | Determines the order that queryterms are used in the hash calculation.  <br />- 0 (zero) means that we'll use the queryterms in the order we find them in the request URL.  <br />-1 (one) means we'll use the queryterms in the order they are in the `<qt_list>` of this option.  <br />Note: this flag is not currently implemented (queryterms will be used in the order they are found in the request URL). This flag should be set to zero. |
| `<exclude>` | flag | Indicates whether this list of queryterms are to be included or excluded from the hash calculation.  <br />-0 (zero) means that the queryterms are to be included in the hash calculation; queryterms not in the list are ignored.  <br />-1 (one) means that the queryterms are to be excluded from the hash calculation; only queryterms not in this list will be included in the calculation.  <br />Note: this flag is not currently implemented (the queryterms in the list will be included in the hash calculation). This flag should be set to zero. |
| `<qt_list>` | comma separated list of queryterms | To be used in the calculation. It is important to note that these are the actual queryterm names as they will appear in the request URL. |

### Example 1  {/*example1*/}

```
hashsecret_queryterm_list 0 0 0 qt1,qt2

calculated as: <url>?qt1=qt1_val&qt2=qt2_val
```


### Example 2:  {/*example2*/}

```
hashsecret_queryterm_list 1 0 0 qt1,qt2

calculated as: <url><qt1_val><qt2_val>
```

<Callout type="info">When doing values only, the values are packed together without a '&' between and the trailing '?' is not used.</Callout>
