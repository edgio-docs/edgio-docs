---
title: Security
---

<Callout type="info">

  WAF Insights does not support automation through our REST API web service. If you are currently using WAF Insights, upgrade your WAF solution to take advantage of our REST API.

</Callout>

The following operations automate the administration of WAF.

| Type            | Description  |
|-----------------|---|
| Security Apps   | A Security Application Manager configuration:<ul><li>Identifies the set of traffic to which it applies by hostname, a URL path, or both.</li><li><p>Defines how threats will be detected via access rules, custom rules, managed rules, and rate rules.</p><Callout type="tip">If one or more condition group(s) have been defined within a rate rule, then traffic will only be rate limited when it also satisfies at least one of those condition groups.</Callout></li><li>Defines the production and/or audit enforcement action that will be applied to traffic identified as threats.</li></ul><br /><br />**Endpoints:** <ul><li>[Get All Security Application Manager Configuration (Scopes)](Get-All-Scopes.htmFINDME)</li><li>[Manage All Security Application Manager Configurations (Scopes)](Manage-All-Scopes.htmFINDME)</li></ul>  |
| Access Rules    |   |
| Rate Rules      |   |
| Bot Manager     |   |
| Custom Rules    |   |
| Managed Rules   |   |
| API Security    |   |

<!--









--------










The following operations automate the administration of WAF.

TypeDescriptionSecurity Application Manager


Access Rules

An access rule identifies valid requests and threats via whitelists, accesslists, and blacklists.

Endpoints:

- [Add Access Rule (ACL)](Add-ACL.htmFINDME)
- [Delete Access Rule (ACL)](Delete-ACL.htmFINDME)
- [Get All Access Rules (ACLs)](Get-All-ACLs.htmFINDME)
- [Get Access Rule (ACL)](Get-ACL.htmFINDME)
- [Update Access Rule (ACL)](Update-ACL.htmFINDME)

Bot Rule Sets

A bot rule set contains one or more bot rules. Each bot rule defines the set of requests that will require a client (e.g., a web browser) to solve a challenge before resolving the request.

Endpoints:

- [Add Bot Rule Set](Add-Bot-Rule-Set.htmFINDME)
- [Delete Bot Rule Set](Delete-Bot-Rule-Set.htmFINDME)
- [Get All Bot Rule Sets](Get-All-Bot-Rule-Sets.htmFINDME)
- [Get Bot Rule Set](Get-Bot-Rule-Set.htmFINDME)
- [Update Bot Rule Set](Update-Bot-Rule-Set.htmFINDME)

Rate Rules

A rate rule determines the maximum number of requests that will be allowed within a given time period.

Endpoints:

- [Add Rate Rule](Add-Rate-Limit.htmFINDME)
- [Delete Rate Rule](Delete-Rate-Limit.htmFINDME)
- [Get All Rate Rules](Get-All-Rate-Limits.htmFINDME)
- [Get Rate Rule](Get-Rate-Limit.htmFINDME)
- [Update Rate Rule](Update-Rate-Limit.htmFINDME)

Custom Rule Sets

A custom rule set defines custom threat assessment criterion.

Endpoints:

- [Add Custom Rule Set](Add-Custom-Rule-Set.htmFINDME)
- [Delete Custom Rule Set](Delete-Custom-Rule-Set.htmFINDME)
- [Get All Custom Rule Sets](Get-All-Custom-Rule-Sets.htmFINDME)
- [Get Custom Rule Set](Get-Custom-Rule-Set.htmFINDME)
- [Update Custom Rule Set](Update-Custom-Rule-Set.htmFINDME)

Managed Rules

A managed rule identifies a rule set configuration and describes a valid request.

Endpoints:

- [Add Managed Rule (Profile)](Add-Profile.htmFINDME)
- [Delete Managed Rule (Profile)](Delete-Profile.htmFINDME)
- [Get All Managed Rules (Profiles)](Get-All-Profiles.htmFINDME)
- [Get Available Policies](Get-Available-Policies.htmFINDME)
- [Get Available Rule Sets](Get-Available-Rule-Sets.htmFINDME)
- [Get Available Rules](Get-Available-Rules.htmFINDME)
- [Get Managed Rule (Profile)](Get-Profile.htmFINDME)
- [Update Managed Rule (Profile)](Update-Profile.htmFINDME)

Threats Event Log

The following operations retrieve WAF threat event log information:

 Endpoint Description [Get Available Event Log Fields](FINDME/WAF/Get-ELF-Definitions.htmFINDME)

  Provides definitions for event log fields.

  [Get Event Count](FINDME/WAF/Get-EL-Count.htmFINDME)

  Indicates the total number of threats detected over a given time period.

  [Get Event Log Entries](FINDME/WAF/Get-EL-Data.htmFINDME)

  Retrieves event log data over a given time period.

  [Get Event Log Entry](FINDME/WAF/Get-Event-Log-Entry.htmFINDME)

  Retrieves detailed information for a specific event log entry.

  [Get Top Event Log Entries](FINDME/WAF/Get-EL-Top.htmFINDME)

  Retrieves the top 10 events for the specified field.

 

Rates Event Log

The following operations retrieve event log information on rate limited requests:

 Endpoint Description [Get Available Event Log Fields ](FINDME/Rate-Limiting/Get-Available-Event-Log-Fields.htmFINDME)

  Retrieves a list of the available event log fields.

  [Get Event Log Entries ](FINDME/Rate-Limiting/Get-Event-Log-Entries.htmFINDME)

  Retrieves event log information for a set of rate limited requests.

  [Get Event Log Entry ](FINDME/Rate-Limiting/Get-Event-Log-Entry.htmFINDME)

  Retrieves event log information for a specific rate limited request.

  [Get Event Log Entry Count ](FINDME/Rate-Limiting/Get-Event-Log-Entry-Count.htmFINDME)

  Indicates the total number of rate limited requests that meet the specified criteria.

  [Get Top Event Log Entries ](FINDME/Rate-Limiting/Get-Top-Event-Log-Entries.htmFINDME)

  Indicates the type of records that are most frequently rate limited.

 



Responsive Threat Mitigation
---------------------------------------------------------------------

Although the above operations may be used to automate many different aspects of WAF configuration, the primary purpose of these operations is to provide the means to automatically update it to adapt to a changing threat landscape.

The basic workflow for automated threat mitigation is:

PhaseDescription1

Threat Detection

A noticeable increase in malicious threats to your site is detected.

This increase may be detected by using one or more of the following tools:

- Third-party Application: A third-party application (e.g., Nagios or Splunk) may be used to detect unusual network conditions that might be indicative of an application layer attack.
- Real-time Alerts: The Real-Time Alerts component of the Real-Time Statistics feature provides notifications when certain network conditions (e.g., bandwidth usage, total traffic, traffic by status code, etc.) are detected.

2

Threat Identification

Analyze traffic patterns to identify the source of the malicious attack.

Example:

For example, a sudden increase in traffic from a single IP address may be indicative of a malicious bot. If WAF is currently configured to audit traffic instead of blocking it, this may be detected by analyzing the response for the [Get Top Event Log Entries operation](FINDME/WAF/Get-EL-Top.htmFINDME).

A sample request that returns the top IP addresses that are generating traffic to your origin servers is shown below.

GET https://api.edgecast.com/v2/mcc/customers/0001/waf/eventlogs/top?field=Client%20IP&amp;start_time=2016-02-23&amp;end_time=2016-02-24 HTTP/1.13

Threat Mitigation

Update each relevant configuration so that it automatically detects and blocks the source of this application layer attack.

Validate that a change will not negatively impact production traffic by auditing traffic using the desired configuration. Configure how traffic will be audited by defining acl\_audit\_id, profile\_audit\_id, and rules\_audit\_id within the desired Security Application Manager configuration via the [Manage All Security Application Manager Configurations (Scopes) operation](Manage-All-Scopes.htmFINDME). These properties identify how traffic will be audited via an access control list configuration, request profile, and a custom rule set, respectively.

The recommended method for updating your configuration via a script is described below.

1. Identify each configuration that requires an update by performing the following steps:
    
    
    1. Identify the set of rules (e.g., access rules, managed rules, and custom rule sets) that require updating.
    2. Request the [Get All Security Application Manager Configurations (Scopes) operation](Get-All-Scopes.htmFINDME).
    3. Find all instances of the rules identified in step i:
        
        
        - Production
            
            acl_prod_id | profile_prod_id | rules_prod_id
        - Audit
            
            acl_audit_id | profile_audit_id | rules_audit_id
    
    Although malicious traffic may only be directed to one site, it may make sense to apply the same configuration (e.g., blacklisting an IP address) to all of your sites.
2. Retrieve those configurations via one of the following operations:
    
    
    - [Get Access Rule (ACL)](Get-ACL.htmFINDME)
    - [Get Custom Rule Set](Get-Custom-Rule-Set.htmFINDME)
    - [Get Managed Rule (Profile)](Get-Profile.htmFINDME)
3. Modify the response from the above operation to allow WAF to identify the source of this malicious traffic.
    
    For example, if an IP address is identified as the source of malicious traffic, then add that IP address to the blacklist:
    
    ...
    
    "ip" : {
    
    "accesslist" : \[\],
    
    "blacklist" : \["104.255.65.0\\/22", "169.54.233.10"\],
    
    "whitelist" : \[\]
    
    },
    
    ...
    
    
4. Update the desired configuration via one of the following operations:
    
    
    - [Update Access Rule (ACL)](Update-ACL.htmFINDME)
    - [Update Custom Rule Set](Update-Custom-Rule-Set.htmFINDME)
    - [Update Managed Rule (Profile)](Update-Profile.htmFINDME)

-->
