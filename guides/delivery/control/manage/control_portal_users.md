---
title: Control Portal Users
---
The *Users* page lets you add new users and manage existing users, providing extensive control over user permissions for portal features and report data.

## Finding & Selecting Users  {/**/}

You can find specific users in three ways:

-   Using the **Search for user** search field
-   Filter users by last name by selecting one of the alphabet letters above the user list (**A**, **B**, **C**, and so on)
-   Paging through the list of users with the numbered tabs, **Previous**, or **Next** buttons below the list

You can change the number of users shown in the list, click the corresponding number next to *Showing:* below the list.

To select a user, click the corresponding row in the user list.

## Adding New Users  {/**/}

To add a new user, click the **+ new** button. The *Create User* page appears.

Fill out the fields on the page:

-   Username
-   Email Address
-   First Name
-   Last Name
-   Role
-   Language
-   New Password & Confirm Password

To give the new user *Company Admin* privileges, use the *Role* dropdown menu. The default role is User.

Additional options:

-   The user by default is not enabled. Use the **User enabled** checkbox to enable the use immediately.
-   Use the *Two-factor authentication* checkbox to force the user to log into . See [2FA Security](#2fa-security) for additional information.
-   An activation email is normally sent to new users. You can disable this using the **Do not send activation email** checkbox.
-   To automatically generate a secure password for the new user, click the **Generate password** button.

When you are finished, click **Save**, and you will be returned to the *Users* page.

## Migrating Users to Another Company  {/*migrating-users-to-another-company*/}

To migrate a user to another company:

1.  Click the migrate icon on the right side of the user's row.

    The *MIGRATE USER* dialog is displayed.

2.  Select the target company in the .

3.  Click the **Migrate** Button.

    The user is migrated to the selected company and a success message is displayed.

<Callout type="info">- Only users with the *user* or *company admin* role have the **Migrate** button available.<br /> - Only users with migration permissions can migrate a user.</Callout>

## Editing User Profiles  {/*editing-user-profiles*/}

To edit an existing user profile, including changing the user's password, click in the user's row or click the edit button at the right side of the user's row. The *User Details* tab is displayed.

<Callout type="info">Control does not enforce password expiration due to other security measures such as 2FA and transport over HTTPS; however, customers can change user passwords to align with their security practices.</Callout>

In this view, an additional control, the *User Enabled* checkbox, becomes visible. If you need to revoke the user’s access to the portal, disable (uncheck) the checkbox.

When you are finished, click **Save**, and you will be returned to the *Users* page.

## Editing User Permissions  {/*editing-user-permissions*/}

The *Permissions* tab allows you to manage user access to products, capabilities, and reports.

A list of the major groupings is displayed on the left side of the tab.

-   *CONFIGURE*, *MANAGE*, and *REPORTS* refer to the corresponding menus in the navigation pane.
-   *OTHER* contains permissions for more granular features.

    Expandable items have a triangle to the left of the label, and items with a circle to the left can be individually configured.

-   A green checkmark in the circle indicates the item has been configured for all shortnames in the company<sup>1</sup> you selected after logging into Control.

-   A dot within the circle indicates that the item has been configured for one or more or all shortnames but not the entire company.

-   An empty circle indicates that the item has no configurations.

<sup>1</sup>The selected company is shown at the top right of the page.

When you select an individual item, the "path" to the item is displayed on the right side of the screen along with a grid of shortnames.

To enable configurable items:

1.  Click an expandable item to drill down to configurable items.

2.  Click a configurable item to reveal a list of shortnames on the right.

3.  Configure the item:

    -   Click the All for toggle to enable the item for the entire company.

    -   Click the Select All link to enable the item for all shortnames. From there, you can deselect individual shortnames if desired.

    -   Click individual shortnames to enable the item for only the shortnames selected.

<Callout type="info">-   Changes are saved immediately upon selection. <br />-   If the All for toggle is not present, it means does not support per-company permissions. <br /> -   If later on a new shortname is added to the company, the shortname automatically appears in the shortname grids. <br />
-   By default, all users in a company have permissions to view the company's reports.</Callout>

## Cloning User Permissions  {/*cloning-user-permissions*/}

You can clone permissions from a "source user" to a "target user."

1.  Locate the desired user (see [Finding and Selecting Users](#finding-and-selecting-users)).

2.  Click the **clone permissions** icon.

    The *CLONE USER PERMISSIONS* cialog is displayed.

3.  Select the source user in the ; then click the Clone button.

    A success message is displayed.

<Callout type="info">-   Only company admin users can clone permissions.<br />-   Both source and target users must belong to the same company and must both have the USER role.<br />-   The target user's permissions are replaced with the new permissions.</Callout>

## 2FA Security  {/*2fa-security*/}

As part of Edgio's commitment to maintain the highest level of security for our customers, we use Two-Factor Authentication (2FA) with Control.

This capability is for all Control users with either:

`the *Company Admin* role, or
`*Manage* permissions for *Configure*

When 2FA is enabled, the 2FA status of your users is displayed at the top of the *User Details* tab.

Users with the *Company Admin* role can enable or disable 2FA for individual users by setting the Two-factor Authentication checkbox.

Control users who are enabled for 2FA must enter a new 2FA security code each time they log in to Control. Users can quickly generate 2FA security codes using a mobile app (such as the Google Authenticator App). Once an authenticator app is set up, a network connection is not required to generate new tokens.

You can find free 2FA apps online.

### User Experience  {/*user-experience*/}

When 2FA is enabled for Control users, they will be presented with the 2FA Get Started screen the next time they attempt to log in. The screen includes an explanation of 2FA, and a list of the steps users must follow to obtain a security code.

The steps are:

1. **Download App**. On a mobile device, download a supported authenticator app.

2. **Add Account**. In the authenticator app, follow the app-specific instructions to add the Control. For example, in the Google Authenticator App, the Scan a barcode option can be used to automatically add the portal by capturing the QR code in the 2FA *Get Started* screen or manually enter the Secret Key (under the QR code) using the *Enter provided key* option.

<Callout type="info">When setting up 2FA, Edgio recommends users record the Secret Key displayed by the 2FA Get Started screen. The code allows the configuration of multiple devices and browser authenticator apps so that if a user's smartphone is unavailable, they can use another paired device or app. The *Secret Key* should be kept safe, just like any other password.</Callout>

3. **Obtain Security Code**. In the authenticator app, follow the app-specific instructions to get a new 2FA security code for Control. Once set up, the authenticator application will display a six-digit security code, which changes every 30 seconds.

4. **Enter Security Code**. In the Control2FA Get Started screen (or the 2FA Token screen on subsequent use), enter the security code in the Security Code field and click **Verify**. If valid, the *Login* screen is displayed.

5. **Login**. In the *Login* screen, enter credentials and click **Login**.

### Resetting Device Pairings  {/*resetting-device-pairings*/}

After a reset, the Control user must repeat steps 2 and 3 above to create a new pairing. This feature may be useful when users need immediate access, but their paired mobile device is not available.

<Callout type="info">This will reset the pairing for all currently paired devices for the user</Callout>.

*Company Admin* users cannot use Control to reset device pairings for themselves or other *Company Admin* users. Resets for *Company Admin* users must be requested directly from Edgio Customer Service.

Other Control users should contact their Company Admin to request a reset.

### Frequently-Asked Questions  {/*frequently-asked-questions*/}

**What is the difference between a Control user and a Storage user?**<br />
A Control user has access to all the portal features associated with the account. A Control user must create an Storage user to access Origin Storage. Refer to the [Origin Storage Users](/delivery/control/manage/origin_storage_users) section.

**What happens if a Control user upgrades their phone to a new model?**<br />A reset is required. The user must download the authenticator app to the new smartphone and contact a *Company Admin*, who can then follow the steps in the [Resetting Devices](#resetting-device-pairings) section. The user must then follow steps 2 and 3 in the [User Experience](#user-experience) section to pair with the new device.

**What happens if a user forgets their phone or their battery dies?**<br />Unless the user has recorded the *Secret Key* and is prepared to pair with an additional device or app (see next question), a reset is required. Only the currently-paired device and authenticator app can generate a code without performing a reset. At this time, we do not have an alternate means of providing codes. Users must have the original device and authenticator app or reset and re-activate with a new device.

**Can a user ‘pair’ Control with multiple devices and authenticator apps?**<br />Yes, if they record and then later use the Secret Key provided during the pairing process. In the 2FA Get Started screen at the beginning of the pairing process, the Secret Key in a long alphanumeric string under the QR code. If recorded, the Secret Key can be used to pair with authenticator apps on multiple devices. Otherwise, it is not possible to pair with additional devices. Note: the Secret Key is sensitive data and should be guarded like a password.

**What do users do if they don't have a "smart" mobile device?**<br />Since the Google Authenticator algorithms are commonly known, several developers have also published authenticators for browser extensions and apps. These should work with Control as long as they use the same time-based OTP algorithm used by Google Authenticator.

**If a user is granted Manage permissions for Configure, is 2FA also enabled?**<br />Yes. Granting a user any of the *Manage* permissions for Configure automatically enables 2FA for that user. This additional security is automatically applied because users with Manage permissions can add, change and delete product configurations, potentially affecting the delivery of production content.

**Does 2FA affect access to Control APIs?**<br />No, 2FA only affects user logins via the Control. At this time, API access is secured using a separate shared secret and is not affected by 2FA.

If you need to revoke a user’s access to the portal, select the user, and in the *User Details* tab, uncheck the **User Enabled** checkbox. You can re-enable access at any time.
