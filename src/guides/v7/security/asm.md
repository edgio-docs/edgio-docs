# Edgio Attack Surface Management

## Overview

Edgio Attack Surface Management allows you to monitor and secure your organization's attack surface. It provides a comprehensive inventory of your organization's internet-facing assets, technologies, and vulnerabilities. 

## Getting Started

To get started, navigate to the Collections Tab under Attack Surfaces and create a new collection. A collection is a group of seeds that Edgio will use to discover the entities that make up your organization's attack surface. The following seed types are supported:

### Domain

A domain seed is a domain name that you would like to monitor. Edgio will discover and scan all subdomains and IP addresses associated with the domain.

### IP Address Range

An IP address range seed is a range of IP addresses that you would like to monitor. Edgio will discover and scan all IP addresses associated with the range.

### Snyk Target

Edgio Attack Surface Management will create an exposure for each issue in the Synk project and optionally associate them one or more hostnames. Technologies are also imported.

### GitHub Repository

Edgio Attack Surface Management will create an exposure for each dependabot issue in the GitHub repository and optionally associate them one or more hostnames. Technologies are also imported.

## Scanning

Once you have created a collection, you can start a scan by clicking the "Scan Now" button. Edgio will discover and scan all the entities associated with the seeds in the collection. You can monitor the progress of the scan in the "Scans" list.

Here is the process that Edgio uses to discover and scan entities:

https://myedgio-my.sharepoint.com/:u:/g/personal/mbrocato_edg_io/Ea-4sHMiI6lOujGqsTsrElEBnZj_RdO0gijG7ETKbTC7sw?e=RUa88q

## Rules

As Edgio scans your organization's entities, it will discover findings. Rules determine the types of exposures that Edgio will create based on these findings. Edgio provides a default ruleset that you can use as a starting point. Navigate to the "Rules" tab under "Attack Surfaces" to view and edit the rules. Rules allow you to:

- create or not create exposures when specific conditions are met
- customize the severity, priority, and assignee when specific conditions are met.
- specify which ports are scanned for specific entities

Edgio will not create an exposure unless a finding matches at least one rule that is configured to create an exposure. The default ruleset creates exposures for all findings.

## Exposures

Exposures represent the vulnerabilities and misconfigurations that Edgio has discovered in your organization's attack surface. You can view and manage exposures in the "Exposures" tab under "Attack Surfaces". Exposures are automatically created and updated as Edgio scans your organization's entities. 

Each exposure has the following attributes:

- ID: An identifier comprised of the collection name and an incrementing number
- Summary: A brief description of the exposure
- Entity: The entity that the exposure is associated with (e.g., a hostname, IP address, or seed)
- Severity: The severity of the exposure between 0 and 10. Severity is a measure of the potential impact of the exposure.
- Priority: The priority of the exposure (Low, Medium, High, or Critical). Use priority to indicate the urgency with which the exposure should be addressed.
- Assignee: The user or team that is responsible for addressing the exposure.
- Status: The status of the exposure
  - New: The exposure has been created and has not been reviewed
  - Acknowledged: The exposure has been reviewed
  - Resolved: The exposure has been addressed
  - Mitigated: The exposure still exists, but the risk has been reduced
  - Muted: The exposure has been muted, optionally until a specific date
  - Ignored: The exposure has been ignored
- (optional) Technology Version: The specific version of the technology that is associated with the exposure
- (optional) CVE: The CVE that is associated with the exposure
- (optional) Comments: Users can add comments to exposures to provide additional context or information

All changes to exposures are tracked in the "Activity" tab. You can use the "Activity" tab to view the history of an exposure and to add comments. You can also view detailed information about how an exposure was detected in the "Detection History" tab.

## Technologies

Edgio Attack Surface Management will discover and track the technologies that are associated with your organization's entities. You can view the technologies in the "Technologies" tab under "Attack Surfaces". Technologies are automatically created and updated as Edgio scans your organization's entities.

## Entities

Entities are the internet-facing assets that make up your organization's attack surface. You can view and manage entities in the "Entities" tab under "Attack Surfaces".

## WAF Detection

Edgio Attack Surface Management will attempt to detect the WAF that is protecting your organization's entities. You can view the WAFs in the "WAFs" tab under "Attack Surfaces". Note that in order to detect the present of a WAF in front of each entity, Edgio will simulate the following attacks to determine if a WAF blocks them:

- SQL Injection
- Cross Site Scripting (XSS)
- Command Injection
- Local File Inclusion (LFI)
- XML External Entity Injection (XXE)

These attacks are generally benign and will not cause any harm to your organization's entities. However, if you are concerned about the impact of these attacks, you can disable WAF detection in the "Settings" tab.

## Limits

Each organization is limited to:

### Maximum number of collection

Based on your plan, there is a limit to the number of collections you can create.

### Maximum number of entities

Each time Edgio scans your attack surface, it discovers an unlimited number of entities, but will only scan up to the number of entities allowed by your plan.