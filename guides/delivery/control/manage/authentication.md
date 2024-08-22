---
title: Authentication
---
You can configure Lightweight Directory Access Protocol (LDAP) and Security Assertion Markup Language (SAML) authentication types. This capability is intended for customers who use an SSO provider such as Okta or Ping Identity and allows customers to integrate authentication into their overall SSO capability.

By default, each company has Basic authentication enabled. Basic authentication is the standard type where users log into Control using their user, password, and 2FA authentication token. You cannot delete, edit, or deactivate the Basic authentication configuration.

The information in this section assumes you understand LDAP and SAML.

<Callout type="info">-   Only users with the Company Admin role can create configurations. <br />-   You can create at most one configuration of each type (LDAP and SAML). <br />-   The authentication capability is available only for companies that have the Authentication product.</Callout>

## Creating a Configuration  {/*creating-a-configuration*/}

### Creating an LDAP Configuration  {/*creating-an-ldap-configuration*/}

1.  On the *Authentication List Page* click the **New LDA**P button.

    The *New LDAP* page is displayed.

2.  Enter information in the fields (see [Fields on the New LDAP Page](#fields-on-the-new-ldap-page)).

3.  Click the **Save** button to persist the configuration.

#### Fields on the New LDAP Page  {/*fields-on-the-new-ldap-page*/}

| Field | Description |
| --- | --- |
| Active | Indicates whether the configuration is active. |
| Base DN | Base Distinguished Name. Uniquely identifies the entry and its position in the directory information tree (DIT) hierarchy. Consists of the Organization Unit (ou) and Domain Components (dc). |
| Server URL | Address of the LDAP server that responds to client requests for information such as login credentials. |

### Creating a SAML Configuration  {/*creating-a-saml-configuration*/}

Edgio's SAML configurations are accessed over SSL to implement a secure connection.

1.  On the *Authentication List Page* click the **New SAML** button.

    The *New SAML* page is displayed.

2.  Enter information in the fields (see [Fields on the New SAML Page](#fields-on-the-new-saml-page)).

3.  Click the **Save** button to persist the configuration.

#### Fields on the New SAML Page  {/*fields-on-the-new-saml-page*/}

| Field | Description |
| --- | --- |
| Active | Indicates whether the configuration is active. |
| Certificate (base64) | Certificate text, including the *-----BEGIN CERTIFICATE-----* and *-----END CERTIFICATE-----* markers. |
| Certificate fingerprint | The DER-encoded certificate's hash. |
| Fingerprint algorithm | Hashing algorithm that generated the fingerprint. |
| Idp Entity id | Globally unique name for the SAML entity, either an Identity Provider (IdP) or a Service Provider (SP). |
| Idp SSO url | Web address of the SAML IdP that handles sign-in requests. |
| User identifier attribute name | Defines the attribute to be sent by your SSO system to Control and used by Control to log in.<br />Attributes vary depending on the SSO system, so this field allows you to define your own specific attribute name.<br /><br />As an example, assume the user identifier attribute name is 'EmailAddress'. On login, the SSO system sends an assertion request to Control with 'EmailAddress' = 'user@mail.com'. Control will look for the 'EmailAddress' attribute in the assertion and try to authenticate the user with user@mail.com, which is the same as logging in to Control with login = user@mail.com on Control's login screen.<br />Defaults to 'UserID'. |
| Private key | The unique string specific to you that you created when you requested the certificate with a Certificate Signing Request (CSR). |
| SSO URL (Assertion URL) | Required by some SSO Identity Providers when a configuration is being created, before the LDP SSO url has been issued. Users can copy and paste as needed into other fields such as *ldp SSO Id*. |
| SP Entity ID | Required by some SSO Identity Providers when a configuration is being created, but before the SP Entity ID has been issued. Users can copy and paste as needed into other fields such as *ldp Entity Id*. |


## Editing a Configuration  {/*editing-a-configuration*/}

1.  On the Authentication List Page click the configuration's edit (pencil) icon.

    The *Edit configuration page* specific to the authentication type (SAML or LDAP) is displayed.

2.  Modify the fields on the page (see [Fields on the New SAML Page](#fields-on-the-new-saml-page) and [Fields on the New LDAP Page](#fields-on-the-new-ldap-page)).

3.  Click the **Save** button to persist the changes.

<Callout type="info">You can only edit LDAP and SAML configurations.</Callout>

## Testing a Configuration  {/*testing-a-configuration*/}

1.  Click the configuration's edit (pencil) icon on the *Authentication List Page*.

    The *Edit configuration* page specific to the authentication type (SAML or LDAP) is displayed.

2.  Click the **Test Configuration** button at the bottom of the page.

    The TEST CONFIGURATION dialog is displayed.

3.  Enter information in the dialog. The information requested depends on the authentication type.

| Authentication Type | Fields|
|---|---|
|SAML|Username - a valid Control user name|
|LDAP|Control user email and password. |

4. Click the **Test Configuration** button in the dialog. Test results depend on the authentication type.

| Authentication Type | Results|
|---|---|
|SAML|Results open in a new browser tab.|
|LDAP|Results are displayed as a JSON object at the bottom of the dialog. |

**Sample success LDAP Response**
```json
{
  "telnetSuccessful": true,
  "authSuccessful": true,
  "telnetTime": 175,
  "exceptionMessage": null
}
```
<Callout type="info">You can only edit LDAP and SAML configurations.</Callout>

4. Click the **Test Configuration** button in the dialog. Test results depend on the authentication type.

## Activating a Configuration  {/*activating-a-configuration*/}

1.  Hover the mouse pointer over a row on the *Authentication List Page*.

2.  Click the **Activate** button.

    The Active status changes to *yes* and the *Activate* button label changes to *Deactivate*.

<Callout type="info">You can also active the configuration using the following steps: <br />1.  Click the **edit** (pencil) icon for the configuration on the *Authentication List Page*. <br />2.  On the *Edit configuration* page, put a checkmark in the *Active* checkbox. <br />3.  Click the **Save** button.</Callout>


## Deactivating a Configuration  {/*deactivating-a-configuration*/}

1.  Hover the mouse pointer over a row on the *Authentication List Page*.

2.  Click the **Deactivate** button.

    The Active status changes to *no* and the *Deactivate* button label changes to *Activate*.

<Callout type="info">You cannot deactivate the configuration if it is the only active configuration. You can also deactivate the configuration with these steps: <br />1.  Click the **edit** (pencil) icon for the configuration on the *Authentication List Page*. <br />2.  On the *Edit configuration* page, remove the checkmark in the *Active* checkbox. <br />3.  Click the **Save** button.</Callout>

## Deleting a Configuration  {/*deleting-a-configuration*/}

1.  Click the configuration's remove (trash can) icon on the Authentication List Page.

2.  Click the **Delete** button in the dialog that prompts you to remove the entry.

    Control deletes the configuration.

<Callout type="info">-   You cannot delete a configuration if it is the only active configuration. <br />-   You cannot undo a deletion.</Callout>
