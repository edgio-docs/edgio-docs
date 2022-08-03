---
title: SAML Single Sign On
---

This guide shows you how to setup a SSO using SAML Identity Provider (IDP).

Configuring SAML (Security Assertion Markup Language) for your {{ PRODUCT }} account lets you and all your teammates login to {{ PRODUCT }} using the credentials stored in your organization’s SAML Identity Provider (IDP).

**Note**: If you don’t have SAML enabled on your {{ PRODUCT }} team, reach out to [support]({{ SUPPORT_URL }}) to enable it.

## Setup {/*setup*/}

{{ PRODUCT }} currently supports SAML SSO setup via a SAML metadata discovery URL. This setup process will combine configuration in your {{ PRODUCT }} team account as well as your SAML provider.

### Enable SAML Single Sign on in {{ PRODUCT }} {/*enable-saml-single-sign-on-in-layer0*/}

1. Login to your existing [{{ PRODUCT }}]({{ WWW_URL}}) account and change to your team.
2. Navigate to team settings.
3. Find the SAML section and click **ENABLE SAML SSO**

![](/images/saml/saml1.jpg)

4. Get SAML metadata url from your Identity Provider (IDP). (See instructions below)
5. Enter SAML metadata url and click **Save**

![](/images/saml/saml3.jpg)

6. After you've successfully saved the metadata configuration, click **Verify** button to link your current account and test the configuration

![](/images/saml/saml4.jpg)

### Disable other sign-in methods {/*disable-other-sign-in-methods*/}

Once you have verified the configuration and it appears to be working, then you can disable all other sign-in methods for SSO users.

![](/images/saml/saml5.jpg)

#### Linking existing team members {/*linking-existing-team-members*/}

When you already have team members in your team, they can still login to existing account with any sign-in method. They need to link their account to the SAML provider. Accounts can be linked from their user settings [My Account](https://app.layer0.co/account) page.

![](/images/saml/saml6.jpg)

## Identity Providers {/*identity-providers*/}

Each identity provider requires slightly different setup. Below you will find instructions for a few providers.

### Auth0 {/*auth0*/}

1. In Auth0, go to **Dashboard > Applications** and either create a new application (Regular Web Application) or click the name of an application to update.
2. In Auth0, go to the **Addons** tab and enable the SAML2 Web App toggle.
3. In {{ PRODUCT }}, go to **Team > Settings** and copy "Assertion Consumer Service URL". In Auth0, got **Addons > SAML2 Web App > Settings (popup)** set it as **Application Callback URL**. Scroll to the bottom of the popup and click **Enable**
4. In Auth0, go to the **Application > Settings > Advnaced Settings > Endpoints** and copy the SAML Metadata URL.
5. Go to the {{ PRODUCT }} Console **Team > Settings** and enter the metadata URL to SAML configuration section in **{{ PRODUCT }} Console**. Save and then verify the metadata URL.

### Salesforce {/*salesforce*/}

1. In SF, Go to **Setup > Apps > App Manager** and select **New Connected App**. Fill in the Application Name, API name and all other fields that are required
2. Select checkbox **Enable SAML**.
3. In {{ PRODUCT }}, go to **Team > Settings** and copy "Entity ID" and "Assertion Consumer Service URL" (ACS URL) and fill in the corresponding fields in Salesforce. After you have configured all the fields click **Save**.
4. Open the created application and copy **SAML Metadata Discovery Endpoints**.
5. Go to the {{ PRODUCT }} Console **Team > Settings** and enter the metadata URL to SAML configuration section in **{{ PRODUCT }} Console**. Save and then verify the metadata URL.
6. In SF, allow users to access Connected Apps via editing the **Setup > Profiles** and edit the required profile. Select the app you created in step **2.**

Once you have configured the Service Provider, you can view logs from Salesforce if something is not working. Logs are available from **Setup > Identity > Identity Provider Event Log**

### Okta {/*okta*/}

1. In Okta, go to **Dashboard > Applications** and select **Create App Integration**.
2. Select SAML 2.0 and fill in the App name and other required fields.
3. In {{ PRODUCT }}, go to **Team > Settings** and copy "Entity ID" and "Assertion Consumer Service URL" (ACS URL) and fill the corresponding fields in Okta.

- Single sign on URL - Assertion Consumer Service URL
- Recipient URL - Assertion Consumer Service URL
- Destination URL - Assertion Consumer Service URL
- Audience URI (SP Entity ID) - Entity ID

4. Create Attribute Statement (map fields) for email address.

- Name: Email
- Value: user.email

6. **Save** the application after configurations are entered.
7. In Okta, navigate to the **Sign On** tab. Select "dynamic configuration" and copy the metadata url. For example, `https://example.okta.com/app/XXXXXX/sso/saml/metadata`.
8. Go to the {{ PRODUCT }} Console **Team > Settings** and enter the metadata URL to SAML configuration section in **{{ PRODUCT }} Console**. Save and then verify the metadata URL.
9. In Okta, assign created the application to users. [More information](https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-assign-apps.htm)
