---
title: SSL Certificates
---
## Certificate List Page  {/*certificate-lists-page*/}

Navigate to Configure > SSL Certificates in the navigation pane. The SSL Certificates page is displayed, with a list of all certificates associated with the currently selected Account.

Action icons (view, edit, etc.) are displayed on the right side of each certificate's row.ediaVault works so you can implement hashes within your own applications

<Callout type="info">Depending on a certificate's state, additional or fewer action icons may be present. All icons and capabilities are explained later in these instructions.</Callout>

### Summary Information  {/*summary-information*/}
The SSL Certificates for list provides this information:

Total of each type on the right side of the gray header bar. Possible types:
-   new
-   pending publication
-   published
-   updated
-   expired
-   withdrawn

### Detail Information  {/*detail-information*/}

Each certificate in the list provides this information:

| Item | Description |
| --- | --- |
| Certificate name | Customer-assigned certificate name |
| Expiration Date | Certificate expiration date, extracted from the certificate's "Not After " element |
| Content type | Certificate purpose; possible values:<br />-   single server<br />- SAN <br /> -   wildcard |
| Fingerprints | List of domains covered in the certificate |
| PEM file | Certificate pem file name, if the certificate is PEM-encoded |
| Action controls | On right side of row; allow you to view, edit, publish, withdraw, and delete a certificate |
| Certificate state and version, date, user | To the right of the action controls on the right side of each row. Indicates the certificate version, date the certificate was created or updated, and user that created/updated the certificate |

## Working with Certificates  {/*working-with-certificates*/}

<Callout type="info">The actions allowable depend on the state of a certificate. <br /> -   If the certificate is not published, you can edit it, delete it, or publish it. <br /> -   If the certificate is published, you can withdraw it or edit it. <br /> -   If the certificate is withdrawn, you can edit it or delete it.</Callout>

### Creating a New Configuration  {/*creating-a-new-configuration*/}

<Callout type="info">Creating a new configuration includes uploading a certificate to Control; however, this process is insecure because the certificate could be hijacked through a malicious browser extension. advises that you open the page in an incognito window to create the certificate because incognito pages block all browser extensions.</Callout>

1.  Click the **+ new** button at the top of the screen.
2.  Fill out fields. All fields except Intermediate certificates are required. See [Certificate Field Reference](#certificate-field-reference) for details.
3.  Click the **Create** button at the bottom of the screen.
4.  The system verifies the contents of all uploaded files and displays errors if verification is unsuccessful.
5.  If all fields pass validation:
    -   the certificate is added to the list
    -   the certificate's status ('New'), and version (v1) is added to the controls on the right side of the certificate's row along with the creation date and your user
6.  Publish the certificate. See [Publishing a Certificate](#publishing-a-certificate).

### Viewing Certificate Details  {/*viewing-certificate-details*/}

You can view additional certificate details that are not displayed in the list of certificates.

1.  On the certificate list page, click the View (eye) icon for the certificate you want to examine.

2.  Details are displayed on a new page.

<Callout type="info">From this page, you can also take other options depending on the certificate status: <br /> -   If the certificate is not published, you can edit it, delete it, or publish it. <br /> -   If the certificate is published, you can withdraw it or edit it. <br /><br /> See the following sections for instructions: <br /> -   [Editing a Certificate](#editing-a-configuration)
-   [Publishing a Certificate](#publishing-a-certificate) <br /> -   [Deleting a Certificate](#deleting-a-certificate)</Callout>

### Editing a Configuration  {/*editing-a-configuration*/}

Use the edit icon to edit a configuration. Depending on the published state of the configuration, the edit icon has one of two tooltips:

-   **Update/Rollback**: Modify a published configuration.

-   **Update**: Modify a non-published configuration.

The two uses are essentially the same; both allow you to edit the configuration.

To edit a configuration:

1.  Click the edit (pencil) icon for the certificate you want to modify.
    Although the Customer certificate and Certificate private key file fields are empty, the configuration defaults to the files contained in the configuration before you opened it in edit mode.

2.  Make the desired modifications. See [Certificate Field Reference](#certificate-field-reference) for details.
3.  Click the **Update** button.
4.  If you changed any upload files, Control validates the files.
5.  If all fields pass validation:
    -   The changes are saved.
    -   The certificate is added to the list.
    -   The certificate's date and version are incremented.
    -   A popup message is displayed, reminding you that although you have updated the configuration, you still need to publish it.
6.  Publish the certificate. See [Publishing a Certificate](#publishing-a-certificate).

<Callout type="info">Each time you modify a configuration, its version is incremented.</Callout>

### Publishing a Certificate  {/*publishing-a-certificate*/}

When you publish a certificate, it gets pushed to the edge.

<Callout type="info">Control does not allow you to publish a certificate with domains covered by other published certificates. If you attempt to do so, you receive an error.</Callout>

1.  Click the **Publish** (up arrow) icon for the certificate you want to publish.
2.  Click **OK** in the dialog that prompts you to confirm.
3.  The system starts a workflow that publishes the certificate to the edge. It normally takes about 6 hours to propagate changes.

### Withdrawing a Certificate  {/*withdrawing-a-certificate*/}

When you withdraw a configuration it gets removed from the edge.

1.  Click the **Withdraw** (left-pointing arrow) icon for the certificate you want to delete.
2.  Click **OK** in the dialog that prompts you to confirm.
3.  The system starts a workflow that withdraws the certificate. It normally takes about 6 hours to propagate changes.

### Deleting a Certificate  {/*deleting-a-certificate*/}

If a certificate has been published, you must withdraw it before you delete it. See [Withdrawing a Certificate](#Withdraw).

1.  Click the **Delete** (rubbish bin) icon for the certificate you want to delete.
2.  In the resulting dialog, enter the certificate name as instructed, then click the **Delete** button.
3.  The system deletes the certificate and starts a workflow that removes the certificate from the edge.

#### Certificate Field Reference {/*certificate-field-reference*/}

| Field | Description |
| --- | --- |
| Certificate name | Name of the certificate to create; maximum 100 characters |
| Content Type | Type of content that the certificate encrypts; possible values:<br /><br />-   **Regular** - Will use General Pool VIPs. Always select this option.<br />-   **LargeObject**<br />-   **Blue**<br /> <br /> <Callout type="info">The value you select must match the collection of VIPs that can serve the shortname. For example, General Pool shortnames can only be served from General Pool VIPs. If you set a certificate on a shortname but you don’t select ‘Regular’, the certificate will not work.</Callout> |
| Customer certificate | Use this field to upload the certificate. Must be an X.509v3 ASCII Base64 PEM-encoded type and not password-protected. Customers that don't use that encoding must use Open SSL commands to convert their type to the required type.<br /> <br /> <Callout type="info">This file almost always contains intermediate certificates. If not, use the **Intermediate certificate** field to upload the desired files. </Callout>|
| Intermediate certificate | In most cases, this field should be left empty; intermediate certificate(s) will be derived from the provided certificate by default.<br /><br />Only upload the intermediate certificate(s) here if you know that the certificate encoding in the **Customer certificate** field does NOT already include intermediate certificate information. |
| Certificate private key file | Use this field to upload the private key. The key must be X.509v3 ASCII Base64 PEM-encoded and not password-protected. |
