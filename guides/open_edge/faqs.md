---
title: Open Edge FAQs
---

## How is traffic directed to an Open Edge PoP?

Edgio uses Anycast Border Gateway Protocol (BGP) announcements to direct clients towards the nearest DNS servers. The primary method of controlling which Point of Presence (PoP) clients are delivered from is through DNS. In the event of a PoP failure that results in BGP communication issues between Edgio and our providers, traffic is automatically routed to the next logically close location where IP announcements are being advertised. Edgio's DNS systems have the capability to selectively move traffic based on various metrics and data inputs. This process is primarily automated, with manual controls and overrides in place. During planned maintenance, Edgio has the ability to proactively shift traffic to selected locations and adhere to best practices by utilizing the best known connected location with the nearest proximity to the location undergoing maintenance.

## How do I know that the revenue share is accurate?

Edgio has a Service Provider portal that displays traffic activity; however, we cannot share customer-specific details on volume or pricing as it is forbidden in most content contracts. As a publicly traded company, Edgio follows industry-standard accounting practices. On a monthly basis, the CFO certifies the accuracy of the reported results and delivers a sworn statement.

## Why does Edgio request me to provision more egress than the rated server size?

Edgio Service Provider PoPs have an N+1 hardware configuration to ensure that the rated capacity remains true. For example, a 100G PoP includes 100G of CDS capacity + 25G server for good measure.

## Can I provision egress capacity on an as-needed basis?

Edgio requires the egress to meet or exceed the PoP rating. The egress needs to be in place so that Edgio can sell into the capacity as well as be available for live events that might exceed the typical daily usage. This is an important consideration for providing the revenue share.

## Does Edgio provide racks for the servers?

The standard configuration does not include racks; however, racks can be included upon request.

## What is required for remote-hands support?

Edgio requires the Service Provider to be available for any physical activity related to the PoP, including installation, reboot as required, visual inspection, and hardware replacement if necessary.

## Who is responsible in the event of hardware failure?

If the Service Provider owns the hardware and is receiving revenue share (typically 40%), the Service Provider is financially responsible to purchase replacement hardware. Edgio assists in providing any necessary information and in coordinating the replacement. The Service Provider may purchase the replacement hardware from Edgio. Any replacement hardware must meet the specifications of Edgio. Edgio does not get involved in minor items such as cable replacement.

If Edgio owns the hardware, Edgio is financially responsible to replace hardware during the term of the contract.

## Does the hardware include a warranty?

If the Service Provider owns the hardware, all manufacturer warranty transfer to the service provider. Current warranty lengths for major components are:

- Arista (direct): 1 year; Cisco (via OSI); Lifetime (shipped to Edgio)
- Dell (direct): 3 years; Aruba (via OSI); Lifetime (shipped to Edgio)
- Super Micro (direct): 3 years; Raritan (via OSI); Lifetime (shipped to Edgio)

## What is the software-update process?

Edgio operates an Agile software-development process with a goal of 10 monthly releases per annual cycle. One monthly release is not planned during the December holiday blackout period, and one monthly release is not planned based on anticipated additional software-development load due to failed QA or unplanned work. Each monthly release is tested in Edgio’s QA environment, followed by a carefully monitored production burn-in environment. After acceptance of all stages, Edgio’s entire network is upgraded across a 72-hour upgrade window.

## How is a PoP failover handled?
The default policy of Edgio traffic management is to failover or spillover traffic from any of our Service Provider partners into sites owned and operated by Edgio. This prevents stampede failure because the Edgio core PoPs are generally 10x the size of our Partner Network locations. Once health and traffic levels have returned to normal, Edgio’s standard traffic-engineering processes return traffic to the affected sites.

## What is the power consumption in watts of our PoP?

Each rack consumes up to 5KW watts of power when fully loaded. A 50G-200G single-rack system consumes up to 5KW; however, it is likely to be less on the smaller sizes. A dual rack 200G-400G PoP consumes up to 10KW of power.
