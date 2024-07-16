---
title: Renew SSL Certificate
---
Typically you renew a certificate when it has expired or will expire soon.

<Callout type="info">To renew a certificate, do not create a new configuration. You must work with the existing published configuration with the expired or soon-to-expire certificate.</Callout>

## Prerequisites  {/*prerequisites*/}

Before you renew an certificate:

*   You must have a replacement certificate and private key file.

*   The certificate files must be in a separate PEM or CRT file AND private key file or “.KEY” format file. If your file is in another combined format, please convert it to the separate certificate and private key files before uploading. If you experience any issues, contact support or your Account representative.

Also, suggests that you use private browsing mode in your browser.

## Procedure {/*procedure*/}

1.  Log into [Control](https://control-new.edg.io/acontrol/#/login).

2.  In the navigation pane, click **Configure** > **SSL Certificates**.

    <Callout type="info">If you don't see the SSL Certificates option, contact your Account Manager to add the capability to your account.</Callout>

    The *SSL Certificates for* page is displayed.

3.  Choose an account name in the account above the list of certificates.

    <Callout type="info">The names in the are those that have the SSL product enabled AND those that your user is configured to manage. <br /><br /> If you don't see all of your SSL Certificates listed, contact your or support to investigate and resolve the issue.</Callout>

4.  Locate the desired certificate in the list; then click the **Update/Rollback** icon.

    ![Update Rollback Icon](/images/delivery/control/update-rollback.png)

    The Edit configuration for page is displayed.

5.  Upload the new certificate.

    - Click anywhere in the *Customer certificate* field.

    - In the subsequent window, navigate to and select the customer certificate on your local machine.

    - Click the window's **Open** button.

    The selected certificate is added to the *Customer certificate* field, and intermediate certificates are displayed below it.

    - Review your intermediate certificates. New certificates may render the previous intermediate certificates invalid, so consult with your Certificate Authority to determine if new intermediate certificates are needed.

6.  Upload the new certificate private key file.

    - Click anywhere in the *Certificate private key* file field.

    - Navigate to and upload the private key as you did with the new certificate.

    The selected private key is added to the *Certificate private key* file field.

7.  Click the **Update/Rollback** button to save your changes.

    The *SSL Certificates for* page is displayed, and a popup informs you that although you have updated the configuration, you still need to push it to the edge.

8.  Click the **Publish** (up arrow) icon to publish the configuration to the edge.

9.  Click **OK** in the dialog asking you to confirm.

    The system starts a workflow that publishes the certificate to the edge. It takes approximately 20-30 minutes to publish the configuration to the edge.
