// NOTE: While this is base config is primarily based on v7,
// all versions inherit these values. Changing these values
// will affect all versions and should be avoided unless a new
// variable is being added. Otherwise, all overrides should be
// made in the versioned config files.

const COMPANY_NAME = 'Edgio';
const PRODUCT_NAME = 'Edgio';
const PRODUCT = 'Edgio';
const PRODUCT_LEGACY = 'Layer0';
const PRODUCT_EDGE = 'Performance';
const PRODUCT_APPLICATIONS = 'Applications';
const PRODUCT_PLATFORM = 'Sites';
const PRODUCT_SECURITY = 'Security';
const PRODUCT_NAME_LOWER = PRODUCT.toLowerCase();
const PRODUCT_NAME_UPPER = PRODUCT.toUpperCase();
const PRODUCT_LEGACY_LOWER = PRODUCT_LEGACY.toLowerCase();
const PORTAL = `${COMPANY_NAME} Developer console`;

const CLI_NAME = 'edg';
const FULL_CLI_NAME = 'edgio';
const PACKAGE_NAME = '@edgio';
const PACKAGE_VERSION = 'latest';
const INIT_ARG_EDGIO_VERSION = `--edgioVersion ${PACKAGE_VERSION}`;
const CONFIG_FILE = 'edgio.config.js';
const ROUTES_FILE = `\`routes.[js|ts]\``;
const HEADER_PREFIX = 'x-edg';
const COOKIE_PREFIX = 'edgio';
const RUM_NS = 'Edgio'; // namespace for the JS package used by RUM

const DOMAIN = 'edg.io';
const DOMAIN_LEGACY = 'layer0.co';
const APP_DOMAIN = `edgio.app`;
const LINK_DOMAIN = `edgio.link`;
const PERMALINK_DOMAIN = `edgio-perma.link`;
const RUM_DOMAIN = `rum.layer0.co`;
const DOCS_DOMAIN = `docs.${DOMAIN}`;
const DOCS_PAGES_DOMAIN = 'layer0-docs.s3.amazonaws.com';
const DOCS_REPO = 'edgio-docs/edgio-docs';
const EXAMPLES_REPO = 'edgio-docs/edgio-examples';

const WWW_URL = `https://www.${DOMAIN}`;
const APP_URL = `https://${APP_DOMAIN}`;
const FORUM_URL = `https://forum.${DOMAIN}`;
const FIDDLE_URL = `https://fiddle.${DOMAIN}`;
const STATUS_URL = `https://status.${DOMAIN}`;
const HELP_URL = `https://${DOMAIN}/contact-support/?sgId=7bc47c45-c1d6-4189-b416-552581d86006`;
const SUPPORT_URL = `https://${DOMAIN}/contact-support/?sgId=7bc47c45-c1d6-4189-b416-552581d86006`;
const DOCS_URL = `https://${DOCS_DOMAIN}`;
const DOCS_PAGES_REPO_URL = `https://${DOCS_PAGES_DOMAIN}`;
const LOGIN_URL = `${APP_URL}/?sgId=ef4d5169-93f2-4f55-aabb-dc3be4286e1f`;

const PORTAL_LINK = `[${PORTAL}](${LOGIN_URL})`;

const NODE_VERSION = '16.x';
const STARTER_NAME = 'layer0-app';
const EDGEJS_LABEL = 'EdgeJS';

const YEAR = '2023';

const EXAMPLES_REPOS = {
  angular: 'https://github.com/edgio-docs/edgio-angular-example',
  astro: 'https://github.com/edgio-docs/edgio-astro-example',
  cdn: 'https://github.com/edgio-docs/edgio-cdn-example',
  fastboot: 'https://github.com/edgio-docs/edgio-ember-fastboot-example',
  frontity: 'https://github.com/edgio-docs/edgio-frontity-example',
  gatsby: 'https://github.com/edgio-docs/edgio-gatsby-example',
  next: 'https://github.com/edgio-docs/edgio-nextjs-example',
  nextcommerce: 'https://github.com/edgio-docs/edgio-nextjs-commerce-example',
  nuxt: 'https://github.com/edgio-docs/edgio-nuxt-example',
  nx: 'https://github.com/edgio-docs/edgio-nx-example',
  razzle: 'https://github.com/edgio-docs/edgio-razzle-example',
  sapper: 'https://github.com/edgio-docs/edgio-sapper-example',
  spartacus: 'https://github.com/edgio-docs/edgio-spartacus-example',
  svelte: 'https://github.com/edgio-docs/edgio-svelte-example',
  vsf: 'https://github.com/edgio-docs/edgio-vue-storefront-example',
  'static-backbone': 'https://github.com/edgio-docs/static-backbonejs-example',
  'static-react': 'https://github.com/edgio-docs/edgio-static-react-example',
  'static-vue': 'https://github.com/edgio-docs/edgio-static-vuejs-example',
};

const SYSTEM_REQUIREMENTS = `## System Requirements {/*system-requirements*/}

- [Install Node.js 16.16.0](/guides/install_nodejs)`;

const SYSTEM_REQUIREMENTS_H3 = `### System Requirements {/*system-requirements*/}

- [Install Node.js 16.16.0](/guides/install_nodejs)`;

const SIGN_UP = `## Sign up for ${PRODUCT} {/*sign-up*/}

Deploying requires an account on ${PRODUCT}. <a href="${APP_URL}/signup">Sign up here for free.</a>`;

const INSTALL_CLI = `## Install the ${PRODUCT_NAME} CLI {/*install-the-cli*/}

If you have not already done so, install the [${PRODUCT_NAME} CLI](/guides/develop/cli).

<SnippetGroup>

\`\`\`bash tabLabel="npm"
npm i -g ${PACKAGE_NAME}/cli
\`\`\`

\`\`\`bash tabLabel="Yarn"
yarn global add ${PACKAGE_NAME}/cli
\`\`\`

</SnippetGroup>
`;

const INIT_DEFAULT_PACKAGES = `
- The \`${PACKAGE_NAME}/cli\` package - Allows you to control ${PRODUCT} through project-local CLI.
- The \`${PACKAGE_NAME}/core\` package - Allows you to declare routes and deploy your application to ${PRODUCT}.
- The \`${PACKAGE_NAME}/prefetch\` package - Allows you to configure a service worker to prefetch and cache pages to improve browsing speed.
- The \`${PACKAGE_NAME}/devtools\` package - Allows you to monitor the caching and prefetching functionality.
`;

const INIT_DEFAULT_FILES = `
- \`${CONFIG_FILE}\` - Contains various configuration options for ${PRODUCT}.
- \`routes.js\` - A default routes file that proxies all requests to the server. Update this file to add caching or proxy some URLs to a different origin.
- \`sw/service-worker.js\` - A service worker implemented using Workbox.
`;

const PREFETCH_TIER1_INTRO = `
The \`${FULL_CLI_NAME} init\` command adds a service worker based on [Workbox](https://developers.google.com/web/tools/workbox) at \`sw/service-worker.js\`. 
If you have an existing service worker that uses workbox, you can copy its contents into \`sw/service-worker.js\` and simply add the following to your service worker:

\`\`\`js filename="sw/service-worker.js"
import { Prefetcher } from '${PACKAGE_NAME}/prefetch/sw';

new Prefetcher().route();
\`\`\``;

const PREREQ = `
${SYSTEM_REQUIREMENTS}

${SIGN_UP}

${INSTALL_CLI}
`.trim();

const INSTALL_CLI_STEP = `Install the ${PRODUCT_NAME} CLI

If you have not already done so, install the [${PRODUCT_NAME} CLI](/guides/develop/cli).

<SnippetGroup>

\`\`\`bash tabLabel="npm"
npm i -g ${PACKAGE_NAME}/cli
\`\`\`

\`\`\`bash tabLabel="Yarn"
yarn global add ${PACKAGE_NAME}/cli
\`\`\`

</SnippetGroup>
`;

const ROUTEHELPER = `<Callout type="important">

  If you are an existing customer, we know that you may be excited to try out ${PRODUCT} ${PRODUCT_APPLICATIONS} v7. However, this major version upgrade may require [significant changes to your CDN-as-code configuration](/guides/v7/intro#cdn-as-code) as certain core legacy components have limited support. In the near future, we plan on introducing a migration guide to ease this transition. In the meantime, if you have questions, contact your account manager or our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463.

</Callout>
`;

const SECURITY_NAV = `1.  From the ${PORTAL_LINK}, select the desired team space. 
    2.  From the **Security** section, click `;

const ENV_NAV = `1.  From the ${PORTAL_LINK}, select the desired private or team space.
    2.  Select the desired property.
    3.  From the left-hand pane, select the desired environment from under the **Environments** section.
    4.  From the left-hand pane, select`;

const ACCOUNT_UPGRADE = `Contact your account manager or our [sales department](https://edg.io/contact-us/) at 1 (866) 200 - 5463 to upgrade your account.`;

const RTLD_PROFILE_SETUP_1 = `**To set up a log delivery profile**

1.  From the **Real-Time Log Delivery** page, click **+ New Log Delivery Profile** and then select the desired type of log field.

    1.  Open the desired property.

        1.  Select either your private space or a team space.
        2.  Click on the desired property.

    2.  From the left pane, click on the desired environment.
    3.  From the left pane, click **Realtime Log Delivery**.
    4.  Click **+ New Log Delivery Profile** and then select either **CDN**, **Rate Limiting**, or **WAF**.

2.  From the **Profile Name** option, assign a name to this log delivery profile.
3.  From the **Log Delivery Method** option, select`;

const RTLD_PROFILE_SETUP_2 = `5.  From the **Log Format** option, select whether to format log data using our standard JSON format, as a JSON array, as JSON lines, or as a CSV (RTLD CDN only).
    
    Learn more about these formats: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf)

    <a id="downsampling" />

6. From the **Downsample the Logs** option, determine whether to reduce the amount of log data that will be delivered. For example, you may choose to only deliver 1% of your log data.
    
    -   **All Log Data:** Verify that the **Downsample the Logs** option is cleared.
    -   **Downsampled Log Data:** Downsample logs to 0.1%, 1%, 25%, 50%, or 75% of total log data by marking the **Downsample the Logs** option and then selecting the desired rate from the **Downsampling Rate** option.

        <Callout type="tip">

          Use this capability to reduce the amount of data that needs to be processed or stored within your web server(s).  

        </Callout>

        <Callout type="info">

          **RTLD CDN Only:** Downsampling log data also reduces usage charges for this service.

        </Callout>

7.  Determine whether log data will be filtered.

    -   [RTLD CDN](#filtering-rtld-cdn-log-data)
    -   [RTLD Rate Limiting](#filtering-rtld-rate-limiting-log-data)
    -   [RTLD WAF](#filtering-rtld-waf-log-data)

8.  By default, all log fields are enabled on a new log delivery profile. Clear each field for which log data should not be reported. Adjust the set of log fields that will be included within this log delivery profile from within the **Fields** section.

    Log fields are categorized. You may add or remove individual fields by expanding a category and then marking or clearing specific log fields. Alternatively, add or remove all of the log fields associated with a category by marking or clearing the desired category.

    **RTLD CDN Only:** You may also log request headers, response headers, and cookies by adding them through the **Custom Request Headers**, **Custom Response Headers**, and **Custom Cookies** options. You may either select the name of the desired header or cookie, or type its name and then press \`ENTER\`. Click on the list to add additional headers or cookies. Remove a header or cookie by clicking on its \`x\`.

    <Callout type="tip">

      Although other settings take effect quickly, it may take up to 90 minutes to log data for custom request/response headers and cookies. 

    </Callout>

    Learn more about log fields: [RTLD CDN](/guides/logs/rtld/log_fields_rtld_cdn#logs-array) | [RTLD Rate Limiting](/guides/logs/rtld/log_fields_rtld_rate_limiting#logs-array) | [RTLD WAF](/guides/logs/rtld/log_fields_rtld_waf#logs-array)

9.  Click **Create Log Delivery Profile**.

## Filtering Log Data {/*filtering-log-data*/}

Filter log data to only include relevant information and to reduce the amount of data being ingested. Filtering options vary by RTLD module.

<Callout type="info">

  An alternative method for reducing the amount of log data sent to your destination is [downsampling](#downsampling). However, downsampling log data is indiscriminate, while filtering allows you to target the set of traffic that is most relevant to your business needs.

</Callout>

### Filtering RTLD CDN Log Data {/*filtering-rtld-cdn-log-data*/}

You may filter by:

-   **Hostname:** Filter log data to only include traffic directed to the desired hostname(s). Set up hostname filtering within the **Filter by Hostname** section.
        
    -   Filter log data by one or more hostname(s) by:
            
        1.  Determine whether log data will be filtered to include or exclude requests to the selected hostname(s) by selecting either **Matches** or **Does Not Match**, respectively.
        2.  Click within the **Hostnames** option and select the desired hostname(s).

        <Callout type="tip">

          Filter the list by typing the entire or partial hostname. For example, typing \`co\` will filter the list to include all hostnames that contain \`co\` (e.g., cdn.example.com and corp.example.org).

        </Callout>

    -   Upload all log data regardless of hostname: Verify that a hostname has not been defined within the **Hostnames** option. 

        Remove a hostname by clicking on its \`x\`.

-   **User Agent:** Filter log data to only include traffic that was requested by a client whose user agent matches a RE2-compatible regular expression pattern. Set up user agent filtering within the **Filter by User Agent** option.
        
    -   Filter log data by user agent: Type a RE2-compatible regular expression pattern that identifies the set of user agents by which log data will be filtered.
            
    -   Upload all log data regardless of user agent: Set it to a blank value.

-   **Status Code:** Filter log data to only include traffic for specific status code(s). Set up status code filtering within the **Filter by Status Code** section.

    -   Filter log data by status code: Select each status code class (e.g., \`2xx\` or \`3xx\`) for which log data will be delivered. 
            
    -   Upload all log data regardless of status code: Verify that a status code class (e.g., \`2xx\` and \`3xx\`) has not been defined within this option. 

        Remove a status code class by clicking on its \`x\`.

### Filtering RTLD Rate Limiting Log Data {/*filtering-rtld-rate-limiting-log-data*/}

    1.  From the **Filter by Hostname** section, perform one of the following steps:
        
        -   Filter log data by one or more hostname(s)
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected hostname(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select one or more hostnames from the option directly to the right of the above option.
                
                Filter the list by typing the entire or partial hostname. For example, typing \`co\` will filter the list to include all hostnames that contain \`co\` (e.g., cdn.example.com and corp.example.org).
                
        -   Upload all log data regardless of hostname
            
            Verify that a hostname has not been defined within this section.
            
    2.  From the **Filter by Country** section, perform one of the following steps:
        
        -   Filter log data by one or more countries:
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected countries by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select one or more countries from the option directly to the right of the above option.
                
                Filter the list by typing the entire or partial country name. For example, typing \`un\` will filter the list to include all countries that contain \`un\` (e.g., United States and United Kingdom).
                
        -   Upload all log data regardless of country of origin:
            
            Verify that a country has not been defined within this section.
            
    3.  From the **Filter by User Agent** option, perform one of the following steps:
        
        -   Filter log data by user agent
            
            Type a RE2-compatible regular expression pattern that identifies the set of user agents by which log data will be filtered.
            
        -   Upload all log data regardless of user agent
            
            Set it to a blank value.
            
    4.  From the **Filter by Client IP** option, perform one of the following steps:
        
        -   Filter log data by one or more IP addresses:
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected IP addresses by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Type one or more IP addresses within the option directly to the right of the above option.
        -   Upload all log data regardless of IP address:
            
            Verify that an IP address has not been defined within this section.
            
    5.  From the **Filter By Action Type** option, perform one of the following steps:
        
        -   Filter log data by one or more enforcement action(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected enforcement action(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select or type the name for one or more enforcement action(s).
                
        -   Upload all log data regardless of enforcement action:
            
            Verify that an enforcement action has not been defined within this section.
            
    6.  From the **Filter By Request Method** option, perform one of the following steps:
        
        -   Filter log data by one or more request method(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected request method(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select or type the name for one or more request method(s).
        -   Upload all log data regardless of request method:
            
            Verify that a request method has not been defined within this section.
            
    7.  From the **Filter By Scope Name** option, perform one of the following steps:
        
        -   Filter log data by one or more security application manager(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected security application manager(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select or type the name for one or more security application manager(s).
                
        -   Upload all log data regardless of security application manager:
            
            Verify that a security application manager(s) has not been defined within this section.
            
    8.  From the **Filter By Action Limit ID** option, perform one of the following steps:
        
        -   Filter log data by one or more rate rule(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected rate rules(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Type the name for one or more rate rule(s).
                
        -   Upload all log data regardless of rate rule:
            
            Verify that a rate rule has not been defined within this section.
            
    9.  From the **Filter By URL Regex** option, perform one of the following steps:
        
        -   Filter log data by URL
            
            Type a RE2-compatible regular expression pattern that identifies the set of URLs by which log data will be filtered.
            
        -   Upload all log data regardless of URL
            
            Set it to a blank value.

### Filtering RTLD WAF Log Data {/*filtering-rtld-waf-log-data*/}

    1.  From the **Filter by Hostname** section, perform one of the following steps:
        
        -   Filter log data by one or more hostname(s)
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected hostname(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select one or more hostnames from the option directly to the right of the above option.
                
                Filter the list by typing the entire or partial hostname. For example, typing \`co\` will filter the list to include all hostnames that contain \`co\` (e.g., cdn.example.com and corp.example.org).
                
        -   Upload all log data regardless of hostname
            
            Verify that a hostname has not been defined within this section.
            
    2.  From the **Filter by Country** section, perform one of the following steps:
        
        -   Filter log data by one or more countries:
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected countries by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select one or more countries from the option directly to the right of the above option.
                
                Filter the list by typing the entire or partial country name. For example, typing \`un\` will filter the list to include all countries that contain \`un\` (e.g., United States and United Kingdom).
                
        -   Upload all log data regardless of country of origin:
            
            Verify that a country has not been defined within this section.
            
    3.  From the **Filter by User Agent** option, perform one of the following steps:
        
        -   Filter log data by user agent
            
            Type a RE2-compatible regular expression pattern that identifies the set of user agents by which log data will be filtered.
            
        -   Upload all log data regardless of user agent
            
            Set it to a blank value.
            
    4.  From the **Filter By Security Application Manager** option, perform one of the following steps:
        
        -   Filter log data by one or more security application manager(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected security application manager(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select or type the name for one or more security application manager(s).
                
        -   Upload all log data regardless of security application manager:
            
            Verify that a security application manager(s) has not been defined within this section.
            
    5.  From the **Filter By Access Rule** option, perform one of the following steps:
        
        -   Filter log data by one or more access rule(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected access rule(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select or type the name for one or more access rule(s).
                
        -   Upload all log data regardless of access rule:
            
            Verify that an access rule has not been defined within this section.
            
    6.  From the **Filter By Custom Rule** option, perform one of the following steps:
        
        -   Filter log data by one or more custom rule(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected custom rule(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select or type the name for one or more custom rule(s).
                
        -   Upload all log data regardless of custom rule:
            
            Verify that a custom rule has not been defined within this section.
            
    7.  From the **Filter By Managed Rule** option, perform one of the following steps:
        
        -   Filter log data by one or more managed rule(s):
            
            1.  Determine whether log data will be filtered to include or exclude requests to the selected managed rule(s) by selecting either **Matches** or **Does Not Match**, respectively.
            2.  Select or type the name for one or more managed rule(s).
                
        -   Upload all log data regardless of managed rule:
            
            Verify that a managed rule has not been defined within this section.`;

const PARTNERS_CONTACT = `partner@llnw.com`;

const config = {
  ACCOUNT_UPGRADE,
  COMPANY_NAME,
  PRODUCT,
  PRODUCT_LEGACY,
  PRODUCT_APPLICATIONS,
  PRODUCT_EDGE,
  PRODUCT_PLATFORM,
  PRODUCT_SECURITY,
  PRODUCT_NAME,
  PRODUCT_NAME_LOWER,
  PRODUCT_NAME_UPPER,
  PRODUCT_LEGACY_LOWER,
  APP_DOMAIN,
  APP_URL,
  CLI_NAME,
  CONFIG_FILE,
  ROUTES_FILE,
  COOKIE_PREFIX,
  DOCS_DOMAIN,
  DOCS_PAGES_DOMAIN,
  DOCS_PAGES_REPO_URL,
  DOCS_REPO,
  DOCS_URL,
  DOMAIN,
  DOMAIN_LEGACY,
  EDGEJS_LABEL,
  ENV_NAV,
  EXAMPLES_REPO,
  EXAMPLES_REPOS,
  FIDDLE_URL,
  FORUM_URL,
  FULL_CLI_NAME,
  HEADER_PREFIX,
  HELP_URL,
  INSTALL_CLI,
  LINK_DOMAIN,
  PERMALINK_DOMAIN,
  RUM_DOMAIN,
  LOGIN_URL,
  PORTAL,
  PORTAL_LINK,
  PREREQ,
  INSTALL_CLI_STEP,
  INIT_DEFAULT_PACKAGES,
  INIT_DEFAULT_FILES,
  PREFETCH_TIER1_INTRO,
  NODE_VERSION,
  PACKAGE_NAME,
  PARTNERS_CONTACT,
  ROUTEHELPER,
  RTLD_PROFILE_SETUP_1,
  RTLD_PROFILE_SETUP_2,
  SECURITY_NAV,
  SIGN_UP,
  STARTER_NAME,
  STATUS_URL,
  SUPPORT_URL,
  SYSTEM_REQUIREMENTS_H3,
  SYSTEM_REQUIREMENTS,
  YEAR,
  WWW_URL,
  RUM_NS,
  PACKAGE_VERSION,
  INIT_ARG_EDGIO_VERSION,
};

export default config;
