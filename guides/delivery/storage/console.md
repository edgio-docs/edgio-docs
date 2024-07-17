---
title: Origin Storage Console
---
The Origin Storage Console (the Console) is the user interface to Origin Storage that lets you perform many of the same tasks you might do through APIs, such as uploading files, creating directories and subdirectories, and so on. Depending on the speed of your internet connection and file size, you can populate your selected storage locations around the world in minutes.

If you already have an Origin Storage user account, you can access and use the Console; it mirrors your content. You can still access your Origin Storage account via the API.

If you are new to Origin Storage, you have the option to use either (or both) the Console or the Origin Storage API to store data in Edgio’s many geographic locations around the world that best meet your business requirements.

<Callout type="info">The Console is intended for ad-hoc work only and should not be part of normal CDN work flows. Whenever possible, we recommend that customers leverage the Origin Storage API due to its feature-rich ingest workflow and its superior performance.</Callout>

## Console Workspace  {/*workspace*/}

![Console Workspace](/images/delivery/storage/storage-console.png)

Navigate to *Control* > *Manage* > *Origin Storage Console* to access these controls:

- **choose account / choose name**: Allow you to choose the account and user name
- **file and folder management**: Contains controls for file- and folder- management tasks such as uploading and deleting files and creating folders. (You can also [delete](#deleting-files) files while [viewing](#viewing) them in the files and folders list.)
- **list view controls**: Allows you to filter the content of the file and folder list.
- **breadcrumbs bar**: Shows your place in the content structure and allows you to navigate by clicking path segments. Each segment in the breadcrumbs bar is a link to that segment in the folder structure. Click a link to move to that location in your content structure.
- **Go back link**: Visible only when you are one or more levels from the root folder, the link takes you to the previous path segment listed in the breadcrumbs bar.
- **file and folder list**: Shows files / folders contained in the folder currently shown in the breadcrumbs bar.

## Viewing Content in the Files and Folders List  {/*viewing*/}

### Before You Start  {/*before-you-start*/}

Select an account and user name if you have not already done so. Use the drop-down menus at the top of the workspace:

![Account and User dropdown](/images/delivery/storage/account-dropdown.png)

### Filtering  {/*filtering*/}

You can filter the contents of the files and folders list by typing text in the Filter box in the top right corner of the page.

<Callout type="info">The filter applies only to the folder you are currently viewing as reflected in the breadcrumbs bar, and not the entire directory structure of your content as a whole.</Callout>

![Filter field](/images/delivery/storage/filter.png)

The Console matches files and folders as specifically as possible to your filter. The Console applies the filter to file and folder names.

As you type, the Console modifies the files and folders list to match your filter.

Filtering is case insensitive.

### Controlling List Content  {/*controlling-list-content*/}

Using the following list options icons in the top right corner of the page, you can view:

- files and folders
- folders only
- files only

![List controls](/images/delivery/storage/controls.png)

### Sorting  {/*sorting*/}

Using the sort drop-down and sort icon, you can arrange the contents of the files and folders list.

![Sort options](/images/delivery/storage/sort.png)

Choose a field to sort by in the *sort* dropdown:

- Name
- Date Uploaded
- File Size

For folders, *Date Uploaded* is the folder creation date.

Click the **sort** icon to toggle between ascending (default) or descending order.

### Paging  {/*paging*/}

Use the results per page links at the bottom of the page to control the number of items visible per page. The paging links allow you to page through the files and folders list by selecting the page number you want to view.

![Paging options](/images/delivery/storage/paging.png)

## Working with Files  {/*files*/}

### Before You Start  {/*before-you-start-files*/}

Select an account and user name if you have not already done so. Use the drop-down menus at the top of the workspace:

![Account and User dropdown](/images/delivery/storage/account-dropdown.png)

### Deleting Files  {/*deleting-files*/}

You can delete a single file or multiple files.

#### Deleting a Single File  {/*deleting-a-single-file*/}

1. Navigate to the folder that contains the file you want to delete.
2. Click the **delete** icon.

    ![Delete icon](/images/delivery/storage/delete-single.png)

3. Click **Delete** in the dialog that asks you to confirm the deletion.
4. The Console deletes the file.

<Callout type="info">You can also delete a file using the Origin Storage [deleteFile API](/delivery/storage/apis/api_calls/working_with_files/#delete-a-file).</Callout>

#### Deleting Multiple Files  {/*deleting-multiple-files*/}

1. Navigate to the folder that contains the files you want to delete.
2. Choose files you want to delete. You have two options:

    - Individual: Select individual files by clicking the checkboxes to the left of the file names.
    - All: To select all files currently visible in the *files and folders* list (based on the results per page setting), Click the checkbox to the left of the **Delete** button.

    <Callout type="info">The button to delete files is inactive until you select one or more files.</Callout>

3. Click the **Delete** button.
4. Click **Delete** in the dialog that asks you to confirm.

### Previewing Images  {/*previewing-images*/}

You can view image files that are in your Origin Storage account.

1. Navigate to the folder that contains the file.
2. Click the *preview* icon.

    ![Preview icon](/images/delivery/storage/preview.png)

3. The image appears in a dialog along with its [direct link](#getting-direct-links-to-files).

### Getting Direct Links to Files  {/*getting-direct-links-to-files*/}

The Console allows you to obtain a file’s URL that you can share by copying and pasting. The URL allows users to directly download the file from Origin Storage. For security purposes, the link is valid for 24 hours only.

1. Navigate to the folder that contains the file.
2. Click the *generate link* icon.

    ![Generate link icon](/images/delivery/storage/generate-link.png)

3. The direct link appears in a dialog box along with the link expiration date/time.

4. Click the copy to clipboard icon to get a link you can paste.

    ![Copy to clipboard icon](/images/delivery/storage/copy.png)

<Callout type="info">The Origin StorageAPI does not provide a means for obtaining a file's URL.</Callout>

### Downloading Files  {/*downloading-files*/}

1. Navigate to the folder that contains the file you want to download.
2. Click the *download* icon.

![Download icon](/images/delivery/storage/download.png)

Your browser downloads the file.

### Uploading Files  {/*uploading-files*/}

You can upload by drag and drop or by selecting individual files. The Console fully supports file names with UTF-8 characters.

<Callout type="info">- The Console allows you to upload a zero-byte file and imposes no file size limits.<br />- The Console allows you to upload no more than 50 files at once. At any given time, the Console uploads only two files concurrently. The rest of the files are in an upload queue.<br />- If you attempt to upload a file in a directory that already contains the file name, the Console overwrites the existing file.<br />- There is no limit to the number of files that you can store in a directory, but the Console displays a maximum of 10,000, so anything over that limit will not visible within the Console.</Callout>

#### Uploading by Drag and Drop  {/*uploading-by-drag-and-drop*/}

1. Navigate to the folder to which you want to upload files.
2. Select one or more files from your desktop and drag them over the Console. As you hover over the Console, you see the Drop files here prompt:

    ![Drag and drop icon](/images/delivery/storage/drag.png)

3. Release the files.
4. The Console uploads your files.

See also [Viewing Upload Progress](#viewing-upload-progress) and [Canceling Uploads](#canceling-uploads).

#### Uploading Using the Upload Button  {/*uploading-using-the-upload-button*/}

1. Navigate to the folder to which you want to upload files.
2. Click the upload button.

    ![Upload icon](/images/delivery/storage/upload.png)

3. The Open dialog appears. Use the dialog to browse to the location of your files and select the desired files.
4. Click the Open button in the dialog.
5. The Console uploads your files.

See also [Viewing Upload Progress](#viewing-upload-progress) and [Canceling Uploads](#canceling-uploads).

#### Viewing Upload Progress  {/*viewing-upload-progress*/}

During file upload, the Console displays the *upload progress* bar and the *Cancel All* icon:

![Upload progress](/images/delivery/storage/upload-progress.png)

<Callout type="info">Small files are generally uploaded very quickly and the progress bar goes away almost immediately.</Callout>

If you are uploading multiple files, you can click the *upload progress* bar to show upload details—the status of each file in the upload:

![Uploading multiple icon](/images/delivery/storage/upload-multiple.png)

For uploads with more than five files, the upload details includes the *Show all uploading* link:

![Show all icon](/images/delivery/storage/show-all.png)

Click the link to view details for the remaining files.

#### Identifying Newly Uploaded Files  {/*identifying-newly-uploaded-files*/}

After the Console uploads a file, the Console flags the file with the New icon:

![New icon](/images/delivery/storage/new.png)

The file is placed at the start of the files and folders list.

If you don't see your uploaded files in the files and folders list, the list might be set to show folders only. Click the show files and folders button or the show files only button (see [Controlling List Content](#controlling-list-content)).

#### Canceling Uploads  {/*canceling-uploads*/}

You can cancel a single file upload or cancel all files in a multi-file upload by clicking the *Cancel All* icon:

![Cancel all button](/images/delivery/storage/cancel.png)

You can also cancel individual files in a multi-file upload:

1. Click the *upload progress* bar to show progress details.

    ![Upload progress](/images/delivery/storage/upload-progress.png)

2. Click the **Cancel** icon for any individual uploads you want to stop.

## Working with Folders  {/*folders*/}

### Before You Start {/*before-you-start-folders*/}

Select an account and user name if you have not already done so. Use the drop-down menus at the top of the workspace:

![Account and User dropdown](/images/delivery/storage/account-dropdown.png)

### Creating Folders {/*creating-folders*/}

1. Navigate to the folder where you would like to create the new folder.
2. Click the **Add** button.
3. Enter a name in the *CREATE* dialog and click **Create**.

<Callout type="info">If you attempt to create a directory with a `/` slash in the name one of two things happens: <br /> - If the folder name before the slash exists, the Console creates a new directory in that folder.<br /> - If the folder name before the slash does not exist, the Console displays an error informing you that the parent path does not exist.<br />  <br /> For example, if you are in the root directory and a folder named test exists and from the root directory you click **Create Folder** and enter `test/sub-test`, the Console creates the folder `sub-test` under `/test`.</Callout>


<Callout type="info">You can also create directories using the Origin Storage API. Use any of the following: <br /> - [makeDir](/delivery/storage/apis/api_calls/working_with_directories_json#create-directory)<br /> - [makeDir2](/delivery/storage/apis/api_calls/working_with_directories_json/#leading-paths)<br /> - [post/directory](/delivery/storage/apis/api_calls/working_with_directories_http)</Callout>

### Uploading Folders {/*uploading-folders*/}

You can upload one or more folders by drag and drop.

- All files within the folder will be uploaded.
- You can upload multiple folders at the same time.
- You can upload a folder that has multiple levels of subfolders. All subfolders and their contents will be uploaded as long as the total number of files is less than a configured maximum number.

To upload folders:

1. Navigate to the folder to which you want to upload folder.
2. Select one or more folders from your desktop and drag them over the Console. As you hover over the Console, you see the Drop content here prompt:

    ![Drag and drop folder](/images/delivery/storage/drag-folder.png)

3. Release the folders.
4. The Console uploads the folders.

<Callout type="info">Visibility of uploaded folders and files depends on the view in which you did the upload: <br />- 'folders only' - Uploaded folder(s) are visible but not the files within. You need to change to one of the other filter views.<br />- 'files only' - Uploaded folder(s) are not visible. You need to change to one of the other filter views.<br />- 'files and folders' - All uploaded folder(s) and the content within are visible if navigated to.</Callout>

### Deleting Folders {/*deleting-folders*/}

<Callout type="info">- You can only delete empty folders. To delete files in a folder, see Deleting Files.<br />- The Console does not support recursive deletes (deleting a folder's subfolders, all their subfolders, and so on).<br />- You can also delete a folder using the Origin Storage deleteDir API.</Callout>

## Managing Accounts and Users  {/*manage-accounts-and-users*/}

See [Origin Storage Accounts and Users](/delivery/control/manage/origin_storage_users).

## Logging Out  {/*logging-out*/}

Click the *Welcome* link at the top right part of the Console and select **Logout**:

![Log out](/images/delivery/storage/logout.png)
