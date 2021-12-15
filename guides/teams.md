# Teams

This guide shows you how to share your project with other collaborators using teams.

## Private Space

When you first log into {{ PRODUCT_NAME }} console, you'll see your private space:

![private space](/images/deploying/private_space.png)

When you run `{{ CLI_NAME }} deploy` your site will be created here. Sites in your private space can only be seen by you. To collaborate with other developers, create a team.

## Creating a Team

To create a team, use the *Create A Team* button located to the right of your name in the upper left of your window.

The name you choose also determines the default URL from which your site will be accessible. To configure custom domains, see [Environments](../environments).

![create dialog](/images/teams/create_dialog.png)

## Adding Team Members

To add team members, click the _Team Members_ tab:

![team members](/images/teams/members.png)

## Roles

{{ PRODUCT_NAME }} provides two roles:

### Admin

Users in the _Admin_ role have full control over all team and site settings.

### Member

Users in the _Member_ role can see all of the team's sites and settings, and deploy updates to existing sites via `{{ CLI_NAME }} deploy`, but cannot change site or team settings.

When creating an environment, you can specify whether all members or only admins should be able to deploy to that environment.

![limit environment](/images/teams/environment-permissions.png?height=300)
