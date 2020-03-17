# Teams

This guide shows you how to share your project with other collaborators using teams.

## Private Space

When you first log into the Moovweb XDN console, you'll see your private space:

![private space](../images/deploying/private_space.png)

When you run `xdn deploy` your site will be created here.  Sites in your private space can only be seen by you.  To collaborate with other developers, create a team.

## Creating a Team

To create a team, use the menu button located to the right of your name in the upper left of your window 

![create a team](../images/teams/create.png)

The name you choose also determines the default URL from which your site will accessible.  To configure custom domains, see [Environments](../environments).

![create dialog](../images/teams/create_dialog.png)

## Adding Team Members

To add team members, click the "Team Members" tab:

![team members](../images/teams/members.png)

## Roles

The Moovweb XDN provides two roles:

### Admin

Users in the "Admin" role have full control over all team and site settings

### Member

Users in the "Member" can see all of the team's sites and settings, and deploy updates to existing sites via `xdn deploy` but cannot change site or team settings.
