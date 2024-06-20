---
title: AWS S3 Request Signing
---

{{ ef_req_edgejs.md }}

[Sign AWS S3 requests](https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-authenticating-requests.html) using the AWS Signature Version 4 algorithm. This process involves calculating a signature using the request's elements and your AWS access keys. This signature ensures that AWS can verify the request as being sent by an authenticated source, enhancing security when accessing AWS S3. Integrating this with Edge Functions allows for efficient and secure fetching of assets from S3 buckets.

<ExampleButtons
  title="AWS S3 Request Signing"
  siteUrl="https://edgio-community-examples-v7-aws-s3-request-signing-live.glb.edgio.link"
  repoUrl="https://github.com/edgio-docs/edgio-v7-aws-s3-request-signing-example"
/>

## Dependencies {/* dependencies */}

This guide references the following dependencies that will need to be installed in your project:

<PackageCommand>

```
npm install crypto-js aws4fetch
---
yarn add crypto-js aws4fetch
```

</PackageCommand>

## Router Configuration {/* router-configuration */}

In the {{ PRODUCT }} router, you can use the `edge_function` feature to specify the path to the edge function that will handle requests to assets in the S3 bucket.

```js filename="routes.js"
// This file was added by edgio init.
// You should commit this file to source control.
import {Router, edgioRoutes} from '@edgio/core';

export default new Router()
  // Built-in Edgio routes
  .use(edgioRoutes)

  // Specifies the edge function for /s3/* paths. Modify the path as needed.
  .get('/s3/:anything*', {
    edge_function: './edge-functions/main.js',
  });
```

## Credentials and Origin Configuration {/* credentials-and-origin-configuration */}

AWS request signing requires the following credentials that need to be defined in your local `.env` file and within the {{ PORTAL }} for the environment you are deploying to. This information can be obtained from your AWS account.

```bash filename=".env"
# AWS S3 credentials
S3_HOSTNAME=edgio-docs-demo.s3.us-east-2.amazonaws.com
S3_REGION=us-east-2
S3_ACCESS_KEY_ID=XXX
S3_SECRET_ACCESS_KEY=YYY
```

Define your S3 origin configuration in the `{{ CONFIG_FILE }}` file:

```js filename="{{ CONFIG_FILE }}"
// This file was automatically added by edgio init.
// You should commit this file to source control.
// Learn more about this file at https://docs.edg.io/applications/edgio_config

// Load environment variables from .env file
require('dotenv').config();

module.exports = {
  // ... other configuration options ...

  origins: [
    {
      // The name of the backend origin
      name: 's3',

      // Use the following to override the host header sent from the browser when connecting to the origin
      override_host_header: process.env.S3_HOSTNAME,

      // The list of origin hosts to which to connect
      hosts: [
        {
          // The domain name or IP address of the origin server
          location: process.env.S3_HOSTNAME,
        },
      ],

      tls_verify: {
        use_sni: true,
        sni_hint_and_strict_san_check: process.env.S3_HOSTNAME,
      },

      // Uncomment the following to configure a shield
      // shields: { us_east: 'DCD' },
    },
  ],
};
```

## Edge Function {/* edge-function */}

The edge function will sign the incoming request using the `AwsV4Signer` class, and then forward the request to the S3 bucket. The `AwsV4Signer` class is a third-party library that handles the signing process and is included in the `edge-functions` directory of this example.

```js filename="edge-functions/main.js"
import {AwsV4Signer} from './awsv4'; // See the awsv4.js file below

/**
 * This edge function signs an S3 request using the AWS v4 signature algorithm
 * and forwards the request to the S3 origin. Authentication credentials are
 * read from environment variables set in the Edgio Developer Console.
 */
export async function handleHttpRequest(request, context) {
  const {S3_HOSTNAME, S3_REGION, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY} =
    context.environmentVars;

  const initialUrl = new URL(request.url);

  // Remove the /s3 prefix from the path before signing since we only
  // want to sign the path relative to the bucket.
  // For example, /s3/some-path/file.jpg becomes /some-path/file.jpg
  const s3Path = initialUrl.pathname.replace(/^\/s3/, '');
  const s3Url = new URL(s3Path, `https://${S3_HOSTNAME}`);

  const signer = new AwsV4Signer({
    url: s3Url.href,
    method: request.method,
    region: S3_REGION,
    service: 's3',
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
    signQuery: true,
  });

  const signedDetails = await signer.sign();

  return fetch(signedDetails.url, {
    method: signedDetails.method,
    headers: signedDetails.headers,
    edgio: {
      origin: 's3',
    },
  });
}
```

The `awsv4.js` file contains the `AwsV4Signer` class that handles the signing process. This class is used in the edge function to sign the incoming request.

```js filename="edge-functions/awsv4.js"
// @ts-check

import HmacSHA256 from 'crypto-js/hmac-sha256';
import SHA256 from 'crypto-js/sha256';

/**
 * @license MIT <https://opensource.org/licenses/MIT>
 * @copyright Michael Hart 2022
 */

const encoder = new TextEncoder();

/** @type {Object.<string, string>} */
const HOST_SERVICES = {
  appstream2: 'appstream',
  cloudhsmv2: 'cloudhsm',
  email: 'ses',
  marketplace: 'aws-marketplace',
  mobile: 'AWSMobileHubService',
  pinpoint: 'mobiletargeting',
  queue: 'sqs',
  'git-codecommit': 'codecommit',
  'mturk-requester-sandbox': 'mturk-requester',
  'personalize-runtime': 'personalize',
};

// https://github.com/aws/aws-sdk-js/blob/cc29728c1c4178969ebabe3bbe6b6f3159436394/lib/signers/v4.js#L190-L198
const UNSIGNABLE_HEADERS = new Set([
  'authorization',
  'content-type',
  'content-length',
  'user-agent',
  'presigned-expires',
  'expect',
  'x-amzn-trace-id',
  'range',
  'connection',
]);

export class AwsClient {
  /**
   * @param {{
   *   accessKeyId: string
   *   secretAccessKey: string
   *   sessionToken?: string
   *   service?: string
   *   region?: string
   *   cache?: Map<string,ArrayBuffer>
   *   retries?: number
   *   initRetryMs?: number
   * }} options
   */
  constructor({
    accessKeyId,
    secretAccessKey,
    sessionToken,
    service,
    region,
    cache,
    retries,
    initRetryMs,
  }) {
    if (accessKeyId == null)
      throw new TypeError('accessKeyId is a required option');
    if (secretAccessKey == null)
      throw new TypeError('secretAccessKey is a required option');
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.sessionToken = sessionToken;
    this.service = service;
    this.region = region;
    this.cache = cache || new Map();
    this.retries = retries != null ? retries : 10; // Up to 25.6 secs
    this.initRetryMs = initRetryMs || 50;
  }

  /**
   * @typedef {RequestInit & {
   *   aws?: {
   *     accessKeyId?: string
   *     secretAccessKey?: string
   *     sessionToken?: string
   *     service?: string
   *     region?: string
   *     cache?: Map<string,ArrayBuffer>
   *     datetime?: string
   *     signQuery?: boolean
   *     appendSessionToken?: boolean
   *     allHeaders?: boolean
   *     singleEncode?: boolean
   *   }
   * }} AwsRequestInit
   *
   * @param {RequestInfo} input
   * @param {?AwsRequestInit} [init]
   * @returns {Promise<Request>}
   */
  async sign(input, init) {
    if (input instanceof Request) {
      const {method, url, headers, body} = input;
      init = Object.assign({method, url, headers}, init);
      if (init.body == null && headers.has('Content-Type')) {
        init.body =
          body != null && headers.has('X-Amz-Content-Sha256')
            ? body
            : await input.clone().arrayBuffer();
      }
      input = url;
    }
    const signer = new AwsV4Signer(
      Object.assign({url: input}, init, this, init && init.aws)
    );
    const signed = Object.assign({}, init, await signer.sign());
    delete signed.aws;
    try {
      return new Request(signed.url.toString(), signed);
    } catch (e) {
      if (e instanceof TypeError) {
        // https://bugs.chromium.org/p/chromium/issues/detail?id=1360943
        return new Request(
          signed.url.toString(),
          Object.assign({duplex: 'half'}, signed)
        );
      }
      throw e;
    }
  }

  /**
   * @param {RequestInfo} input
   * @param {?AwsRequestInit} [init]
   * @returns {Promise<Response>}
   */
  async fetch(input, init) {
    for (let i = 0; i <= this.retries; i++) {
      const fetched = fetch(await this.sign(input, init));
      if (i === this.retries) {
        return fetched; // No need to await if we're returning anyway
      }
      const res = await fetched;
      if (res.status < 500 && res.status !== 429) {
        return res;
      }
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * this.initRetryMs * Math.pow(2, i))
      );
    }
    throw new Error(
      'An unknown error occurred, ensure retries is not negative'
    );
  }
}

export class AwsV4Signer {
  /**
   * @param {{
   *   method?: string
   *   url: string
   *   headers?: HeadersInit
   *   body?: BodyInit | null
   *   accessKeyId: string
   *   secretAccessKey: string
   *   sessionToken?: string
   *   service?: string
   *   region?: string
   *   cache?: Map<string,ArrayBuffer>
   *   datetime?: string
   *   signQuery?: boolean
   *   appendSessionToken?: boolean
   *   allHeaders?: boolean
   *   singleEncode?: boolean
   * }} options
   */
  constructor({
    method,
    url,
    headers,
    body,
    accessKeyId,
    secretAccessKey,
    sessionToken,
    service,
    region,
    cache,
    datetime,
    signQuery,
    appendSessionToken,
    allHeaders,
    singleEncode,
  }) {
    if (url == null) throw new TypeError('url is a required option');
    if (accessKeyId == null)
      throw new TypeError('accessKeyId is a required option');
    if (secretAccessKey == null)
      throw new TypeError('secretAccessKey is a required option');

    this.method = method || (body ? 'POST' : 'GET');
    this.url = new URL(url);
    this.headers = new Headers(headers || {});
    this.body = body;

    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.sessionToken = sessionToken;

    let guessedService, guessedRegion;
    if (!service || !region) {
      [guessedService, guessedRegion] = guessServiceRegion(
        this.url,
        this.headers
      );
    }
    /** @type {string} */
    this.service = service || guessedService || '';
    this.region = region || guessedRegion || 'us-east-1';

    this.cache = cache || new Map();
    this.datetime =
      datetime || new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
    this.signQuery = signQuery;
    this.appendSessionToken =
      appendSessionToken || this.service === 'iotdevicegateway';

    this.headers.delete('Host'); // Can't be set in insecure env anyway

    if (
      this.service === 's3' &&
      !this.signQuery &&
      !this.headers.has('X-Amz-Content-Sha256')
    ) {
      this.headers.set('X-Amz-Content-Sha256', 'UNSIGNED-PAYLOAD');
    }

    const params = this.signQuery ? this.url.searchParams : this.headers;

    params.set('X-Amz-Date', this.datetime);
    if (this.sessionToken && !this.appendSessionToken) {
      params.set('X-Amz-Security-Token', this.sessionToken);
    }

    // headers are always lowercase in keys()
    this.signableHeaders = ['host', ...this.headers.keys()]
      .filter((header) => allHeaders || !UNSIGNABLE_HEADERS.has(header))
      .sort();

    this.signedHeaders = this.signableHeaders.join(';');

    // headers are always trimmed:
    // https://fetch.spec.whatwg.org/#concept-header-value-normalize
    this.canonicalHeaders = this.signableHeaders
      .map(
        (header) =>
          header +
          ':' +
          (header === 'host'
            ? this.url.host
            : (this.headers.get(header) || '').replace(/\s+/g, ' '))
      )
      .join('\n');

    this.credentialString = [
      this.datetime.slice(0, 8),
      this.region,
      this.service,
      'aws4_request',
    ].join('/');

    if (this.signQuery) {
      if (this.service === 's3' && !params.has('X-Amz-Expires')) {
        params.set('X-Amz-Expires', '86400'); // 24 hours
      }
      params.set('X-Amz-Algorithm', 'AWS4-HMAC-SHA256');
      params.set(
        'X-Amz-Credential',
        this.accessKeyId + '/' + this.credentialString
      );
      params.set('X-Amz-SignedHeaders', this.signedHeaders);
    }

    if (this.service === 's3') {
      try {
        /** @type {string} */
        this.encodedPath = decodeURIComponent(
          this.url.pathname.replace(/\+/g, ' ')
        );
      } catch (e) {
        this.encodedPath = this.url.pathname;
      }
    } else {
      this.encodedPath = this.url.pathname.replace(/\/+/g, '/');
    }
    if (!singleEncode) {
      this.encodedPath = encodeURIComponent(this.encodedPath).replace(
        /%2F/g,
        '/'
      );
    }
    this.encodedPath = encodeRfc3986(this.encodedPath);

    const seenKeys = new Set();
    this.encodedSearch = [...this.url.searchParams]
      .filter(([k]) => {
        if (!k) return false; // no empty keys
        if (this.service === 's3') {
          if (seenKeys.has(k)) return false; // first val only for S3
          seenKeys.add(k);
        }
        return true;
      })
      .map((pair) => pair.map((p) => encodeRfc3986(encodeURIComponent(p))))
      .sort(([k1, v1], [k2, v2]) =>
        k1 < k2 ? -1 : k1 > k2 ? 1 : v1 < v2 ? -1 : v1 > v2 ? 1 : 0
      )
      .map((pair) => pair.join('='))
      .join('&');
  }

  /**
   * @returns {Promise<{
   *   method: string
   *   url: URL
   *   headers: Headers
   *   body?: BodyInit | null
   * }>}
   */
  async sign() {
    if (this.signQuery) {
      this.url.searchParams.set('X-Amz-Signature', await this.signature());
      if (this.sessionToken && this.appendSessionToken) {
        this.url.searchParams.set('X-Amz-Security-Token', this.sessionToken);
      }
    } else {
      this.headers.set('Authorization', await this.authHeader());
    }

    return {
      method: this.method,
      url: this.url,
      headers: this.headers,
      body: this.body,
    };
  }

  /**
   * @returns {Promise<string>}
   */
  async authHeader() {
    return [
      'AWS4-HMAC-SHA256 Credential=' +
        this.accessKeyId +
        '/' +
        this.credentialString,
      'SignedHeaders=' + this.signedHeaders,
      'Signature=' + (await this.signature()),
    ].join(', ');
  }

  /**
   * @returns {Promise<string>}
   */
  async signature() {
    const date = this.datetime.slice(0, 8);
    const cacheKey = [
      this.secretAccessKey,
      date,
      this.region,
      this.service,
    ].join();
    // let kCredentials = this.cache.get(cacheKey)
    const kDate = await hmac('AWS4' + this.secretAccessKey, date);
    const kRegion = await hmac(kDate, this.region);
    const kService = await hmac(kRegion, this.service);
    const kCredentials = await hmac(kService, 'aws4_request');
    return (await hmac(kCredentials, await this.stringToSign())).toString();
  }

  /**
   * @returns {Promise<string>}
   */
  async stringToSign() {
    return [
      'AWS4-HMAC-SHA256',
      this.datetime,
      this.credentialString,
      (await hash(await this.canonicalString())).toString(),
    ].join('\n');
  }

  /**
   * @returns {Promise<string>}
   */
  async canonicalString() {
    return [
      this.method.toUpperCase(),
      this.encodedPath,
      this.encodedSearch,
      this.canonicalHeaders + '\n',
      this.signedHeaders,
      await this.hexBodyHash(),
    ].join('\n');
  }

  /**
   * @returns {Promise<string>}
   */
  async hexBodyHash() {
    let hashHeader =
      this.headers.get('X-Amz-Content-Sha256') ||
      (this.service === 's3' && this.signQuery ? 'UNSIGNED-PAYLOAD' : null);
    if (hashHeader == null) {
      if (
        this.body &&
        typeof this.body !== 'string' &&
        !('byteLength' in this.body)
      ) {
        throw new Error(
          'body must be a string, ArrayBuffer or ArrayBufferView, unless you include the X-Amz-Content-Sha256 header'
        );
      }
      hashHeader = (await hash(this.body || '')).toString();
    }
    return hashHeader;
  }
}

/**
 * @param {string} key
 * @param {string} payload
 // * @returns {Promise<ArrayBuffer>}
 */
async function hmac(key, payload) {
  // @ts-ignore // https://github.com/microsoft/TypeScript/issues/38715
  // const cryptoKey = await crypto.subtle.importKey(
  //     'raw',
  //     typeof key === 'string' ? encoder.encode(key) : key,
  //     { name: 'HMAC', hash: { name: 'SHA-256' } },
  //     false,
  //     ['sign'],
  // )
  // return crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(string))
  return HmacSHA256(payload, key);
}

/**
 * @param {string | ArrayBufferView | ArrayBuffer} content
 * @returns {Promise<ArrayBuffer>}
 */
async function hash(content) {
  // @ts-ignore // https://github.com/microsoft/TypeScript/issues/38715
  // return crypto.subtle.digest('SHA-256', typeof content === 'string' ? encoder.encode(content) : content)
  return SHA256(content).toString();
}

/**
 * @param {ArrayBuffer | ArrayLike<number> | SharedArrayBuffer} buffer
 * @returns {string}
 */
function buf2hex(buffer) {
  return Array.prototype.map
    .call(new Uint8Array(buffer), (x) => ('0' + x.toString(16)).slice(-2))
    .join('');
}

/**
 * @param {string} urlEncodedStr
 * @returns {string}
 */
function encodeRfc3986(urlEncodedStr) {
  return urlEncodedStr.replace(
    /[!'()*]/g,
    (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase()
  );
}

/**
 * @param {URL} url
 * @param {Headers} headers
 * @returns {string[]} [service, region]
 */
function guessServiceRegion(url, headers) {
  const {hostname, pathname} = url;

  if (hostname.endsWith('.r2.cloudflarestorage.com')) {
    return ['s3', 'auto'];
  }
  if (hostname.endsWith('.backblazeb2.com')) {
    const match = hostname.match(/^(?:[^.]+\.)?s3\.([^.]+)\.backblazeb2\.com$/);
    return match != null ? ['s3', match[1]] : ['', ''];
  }
  const match = hostname
    .replace('dualstack.', '')
    .match(/([^.]+)\.(?:([^.]*)\.)?amazonaws\.com(?:\.cn)?$/);
  let [service, region] = (match || ['', '']).slice(1, 3);

  if (region === 'us-gov') {
    region = 'us-gov-west-1';
  } else if (region === 's3' || region === 's3-accelerate') {
    region = 'us-east-1';
    service = 's3';
  } else if (service === 'iot') {
    if (hostname.startsWith('iot.')) {
      service = 'execute-api';
    } else if (hostname.startsWith('data.jobs.iot.')) {
      service = 'iot-jobs-data';
    } else {
      service = pathname === '/mqtt' ? 'iotdevicegateway' : 'iotdata';
    }
  } else if (service === 'autoscaling') {
    const targetPrefix = (headers.get('X-Amz-Target') || '').split('.')[0];
    if (targetPrefix === 'AnyScaleFrontendService') {
      service = 'application-autoscaling';
    } else if (targetPrefix === 'AnyScaleScalingPlannerFrontendService') {
      service = 'autoscaling-plans';
    }
  } else if (region == null && service.startsWith('s3-')) {
    region = service.slice(3).replace(/^fips-|^external-1/, '');
    service = 's3';
  } else if (service.endsWith('-fips')) {
    service = service.slice(0, -5);
  } else if (region && /-\d$/.test(service) && !/-\d$/.test(region)) {
    [service, region] = [region, service];
  }

  return [HOST_SERVICES[service] || service, region];
}
```
