---
title: Account Settings
---

Your account settings consist of:
-   [Name](#name)
-   [Date/time preferences](#date-time-preferences)
-   [Password](#password)
-   [Multi-factor authentication](#multi-factor-authentication)
-   [Github Integration](#github-integration)

## Name {/*name*/}

The {{ PORTAL }} uses your profile icon, account name, and your email address to identify activity performed by you. 

**To change your name**

1.  From the {{ PORTAL_LINK }}, click your profile icon and then select **My Account**.

    ![Profile Icon](/images/v7/basics/account-settings.png?width=200)

2.  Find your name and then click the <Image inline src="/images/v7/icons/edit.png" alt="Edit" /> icon that appears directly to the right of it.
3.  Set the desired name.
4.  Click the <Image inline src="/images/v7/icons/save.png" alt="Save" /> icon.

## Date/Time Preferences {/*date-time-preferences*/}

By default, date/time values are displayed as a time period relative to the present. Additionally, hovering over a date/time value displays a timestamp. You may change how date/time values are displayed.

**To change date/time preferences**

1.  From the {{ PORTAL_LINK }}, click your profile icon and then select **My Account**.

    ![Profile Icon](/images/v7/basics/account-settings.png?width=200)

2.  Optional. From the **Display date/time values as** option, determine whether date/time values are displayed within the {{ PORTAL }} as:

    -   **Relative Time Periods:** Select `Distance (e.g. "3 days ago")`.
    -   **Timestamps:** Select `Timestamp`.

3.  Optional. Determine the formatting convention for timestamps:

    -   **United States:** Select `American (e.g. "Tuesday, February 16, 2021 at 2:31 PM GMT+02:00")`.
    -   **International:** Select `European (e.g. "Tuesday, 16 February, 2021 at 14:31 PM GMT+02:00")`.

4.  Optional. Determine whether timestamps will use:

    -   **Your Local Time Zone:** Select `Always display times in my local time zone`.
    -   **UTC:** Select `Always display times in UTC`.

## Password {/*password*/}

<Callout type="info">

  Our password policy does not apply to users that log in using Google, Github, or Microsoft.

</Callout>

If you are setting or resetting your password, specify one that:

-   Contains at least one of each of the following types of characters:
    
    -   Upper-case letters        
    -   Lower-case letters        
    -   Numbers        
    -   Symbols
        
-   Contains at least 8 characters but no more than 64 characters.
-   Is different from your last 4 passwords.
-   Does not contain a backslash (`\`).

**Key information:**

-   Your account is automatically locked for 30 minutes after six consecutive unsuccessful log in attempts. Manually unlock your account by resetting your password.
-   Our password rotation policy requires that you change your password every 90 days. Your new password must meet the requirements defined above.

### Resetting Your Password {/*resetting-your-password*/}

You may reset your password at any time. Resetting a password will generate an email message containing a password reset link. Upon following this link, you will be prompted to identify your email account and to set a new password.

**Key information:**

-   A password reset link is only valid for 1 hour.
-   If a password reset link has expired before you have reset your password, then you will need to submit another password reset request.

**To reset your password**

1.  Follow the `Forgot password?` link.
    
    1.  Load the {{ PORTAL_LINK }}'s sign in page.
    2.  Type your email address from the **Sign In To Your Account** option, and then click **Next**.   
    3.  Click the `Forgot Password?` link.

    ![Forgot Password](/images/v7/basics/forgot-password.png?width=250)
  
2.  Type your email address again and then click **Reset Password**.
3.  Check for new mail on the email account specified above. Open the message and then click **Reset your password**.
4.  Specify a new password and then confirm it by typing it again.
5.  Click **Change Password**.

## Multi-factor Authentication {/*multi-factor-authentication*/}

Protect your user account from unauthorized access by enabling multi-factor authentication (MFA). MFA is an additional security requirement that requires a time-sensitive token when logging into {{ PRODUCT }} properties, such as:

-   {{ PORTAL_LINK }}
-   [Uplynk (cms.uplynk.com)](https://cms.uplynk.com/)
-   [Identity dashboard (manage.vdms.io)](https://manage.vdms.io/)

This token, which confirms your identity, may be generated through either of the following methods:

-   [Authenticator Application:](#authenticator-application) Look up a time-sensitive token within a Time-based One-time Password-compatible (TOTP) authenticator application (e.g., [Google Authenticator](#google-authenticator)) whenever you are challenged to provide a two-factor authentication token.
    
-   [SMS Messaging:](#sms-messaging) Receive a time-sensitive token via a text message whenever you are challenged to provide a two-factor authentication token.
    

### Quick Start {/*quick-start*/}

Perform the following steps to set up multi-factor authentication for the first time:

1.  Log in to the {{ PORTAL_LINK }}.
2.  Load the Identity dashboard and then navigate to the [Security tab of the Profile page](https://manage.vdms.io/#/profile/security).
3.  Select whether to generate time-sensitive tokens through an authenticator application or text messages and then perform either of the following procedures:
    
    -   **Authenticator App (Recommended)**
        
        1.  Install a TOTP-compatible authenticator app (e.g., Google Authenticator, Duo, or Authy).
        2.  From within your authenticator app, create a new account and then scan the QR code.

    -   **Text Message**
        
        Provide your mobile device's phone number (E.164 format).
            
        **Syntax (United States):** `+1 <AREA CODE> <PHONE NUMBER>`
            
        **Syntax (Other Countries):** `+<COUNTRY CODE> <AREA CODE> <PHONE NUMBER>`
            
4.  Provide the time-sensitive token that was generated by either an authenticator app or text message.
    
<Callout type="info">

  Upon successfully completing MFA setup, all future login attempts will require that you provide a time-sensitive token.

</Callout>
    
### Authenticator Application {/*authenticator-application*/}

Look up a time-sensitive token within a Time-based One-time Password-compatible (TOTP) authenticator application (e.g., Google Authenticator, Duo, or Authy) whenever you are challenged to provide a two-factor authentication token.

**To set up multi-factor authentication through an authenticator application**

1.  Log in to the {{ PORTAL_LINK }}.
2.  Load the Identity dashboard and then navigate to the [Security tab of the Profile page](https://manage.vdms.io/#/profile/security).
3.  Click **Select** within the **Authenticator App** section.
4.  If you have not already installed a TOTP-compatible authenticator app (e.g., Google Authenticator, Duo, or Authy), then you should download and install it now.
5.  From within your authenticator app, create an {{ PRODUCT }} account within your authenticator application.

    <Callout type="tip">

      Automatically define the account name and secret key by scanning a QR code. Otherwise, you will need to manually enter this information.

    </Callout>

    <Callout type="info">

      Once your account is successfully created, your authenticator app will continuously generate a time-sensitive token.

    </Callout>

6.  In the **Verification code** option, type the time-sensitive token generated by your authenticator app and then click **Verify**.
    
    <Callout type="info">

      Upon successfully completing MFA setup, all future login attempts will require that you provide a time-sensitive token.

    </Callout>

<a id="to-use-a-different-authenticator-application-or-device" />

**To use a different authenticator application or device**

<Callout type="info">

  This procedure requires access to your authenticator account. If you no longer have access to your authenticator account, then you will need to reset your MFA configuration by contacting our [customer support]({{ SUPPORT_URL }}).

</Callout>

1.  Perform the **To disable authenticator application multi-factor authentication** procedure.
2.  Perform steps 2 - 6 from the **To set up multi-factor authentication through an authenticator application** procedure.

**To disable authenticator application multi-factor authentication**

<Callout type="info">

  This procedure requires access to your authenticator account. If you no longer have access to your authenticator account, then you will need to reset your MFA configuration by contacting our [customer support]({{ SUPPORT_URL }}).

</Callout>

1.  Log in to the {{ PORTAL_LINK }}.
2.  Load the Identity dashboard and then navigate to the [Security tab of the Profile page](https://manage.vdms.io/#/profile/security).
3.  From within the **Authenticator App** section, click the <Image inline src="/images/v7/icons/delete-2.png" alt="Delete" /> icon.
4.  When prompted for confirmation, type your password within the **Enter your current password to confirm delete** option and then click **Delete**.

### Google Authenticator {/*google-authenticator*/}

Google Authenticator is a software application that generates tokens through which you can verify your identity to Google services and third-party applications (e.g., {{ PORTAL }}). This software application can be installed on your desktop, Android cell phone, or iPhone/iPad devices. Download links are provided below.

-   [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2)
-   [iPhone and iPad](https://apps.apple.com/sg/app/google-authenticator/id388497605)

### Authenticator App Troubleshooting {/*authenticator-app-troubleshooting*/}

**Token Does Not Work**

If the token generated by your authenticator app does not work, check the following items:

-   **Is authenticator app MFA currently enabled?**
    
    From the **Security** tab of the [Identity dashboard](https://manage.vdms.io/), check whether the **Authenticator App** section has been enabled (<Image inline src="/images/v7/basics/mfa-enabled.png" alt="MFA Enabled" />). If you see an **Enable** button within this section, click it to enable authenticator app MFA.
    
-   **Are you using the current account?**
    
    An authenticator app contains all of your accounts. This may include accounts created for other sites/applications and outdated accounts. An account is created whenever you configure authenticator app MFA. If you have configured it more than once, then you may have older accounts within your authenticator app that generate codes that will not work.
    
    -   Verify that you are using the account that was created when your MFA configuration was last updated.
    -   If you are unsure which account is being used for MFA, create an account by [updating your authenticator app MFA configuration](#to-use-a-different-authenticator-application-or-device).

**Inaccessible Account**

If you no longer have access to your authenticator app, then you will need to reset your MFA configuration by contacting our [customer support]({{ SUPPORT_URL }}).

**Locked Account**

Your account is automatically locked for 30 minutes after six consecutive unsuccessful log in attempts. Both credentials and multi-factor authentication challenges count towards this limit. If you are locked out of your account, perform either of the following steps:

-   Reset your password.
-   Wait 30 minutes.

**Remember this Computer**

We currently do not support the ability to remember your computer. 


### SMS Messaging {/*sms-messaging*/}

Text messages containing time-sensitive tokens can be sent directly to your cell phone or messaging device via SMS. Setting up SMS messaging does not require the installation of a software application. Provide the phone number corresponding to your cell phone or messaging device. A text message containing a time-sensitive token will be sent to your phone.

The syntax for specifying phone numbers varies by location.

-   **Syntax (US-Based Phone Numbers):** `+1 <AREA CODE> <PHONE NUMBER>`
    
    **Sample Phone Number (Los Angeles, United States):** `+1 310 555 1212`
    
-   **Syntax (Phone Numbers Outside of the US):** `+<COUNTRY CODE> <AREA CODE> <PHONE NUMBER>`
    
    **Sample Phone Number (Rio de Janiero, Brazil):** `+55 21 5555 1212`

<Callout type="info">

  Standard text messaging rates may apply. We are not responsible for any fees that your cellular network carrier may charge for message transmission and delivery.

</Callout>

**To set up multi-factor authentication through text messages**

1.  Log in to the {{ PORTAL_LINK }}.
2.  Load the Identity dashboard and then navigate to the [Security tab of the Profile page](https://manage.vdms.io/#/profile/security).
3.  Click **Select** within the **Text Message** section.
4.  Type your mobile device's phone number and then click **Send Text Message**.
    
    [View syntax.](#sms-messaging)
    
5.  In the **Verification code** option, type the time-sensitive token that was sent to the above phone number via text message.
6.  In the **Enter your current password to confirm changes** option, type your password.
7.  Click **Verify**.
    
<Callout type="info">

  Upon successfully completing MFA setup, all future login attempts will require that you provide a time-sensitive token.

</Callout>

<a id="to-update-your-mobile-phone-number" />

**To update your mobile phone number**

<Callout type="info">

  This procedure requires access to your mobile phone. If you no longer have access to your mobile phone number, then you will need to reset your MFA configuration by contacting our [customer support]({{ SUPPORT_URL }}).

</Callout>

1.  Perform the **To disable text message multi-factor authentication** procedure.
2.  Perform steps 2 - 7 from the **To set up multi-factor authentication through text messages** procedure.

**To disable text message multi-factor authentication**

<Callout type="info">

  This procedure requires access to your mobile phone. If you no longer have access to your mobile phone number, then you will need to reset your MFA configuration by contacting our [customer support]({{ SUPPORT_URL }}).

</Callout>

1.  Log in to the {{ PORTAL_LINK }}.
2.  Load the Identity dashboard and then navigate to the [Security tab of the Profile page](https://manage.vdms.io/#/profile/security).
3.  From within the **Text Message** section, click the <Image inline src="/images/v7/icons/delete-2.png" alt="Delete" /> icon.
4.  When prompted for confirmation, type your password within the **Enter your current password to confirm delete** option and then click **Delete**.

### SMS Messaging Troubleshooting {/*sms-messaging-troubleshooting*/}

**Missing MFA Text Messages**

If you are not receiving multi-factor authentication text messages, check the following items:

-   Is text message MFA currently enabled?
    
    From the **Security** tab of the Identity dashboard, check whether the **Text Message** section has been enabled (<Image inline src="/images/v7/basics/mfa-enabled.png" alt="MFA Enabled" />). If you see an **Enable** button within this section, click it to enable text message MFA.
    
-   Is it configured to send text messages to the phone number associated with your mobile device?
    
    If you are unsure, you can [update your mobile phone number](#to-update-your-mobile-phone-number).
    
-   Are you receiving other text messages?
    
    Verify that your messaging device has connectivity and that your SMS inbox is not full.
    

**Locked Account**

Your account is automatically locked for 30 minutes after six consecutive unsuccessful log in attempts. Both credentials and multi-factor authentication challenges count towards this limit. If you are locked out of your account, perform either of the following steps:

-   Reset your password.
-   Wait 30 minutes.

**Remember this Computer**

We currently do not support the ability to remember your computer. 

**New Phone Number**

If you no longer have access to the phone number tied to multi-factor authentication, then you will need to contact your administrator to reset your MFA configuration.

### Switching Token Generation Method {/*switching-token-generation-method*/}

Switch token generation method by deleting your existing MFA configuration. After which, you may set up a new configuration.

**To switch your token generation method**

<Callout type="info">

  This procedure requires the ability to generate a MFA token. If you cannot generate a token, then you will need to reset your MFA configuration by contacting our [customer support]({{ SUPPORT_URL }}).

</Callout>

1.  Log in to the {{ PORTAL_LINK }}.
2.  Load the Identity dashboard and then navigate to the [Security tab of the Profile page](https://manage.vdms.io/#/profile/security).
3.  Click the <Image inline src="/images/v7/icons/delete-2.png" alt="Delete" /> icon.
4.  When prompted for confirmation, type your password within the **Enter your current password to confirm delete** option and then click **Delete**.
5.  Set up your new [authenticator app](#authenticator-application) or [text message](#sms-messaging) configuration.

## Github Integration {/*github-integration*/}

You may connect your Github account to the {{ PORTAL }} when creating a repository. This allows the {{ PORTAL }} to integrate our service with a new or existing Github repository. However, you may revoke the {{ PORTAL }}'s access to your Github account at any time. 

<Tip>

If the {{ PORTAL }} does not allow you to connect to a repository connected with your account, then you should try revoking access and then re-authorizing the {{ PORTAL }}'s access to your Github account by connecting to your Github account when creating a property.

</Tip>

**To revoke access to your Github account**

1.  From Github, navigate to the [Applications page](https://github.com/settings/applications) (Github | Settings | Applications).
2.  Click on the **Authorized OAuth Apps** tab. Github may require you to authenticate your identity through multi-factor authentication.
3.  Find the `Edgio Console` entry, click **...**, and then select **Revoke**.
4.  When prompted, confirm that you would like to revoke access.