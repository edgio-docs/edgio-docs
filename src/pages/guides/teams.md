---
title: Teams
---

This guide shows you how to share your project with other collaborators using teams.

## Private Space {/*private-space*/}

When you first log into {{ PRODUCT_NAME }} console, you'll see your private space:

![private space](/images/deploying/private_space.png)

### Launching Your Site {/*launching-your-site*/}

Your site will be hosted on {{ PRODUCT_NAME }} through DNS, but you need to provide your site's name. Enter your site's URL in the *Get Started* dialog and click *LAUNCH MY SITE*.

## Creating a Team {/*creating-a-team*/}

After launching your site, your  private space will look similar to this example:

![new site](/images/teams/new-site.png)

When you run `{{ FULL_CLI_NAME }} deploy` your site will be created here. Sites in your private space can only be seen by you. To collaborate with other developers, create a team.

To create a team, click the diamond icon to the right of your name in the upper left of your window, then choose *Create a team* from the popup. 

![create team icon](/images/teams/create-team-icon.png?width=300px)

Enter a name in the *Add a Team* dialog and click *CREATE A TEAM*.

![create dialog](/images/teams/create_dialog.png)

The name you choose also determines the default URL from which your site will be accessible. To configure custom domains, see [Environments](./environments).

## Adding Your Website to the Team {/*adding-your-website-to-the-team*/}

After you create the team, the *Get Started* dialog is displayed (see [Launching Your Site](#launching-your-site).) Enter the URL and click *LAUNCH MY SITE*.

## Adding Team Members {/*adding-team-members*/}

You add members by supplying an email address and inviting them. 

Click your team name in the page header, then click the _Team Members_ tab:

![team members](/images/teams/members.png)

Click the *ADD MEMBERS* button. For each desired team member, enter an email, and click the + button. Click *INVITE TEAM MEMBERS* when done.

![team members](/images/teams/add-members-dlg.png)

Members receive an email indicating that they have been added to a team.

After you add the team member, select a role:

* Users in the _Admin_ role have full control over all team and site settings.

* Users in the _Member_ role can see all of the team's sites and settings, and deploy updates to existing sites via `{{ FULL_CLI_NAME }} deploy`, but cannot change site or team settings.

See [Creating an Environment](./environments#creating-an-environment) for more information.
