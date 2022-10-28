---
title: Advanced Bot Management (BETA)
---

<Callout type="important">

  Advanced Bot Management, which is in BETA status, requires activation. {{ ACCOUNT_UPGRADE }}

</Callout>

{{ PRODUCT }}’s {{ PRODUCT_SECURITY_ADVANCED_BOT }} introduces a new layer of security dedicated to bot
detection and mitigation. {{ PRODUCT_SECURITY_ADVANCED_BOT }} is agile, intelligent, configurable, and adapatable to changing threats. It provides deep, actionable analysis of
all internet traffic, web reconnaissance, automated bots, and legitimate website
visitors.

## Real-Time Dashboard {/*real-time-dashboard*/}

Use our Real-Time dashboard to gain insight into:

-   **Visitor Patterns:** Review near real-time visitor patterns over the last few minutes, hours, or even days. Visitors are tracked according to whether they were blocked (i.e., mitigated), trusted, or allowed to pass through our network after inspection (i.e., unmitigated). Look for a sudden
increase in traffic levels, since that can be a precursor to something more concerning.
-   **Total Traffic Percentage:** Compare aggregate mitigated and unmitigated traffic levels against total traffic.
-   **Additional Statistics:** View statistics for the top countries, data centers, and user agents as determined by total traffic.

<Callout type="tip">

  Cross-reference unexpected spikes or dips in the Real-Time dashboard with the Scrapers dashboard.

</Callout>

<Callout type="info">

  This dashboard is updated every minute with data from 3 minutes ago.

</Callout>

![](/images/advanced-bot-management/real-time-dashboard.png)

By default, this dashboard displays activity for the current day. Perform the following steps to adjust the dashboard's date range:

1.  Click on the **Controls** section.
2.  Click on the start date to display a calendar.
3.  Click on the desired start date. 
4.  Click on the desired end date.
5.  Optional. By default, the start and end time are set to midnight. You may adjust these settings as needed. 
6.  Click off of the calendar to hide it.

## Scrapers Dashboard {/*scrapers-dashboard*/}

Use the Scrapers dashboard to analyze data scraping activity. This activity is broken down by:

-   **Identified Scraper / Total Requests:** Review total data scraping requests and compare that to total traffic requests.
-   **Scraper Activity:** Review scraping activity over the last few minutes, hours, or even days.
-   **Additional Statistics:** Review scraping activity by data center, country, and user agent.

![](/images/advanced-bot-management/scrapers.png)

## Attacks {/*attacks*/}

Review the attacks on your site from the **Attacks** page. Use this information to understand the intent of the attack (e.g., credential stuffing, fake account creation, or account takeover), the timeline of the attack, and how it was mitigated.

![](/images/advanced-bot-management/attacks.png)

## Actioned {/*actioned*/}

From the **Actioned** page, view threat and trusted lists for visitors, IP addresses, user agents, and data centers. A threat list identifies a source of questionable traffic that will be automatically mitigated (e.g., blocked or served a CAPTCHA), while a trusted list identifies a source of traffic that will not be screened by {{ PRODUCT_SECURITY_ADVANCED_BOT }} since it is considered legitimate.

![](/images/advanced-bot-management/actioned.png)

## Reporting Dashboard {/*reporting-dashboard*/}

Use our Reporting dashboard to analyze mitigated, unmitigated, and trusted requests. In addition to providing basic statistics, this dashboard allows you to visualize traffic patterns by request type. It also breaks down each request type by country, data center, and user agent. 

![](/images/advanced-bot-management/reporting.png)

By default, this dashboard displays activity for the current month. Perform the following steps to adjust the dashboard's date range:

1.  Click on the **Controls** section.
2.  Click on the start date to display a calendar.
3.  Navigate to the desired month and then click on the desired start date. 
4.  Click on the desired end date.
5.  Optional. By default, the start and end time are set to midnight. You may adjust these settings as needed. 
6.  Click off of the calendar to hide it.

## Audit Trail {/*audit-trail*/}

Review changes to your {{ PRODUCT_SECURITY_ADVANCED_BOT }} configuration from the **Audit Trail** page. Use this audit trail to track recent configuration changes or to investigate why traffic was blocked. This audit trail reveals what the change was, the reason for this change, when it was made, and by whom. 

![](/images/advanced-bot-management/audit-trail.png)
