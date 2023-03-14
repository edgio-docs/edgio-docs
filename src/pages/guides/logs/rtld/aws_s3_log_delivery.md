---
title: AWS S3 Log Delivery
---

RTLD may automatically deliver compressed log data to an AWS S3 bucket by submitting HTTPS PUT requests to it. Each request adds an object to the bucket. This object contains a compressed JSON or CSV document that uniquely identifies a set of log data and describes one or more log entries.

**Key information:**

-   The set of available log fields varies by RTLD module: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)
-   RTLD applies gzip compression to log data. AWS S3 stores compressed log data as an object with a `gz` file extension.
    
    [Learn more.](/guides/logs/rtld/log_file_naming_convention)
    
-   AWS S3 may automatically decompress files downloaded via the S3 Management Console into JSON or CSV files. No additional decompression is required to process this data.
-   RTLD requires a [bucket policy](#bucket-policy) that authorizes our service to upload content to your bucket.
-   If you have enabled server-side encryption on the desired AWS S3 bucket, then you must also enable default bucket encryption. Otherwise, RTLD will be unable to post log data to that bucket.
    
    RTLD does not include Amazon-specific encryption headers when posting log data to your bucket.
    
    [View AWS documentation on default bucket encryption.](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html)

    <a id="log-file-prefix" />

-   You may define a prefix when setting up a log delivery profile. This prefix defines a virtual log file storage location and/or a prefix that will be pre-pended to the name of each object added to your bucket. Use the following guidelines when setting this prefix:
    
    -   A prefix should not start with a forward slash.
    -   A forward slash within the specified prefix is interpreted as a delimiter for a virtual directory.
    -   A trailing forward slash means that the specified value only defines a virtual directory path within your bucket where logs will be stored. If the specified value ends in a character other than a forward slash, then the characters specified after the forward slash will be prepended to the file name for each log file uploaded to your destination.
        
    **Sample prefix:** `logs/CDN/siteA_`
        
    The above prefix will store log files in the following virtual directory: `/logs/CDN`
        
    The file name for each log file uploaded to your destination will start with `siteA_`.
        
    **Sample log file name:** `siteA_wpc_0001_123_20220111_50550000F98AB95B_1.json`

**To prepare for log delivery**

1.  Create or identify an AWS S3 bucket to which log data will be posted.
    
    [View AWS documentation on how to create a bucket.](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/create-bucket.html)

    <a id="bucket-policy" />
    
2.  Apply the following bucket policy to the AWS S3 bucket identified in step 1. This bucket policy authorizes our service to upload content to your bucket.
    
    [View AWS documentation on how to add a bucket policy.](https://docs.aws.amazon.com/AmazonS3/latest/userguide/add-bucket-policy.html)

    ```AWS-S3-Bucket-Policy
    {
    	"Version": "2012-10-17",
    	"Statement": \[{
    			"Sid": "CDNRealTimeLogDelivery",
    			"Effect": "Allow",
    			"Principal": {
    				"AWS": "arn:aws:iam::638349102478:user/real-time-log-delivery"
    			},
    			"Action": \[
    				"s3:PutObject",
    				"s3:GetBucketLocation",
    				"s3:PutObjectTagging",
    				"s3:PutObjectACL"
    			\],
    			"Resource": \[
    				"arn:aws:s3:::BUCKET-NAME",
    				"arn:aws:s3:::BUCKET-NAME/\*"
    			\]
    		}
    	\]
    }
    ```
    
    Replace the term `BUCKET-NAME` in lines 16 and 17 with the name of the AWS S3 bucket to which this policy is being applied.
    
3.  If you have enabled server-side encryption on the AWS S3 bucket identified in step 1, then you must also enable default bucket encryption.
    
    [View AWS documentation on default bucket encryption.](https://docs.aws.amazon.com/AmazonS3/latest/userguide/default-bucket-encryption.html)
    
4.  Optional. Set up AWS to process the log data that will be posted to it.
    
    Example:
    
    Leverage [AWS Lambda](https://aws.amazon.com/documentation/lambda/) to mine specific data from log entries.

5.  Upon completing the above steps, you should create a log delivery profile for AWS S3.

{{ RTLD_PROFILE_SETUP_1 }} AWS S3.

    1.  Set the **Bucket** option to the name of the AWS S3 bucket to which log data will be posted.

    2.  Optional. Set the **Prefix** option to the desired prefix that defines a virtual log file storage location and/or a prefix that will be added to each object added to your bucket.

        [Learn more.](#log-file-prefix)

    3.  From the **AWS Region** option, select the region assigned to the AWS S3 bucket.

{{ RTLD_PROFILE_SETUP_2 }}
