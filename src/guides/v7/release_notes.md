---
title: {{ PRODUCT }} Release Notes
---

<Callout type="info">

This page contains release notes related to the {{ PORTAL_LINK }}.

See [NPM Packages Changelog](/guides/changelog) for release notes related to the  {{ PRODUCT }} CLI packages and connectors.

</Callout>

#### {{ PORTAL }} - May 25, 2023

##### Rules UI Updates

- Add Condition for Response - Status Code
- Add Optimize Images feature
- Add support for matching on request path extension and directory conditions
- EdgeJS deploy should update hostnames
- AI. Parsing error on rule: ‘deny access for all countries under sanctions’

##### General Updates

- Add 3rd-party disclaimer to AI prompts
- Allow user to diff any pair of environment versions
- Support for bulk import multiple environment variables
- "You are not authorized to perform this operation" occurs after creating new team/property/deployment
- 500 Internal Server Error while creating new property under team
- Deploying EdgeJS after WebUI changes the nature of the previous build
- Core Web Vitals - Google Tag Manager guide renders "Something went wrong" message
- "Can`t be blank" error while promoting Web UI deployment to any env
- Imported variables persist on Import modal
- "Keep values secret" checkbox is invisible if checked
- Variables without values are presented as secret
- Validation error message for variables should contain related key/value

#### {{ PORTAL }} - April 27, 2023

##### Security Updates 
- Console Security UI: Add reCAPTCHA

##### General Updates
- Allow team admin to set up a list of allowed IPs for console access.

#### {{ PORTAL }} - April 20, 2023

##### Rules UI Updates

- Added HTTP variables to autocomplete along with inline descriptions
- Added device classification HTTP variables
- Fixed the "always applied" label appearing cropped in Safari
- Added feature summary tooltips
- Added description to the "Custom Log Field" feature
- Fixed layout with comments containing lists
- Removed 'equals'/'not equals' operators for the random number condition
- Fixed regexp input field growing with user input in the "Rewrite URL" feature

##### Security Updates

- Applied loading skeletons to filter sections in the Security dashboard
- Updated Managed Rules Latest Ruleset
- Added Alert and Block tabs into Bot Manager Actions
- Applied validation to bot manager quantity
- Made "Save" buttons in Security config drawers sticky
- Added Spoof Bot default action type
- Added warning icon to Managed Rules tabs & fixed bot rules tab errors

##### General Updates

- Fixed role changes visually not being saved when navigating from the Members page
- Temporarily removed "Api Clients" setting card
- Fixed cache purges not appearing on cache charts
- Disabled the "Promote to" dropdown button when there are no other environments
- Traffic metrics improvements
- Fixed EdgeJS => WebUI transition
