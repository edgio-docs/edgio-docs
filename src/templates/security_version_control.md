## Version Control {/*version-control*/}

Version control allows you to:
-   View a previous version of a configuration. 
-   Reactivate a previous version of a configuration. 
-   Compare a previous version of a configuration to the current version.

An advantage of using version control is that it allows you to quickly roll back to a previously vetted configuration. For example, if you notice that a new configuration has resulted in more false positives, then you can roll back to the previous version before analyzing the data. 

**To view, compare, and reactivate a previous configuration**

1.  Load the desired security configuration (e.g., access rule, rate rule, or custom rule).
2.  Click **Versions**.

    ![Versions button](/images/v7/security/version-control-versions.png?width=750)

3.  Click on the desired version to view it. 

    ![Version selection](/images/v7/security/version-control-version-selection.png?width=750)

4.  Optional. Compare the version selected in the previous step to the current version by clicking **Diff**. Differences between those two versions are highlighted in green (new or updated lines) and red (modified or deleted lines).
5.  Optional. Reactivate the version selected in step 3 by clicking **Reactivate**. Click **Reactivate this version** to confirm that it will be reactivated. 