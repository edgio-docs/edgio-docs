---
title: Portal User Guide
---

The CMS portal is the hub through which the following tasks may be performed:

-   Track and manage on-demand content stored in the cloud.
-   Set up and monitor live channels.
-   Set up, monitor, and operate live events.
-   View analytics on live and on-demand streaming.
-   Track billing data.
-   Manage account settings.
-   Manage system settings.

## Signing Up  {/*signing-up*/}

Access to the CMS portal requires an account.

**To set up and sign in to your account**

1. [Sign up for an account]( {{ URL_SIGNUP }} ). After which, a confirmation message will be sent to your email address.
2. Confirm your email address by following the link provided in the confirmation message.
3. Log in to the CMS using the credentials provided during account sign up.

## Authentication  {/*authentication*/}

Authenticate to the CMS portal using your:

-   **User Name**: Your user name is typically set to your email address. Define a new email address from the *Account Settings* page.
-   **Password**: Change your password by clicking "Reset password" from the *Account Settings* page.

    Specify a password that:
    - Contains at least one of each of the following types of characters:
    - Upper-case letters

    - Lower-case letters

    - Numbers

    - Symbols

- Contains at least eight characters.
- Is different from your current password.


<Callout type="info">Your account is automatically locked for 30 minutes after six consecutive unsuccessful log in attempts. Manually unlock your account by changing your password.</Callout>

<Callout type="info">Resetting your password will redirect you to an {{ IDENTITY }} page hosted on {{ UPLYNK_PORTAL_URL }}.</Callout>

## {{ IDENTITY }} FAQs  {/*faqs*/}

**What is {{ IDENTITY }}?**<br />{{ IDENTITY }} is a single sign-on (SSO) and {{ IDENTITY }} management solution.

**What does {{ IDENTITY }} have to do with my credentials?**<br />Each Edgecast property uses {{ IDENTITY }} to authenticate and authorize access.Each user account in an Edgecast property is actually an {{ IDENTITY }} user account.

<Callout type="info">Although an Edgecast property may allow updates to user names, passwords, or both, it delegates user account administration to {{ IDENTITY }}.></Callout>

**What is an Edgecast property?** <!-- Liran: what about these links? What about "edgecast property"?-->
An Edgecast property identifies one of the following self-service portals:
<!-- Julie add links after figure out how to link a constant-->
- CDN (my.edgecast.com)
- Transact (my.transactcdn.com)
- Streaming (cms.uplynk.com)
- {{ IDENTITY }} dashboard (manage.vdms.io)
- Partners Only: PCC (partner.edgecast.com)
- Wholesalers Only: WCC (wholesale.edgecast.com)

<Callout type="info">Our {{ IDENTITY }} solution controls authentication and authorization to the above portals.</Callout>

**Will I also be logged into {{ IDENTITY }} upon logging in to an Edgecast property?** <br />Yes.

**Will I also be logged out of {{ IDENTITY }} upon logging out of an Edgecast property?**<br />Yes. Logging out of {{ IDENTITY }} will not log you out from an active Edgecast property session. If you have an active Edgecast property session, then you will also need to log out of each desired Edgecast property.

**How do I log out of {{ IDENTITY }}?**

<Callout type="info">Logging out of {{ IDENTITY }} will not log you out from an active Edgecast property session. If you have an active Edgecast property session, then you will also need to log out of each desired Edgecast property.</Callout>

Log out of {{ IDENTITY }} by performing the following steps:

1. Load the {{ IDENTITY }} dashboard.
    <Callout type="info">If you are prompted to log in, then you are already logged out of {{ IDENTITY }}.</Callout>

2. From your settings menu, click **Logout**.

3. Click **Logout**.
