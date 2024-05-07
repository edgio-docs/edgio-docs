---
title: My Account
---

## My Account  {/*my-account*/}

The *My Account* section of Control lets you update your contact information and password. The section also lets you manage any automatically-recurring report emails and alerts you’ve created.

To view the *Edit My Account* page, select **My Account** in the *Welcome* dropdown.

### Editing Your Profile  {/*editing-your-profile*/}

Your profile information is in the **Profile** tab, which is visible by default when you access the *Edit My Account* page.

#### Contact Information  {/*contact-information*/}

<Callout type="info">Changing your email address does not change your user name. Control user names are permanent.</Callout>

#### Locale & Timezone  {/*locale-and-timezone*/}

To change the language displayed by the Control user interface, select a language from the *Locale* dropdown menu.

To select the default timezone for report data, choose a GMT timezone from the *Time Zone* dropdown menu.

#### Default Account  {/*default-account*/}

If you have more than one Account (also known as a "shortname"), you can use the *Default Shortname* dropdown to choose the company and account you want to be selected when you log in.

<Callout type="info">You can change the selected at any time in the / in the top ribbon.</Callout>

#### Default Landing Page  {/*default-landing-page*/}

When you first log in to Control, the [Dashboard](/delivery/control/support_tools/dashboard) is automatically displayed, but you can configure another page to be the default. Click the **Landing Page** and select the desired page.

<Callout type="info">The last five passwords may not be entered as a new password. Additional details on acceptable password length and content are displayed in Control when a new password is entered.</Callout>

##### Saving  {/*saving*/}

When you’ve finished with your changes, click the **Save** button.

#### Changing your Password  {/*changing-your-password*/}

To change your password:

1.  Click **Change Password**.

2.  Enter and confirm the new password in the fields provided.

3.  Click the **Save** button.

<Callout type="info">The last five passwords may not be entered as a new password. Additional details on acceptable password length and content are displayed in Control when a new password is entered.</Callout>

#### API Shared Key  {/*api-shared-key*/}

You can also view your API key or create a new one. The API key is needed if you want to access any of the APIs associated with Control.

To view your API key, click **Show my Shared Key**. To create a new API key, click **Generate a new Shared Key**.

### Managing Recurring Report Emails  {/*managing-recurring-report-emails*/}

The *Recurring Emails* tab allows you to view, edit, and delete any recurring emails that you configured in the [Traffic Report](/delivery/control/reports/traffic/traffic) and the [Status Codes Report](/delivery/control/reports/content/status_codes).

The tab contains a list of configurations, each with the fields in the following table.

| Field | Description |
| --- | --- |
| Report | Report in which the email was configured. |
| Account | Associated . |
| Subject | Email subject as seen by recipients. |
| Recurrence | How often the email is transmitted. |
| Last Sent | Most recent date and time that the report was transmitted. |

On the right side of each row are icons for editing and deleting the configuration.

The tab contains pagination controls you can use to browse current configurations.

#### Editing a Recurring Report Email {/*editing-a-recurring-report-email*/}

To edit a recurring report email:

1.  Click the **edit** icon.

    The RECURRING EMAIL dialog is displayed. With a few differences, the selections in dialog's fields are the same whether the email was generated from the Traffic Report or the Status Codes Report.

2.  Edit the fields using information in the [Fields in the RECURRING EMAIL Dialog](/delivery/control/reports/general_information/general_information#fields-in-the-recurring-email-dialog)

3.  Click the **Save** button.


#### Deleting a Recurring Report Email {/*deleting-a-recurring-report-email*/}

To delete a recurring report email, click the **delete** icon.

### Managing Alerts  {/*managing-alerts*/}

The **Alerts** tab allows you to view, edit, and delete alerts that you created in the [Traffic Report](/delivery/control/reports/traffic/traffic) and the [Status Codes Report](/delivery/control/reports/content/status_codes).

The tab contains a list of configurations, each with the fields in the following table.

| Field | Description |
| --- | --- |
| Account | Associated Edgio account. |
| Page | Report in which the email was configured. |
| Frequency | How often the email is sent. |
| Condition | The circumstances to trigger the email. |
| Last Sent | Most recent date and time that the report was transmitted. |

Each entry has an **edit** and **delete** icon on the right side of its row.

#### Editing an Alert {/*editing-an-alert*/}

1.  Click the **edit** icon for the alert you wish to modify.

    The REPORT ALERT dialog is displayed.

2.  Make changes in the dialog. Not all fields are editable. See [Editable Fields in the REPORT ALERT Dialog](/delivery/control/reports/general_information/general_information/#fields-in-the-report-alert-dialog) for details.
3.  Click the **Save** button.

##### Editable Fields in the REPORT ALERT Dialog {/*editable-fields-in-the-report-alert-dialog*/}

| Field | Description / Instructions |
| --- | --- |
| Recipient |   Primary notification recipient. <br />Enter a single primary recipient email.  |
| CC  | Stands for "carbon copy." Additional email recipients.<br />Enter one email or multiple emails separated by commas. |
| Subject |  Email subject. <br />Enter the text for the email's subject line.   |
| Message |  	Email body text. <br />Enter the text for the email body.   |
| Show UI notification | If this field is checked, then when the threshold has been crossed, Control displays an alert popup in the user interface in addition to sending an email. |

#### Deleting an Alert {/*deleting-an-alert*/}

1.  Click the **delete** icon for the alert you wish to delete.
2.  Confirm that you want to delete the alert in the dialog that displays.
