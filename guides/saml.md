# SAML Single Sign On

This guide shows you how to setup a SSO using SAML Identity Provider (IDP).

Configuring SAML (Security Assertion Markup Language) for your Layer0 account lets you and all your teammates log in to Layer0 using the credentials stored in your organization’s SAML Identity Provider (IDP).

**Note**: If you don’t have SAML enabled on your Layer0 team, reach out to [support]({{ HELP_URL }}) to enable it.

## Setup

SAML SSO can be configured from your team settings by providing the SAML metadata discovery URL. This url can be retrived from your IDP.

1. Login to your existing Layer0 account
2. Navigate to Team settings
3. Find SAML section and click **Enable**
4. Get SAML metadata url from your Identity Provider (IDP). (See [examples](/guides/saml#section_identity_provider_integration_examples) below)
5. Enter SAML metadata url and click **Save**
6. After you've successfully saved the metadata configuration, click **Verify** button to link your current account and test the configuration

- Once you have verified the configuration and it appears to be working, then you can disable all other sign-in methods for SSO users.
  **Note** When you already have team members in your team they can still login to existing account with any sign-in method and they need to link their account first. Account can be linked from user settings [My Account](https://app.layer0.co/account) page.

## Identity Providers

### Using Auth0

1. Go to **Dashboard > Applications** and either create a new application or click the name of an application to update
2. Go to the **Addons** tab and enable the SAML2 Web App toggle
3. Go to the Layer0 Console **Team > Settings** and copy "Assertion Consumer Service URL" from Layer0 console and set it as **Application Callback URL**
4. Scroll to the bottom of the page and click **Enable**
5. Go to the **Application > Settings > Advnaced Settings > Endpoints** and copy SAML Metadata URL
6. Go to the Layer0 Console **Team > Settings** and enter the metadata URL to SAML configuration section in **Layer0 Console**

### Using Salesforce

1. Go to **Setup > Apps > App Manager** and select **New Connected App**
2. Fill in the Application Name, API name and all other fields that are required
3. Select checkbox **Enable SAML**
4. Get Entity ID and "Assertion Consumer Service URL" (ACS URL) from Layer0 Conosle and fill the following fields in Salesforce
5. After you have configured all the fields click **Save**
6. Open created appliaction and copy **SAML Metadata Discovery Endpoints** and enter the URL to SAML configuration section in **Layer0 Console**
7. Allow users to access Connected Apps via editing the **Setup > Profiles** and edit the required profile and select the app you've created in step **2.**

- Once you have configured the Service Provider you can see the logs from Salesforce if something is not working. Logs are available from **Setup > Identity > Identity Provider Event Log**

### Using Okta

1. Go to **Dashboard > Applications** and select **Create App Integration**
2. Select SAML 2.0
3. Fill in the App name and other required fields
4. Get Entity ID and "Assertion Consumer Service URL" (ACS URL) from Layer0 Conosle and fill the following fields in Okta.

- Single sign on URL - Assertion Consumer Service URL
- Recipient URL - Assertion Consumer Service URL
- Destination URL - Assertion Consumer Service URL
- Audience URI (SP Entity ID) - Entity ID

5. Create Attribute Statement for email address.

- Name: Email
- Value: user.email

6. **Save** application

7. Once you have saved your application, navigate to **Sign On** tab. Select dynamic configuration and copy the metadata url as example `https://example.okta.com/app/XXXXXX/sso/saml/metadata` and enter the URL to SAML configuration section in **Layer0 Console**

8. Assign created application to users. [More information](https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-assign-apps.htm)
