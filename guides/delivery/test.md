<?xml version="1.0" encoding="utf-8"?>
<html MadCap:lastBlockDepth="12" MadCap:lastHeight="19383" MadCap:lastWidth="882" xmlns:MadCap="http://www.madcapsoftware.com/Schemas/MadCap.xsd">
    <head>
        <link href="../Resources/TableStyles/StandardTable.css" rel="stylesheet" MadCap:stylesheetType="table" />
        <link href="../Resources/Stylesheets/WH_v1.1.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <h1>Ad Insertion Data (Ad Server Debug)</h1>
        <p>We provide <MadCap:popup><MadCap:popupHead>near real-time</MadCap:popupHead><MadCap:popupBody>Data is available a few minutes after an ad job is initiated.</MadCap:popupBody></MadCap:popup> data on the ads requested for your content. Analyze this information to gain insights into ad insertions, such as: </p>
        <ul>
            <li><a href="#BasicUsage">Verifying ad requests and responses.</a>
            </li>
            <li><a href="#Troubleshooting">Checking for errors</a> and discovering their root cause.</li>
            <li>Performing end-to-end <a href="#AuditingaPlaybackSession">auditing</a> of a single playback session.</li>
        </ul>
        <h2><a name="AdJobs"></a>Ad Jobs</h2>
        <p>Ad insertion data is collated and presented as an ad job. The scope of an ad job varies according to whether it belongs to a live stream or <MadCap:glossaryTerm glossTerm="Uplynk.Term13">VOD</MadCap:glossaryTerm> content. </p>
        <ul>
            <li><span class="bold">Live Stream:</span> The system generates an ad job whenever playback encounters an upcoming ad break. </li>
            <li><span class="bold">VOD:</span> The system generates a single ad job upon initiating playback. This ad job contains data for all of the asset's ad breaks. </li>
        </ul>
        <p>An ad job describes:</p>
        <ul>
            <li>The set of ads that were requested.</li>
            <li>The ad decision server's response for each of those ads.</li>
            <li>The tracking data that we provided to the ad decision server.</li>
        </ul>
        <p>
            <img src="../Resources/Images/Ad-Job.png" class="simage" />
        </p>
        <p>As illustrated above, each ad job consists of the following components:</p>
        <ul>
            <li><span class="bold">Ads:</span> Each ad listed under the job corresponds to a single ad during an ad break. Data shows whether the ad was selected for use during the ad break, the position in the ad break the ad was inserted into, and the status of the ad asset. </li>
            <li>
                <p><span class="bold">Transactions:</span> A transaction describes an ad request and the response provided by an ad decision server. </p>
                <ul style="list-style-type: square;">
                    <li><span class="bold">Request:</span> An ad request is generated for the initial request to the ad decision server and for each <MadCap:glossaryTerm glossTerm="Generic.Term9">wrapper</MadCap:glossaryTerm> spawned from it. The following information is captured for each ad request:&#160;raw URL, macros, HTTP headers, and processing information. </li>
                    <li>
                        <p><span class="bold">Response:</span>&#160;For each ad request, we provide the raw XML provided by the ad decision server and a summary of the response, including errors. If the ad request resulted in VMAP and VAST wrappers and a <MadCap:glossaryTerm glossTerm="Generic.Term8">creative</MadCap:glossaryTerm>, then that information will also be included in the raw XML response. </p>
                        <p class="Note">An error during an ad request may prevent an ad response from being provided.</p>
                    </li>
                </ul>
            </li>
            <li><span class="bold">Beacons:</span> A beacon consists of the tracking data reported by our system to the ad decision server.</li>
        </ul>
        <h2>Data Retention</h2>
        <p>The retention policy for ad insertion data is 7 days. </p>
        <h2><a name="BasicUsage"></a>Basic Usage</h2>
        <p>Find and review ad jobs through the <a href="https://cms.uplynk.com/static/cms2/index.html#/ad-server-debug" target="_blank">Ad Server Debug page</a>. Use the following settings to search for the desired ad job data:</p>
        <table style="width: 100%; mc-table-style: url('../Resources/TableStyles/StandardTable.css'); margin-left: 0; margin-right: auto;" class="TableStyle-StandardTable" cellspacing="0">
            <col class="TableStyle-StandardTable-Column-Column1" />
            <col class="TableStyle-StandardTable-Column-Column1" />
            <thead>
                <tr class="TableStyle-StandardTable-Head-Header1">
                    <th class="TableStyle-StandardTable-HeadE-Column1-Header1">Setting</th>
                    <th class="TableStyle-StandardTable-HeadD-Column1-Header1">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">Ad server query params</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">For certain ad providers, such as GAM and Invidi, you can filter for specific ad server query parameters. For example, for GAM requests, you can query for ad jobs with <span class="code">ppid=123</span> in the primary ad server request.</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Ad Playback Type</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Filters ad job data by whether the ad was requested as a part of a live stream or VOD.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>From</p>
                        <p>To</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Filters ad job data by the time period during which the ad was requested.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Channel/Live Event ID</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Filters ad job data by the live channel or live event during which it was requested. Identify a live channel or live event by its system-defined ID.</p>
                        <MadCap:snippetBlock src="../Resources/Snippets/Live-Channel-ID.flsnp" />
                        <MadCap:snippetBlock src="../Resources/Snippets/LiveEvent-ID.flsnp" />
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Asset ID</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Filters ad job data by the VOD asset during which it was requested. Identify an asset by its system-defined ID.</p>
                        <MadCap:snippetBlock src="../Resources/Snippets/Asset-ID.flsnp" />
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Session ID</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Filters ad job data by the playback session for which it was requested. Identify your playback session by its system-defined ID.</p>
                        <MadCap:dropDown>
                            <MadCap:dropDownHead>
                                <MadCap:dropDownHotspot>Where can I&#160;find a playback session ID?</MadCap:dropDownHotspot>
                            </MadCap:dropDownHead>
                            <MadCap:dropDownBody>
                                <p>Implement the <a href="../Develop/Preplayv2.htm">Preplay API</a> within your custom player to retrieve the playback session ID.</p>
                                <p class="Note">Alternatively, inspect your playback URL to find out your own playback session.<br /><a href="#AuditingaPlaybackSession">Learn more.</a></p>
                            </MadCap:dropDownBody>
                        </MadCap:dropDown>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Status</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Filters ad job data by status. </p>
                        <p><a href="#AdJobStatus">Learn more.</a>
                        </p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Debug Name</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Filters ad job data by tagged playback session(s). </p>
                        <p class="Tip">Tag a playback session by passing the <a href="../Setup/Customizing-Playback.htm#ad_debug">ad._debug parameter</a> in the playback URL.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Transactions</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Determines whether transactions will be included in the search results.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyB-Column1-Row1">
                        <p>Beacons</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyA-Column1-Row1">
                        <p>Determines whether beacons will be included in the search results.</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="ProcedureSection"><a name="search"></a>To search for ad job data</p>
        <ol>
            <li>Navigate to the <a href="https://cms.uplynk.com/static/cms2/index.html#/ad-server-debug" target="_blank">Ad Server Debug page</a>. <MadCap:expanding><MadCap:expandingHead>How?</MadCap:expandingHead><MadCap:expandingBody>From the CMS, navigate to <span class="option">Services</span> | <span class="option">Ad Server Debug</span>.</MadCap:expandingBody></MadCap:expanding></li>
            <li>From the <span class="option">Ad Playback Type</span> option, determine whether ad job data for a live stream or VOD content will be returned.</li>
            <li>
                <p>Define the time period for which ad job data will be returned. </p>
                <ol style="list-style-type: lower-roman;">
                    <li>Click within the <span class="option">From</span> option and then select a start date and time.</li>
                    <li>Click within the <span class="option">To</span> option and then select an end date and time.</li>
                </ol>
                <p class="Note">Ad job data is available a few minutes after the ad request is sent to the ad decision server.</p>
                <MadCap:snippetBlock src="../Resources/Snippets/Date-Time.flsnp" />
            </li>
            <li>Optional. Define other ad job filters.</li>
            <li>Click <span class="btnSave">Fetch Ad Data</span>.</li>
        </ol>
        <p class="ProcedureSection">To refine your search results</p>
        <p>Refine your results by modifying the desired ad job search option(s) from the <span class="option">Query</span> pane and then clicking <span class="btn">Update Query</span>.</p>
        <p class="Note">If you would rather perform a new search, then you should click <span class="btnSave">New Ad Query</span>.</p>
        <p class="ProcedureSection">To filter search results by ad job status</p>
        <p>Filter your results by <a href="#AdJobStatus">status</a> by clicking <img src="../Resources/Images/Icon/Icon-Filter-White.png" /> and then clearing the statuses that should be excluded from the search results.</p>
        <h2>Ad Job Data</h2>
        <p>Search results consist of a list of ad jobs that meet the specified search criteria. The following information is reported for each ad job:</p>
        <table style="width: 100%; mc-table-style: url('../Resources/TableStyles/StandardTable.css'); margin-left: 0; margin-right: auto;" class="TableStyle-StandardTable" cellspacing="0">
            <col class="TableStyle-StandardTable-Column-Column1" />
            <col class="TableStyle-StandardTable-Column-Column1" />
            <thead>
                <tr class="TableStyle-StandardTable-Head-Header1">
                    <th class="TableStyle-StandardTable-HeadE-Column1-Header1">Name</th>
                    <th class="TableStyle-StandardTable-HeadD-Column1-Header1">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Status</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p><a name="AdJobStatus"></a>Indicates the ad job's status. The available statuses are described below.</p>
                        <ul>
                            <li>
                                <p><span class="bold">Completed:</span> Indicates that an ad job's initial transactions with the ad decision server were completed in a timely manner.</p>
                                <p class="Note">This state may include ad jobs with a failed <MadCap:glossaryTerm glossTerm="Generic.Term9">wrapper</MadCap:glossaryTerm> transaction.</p>
                            </li>
                            <li>
                                <p><span class="bold">Failed:</span> Indicates that an ad job's initial transactions either did not complete on time or resulted in empty or malformed responses. </p>
                                <p>View the failure reason by hovering over this label. </p>
                                <p>
                                    <img src="../Resources/Images/Ad-Server-Debug-Failed.png" class="simage" />
                                </p>
                                <p><a href="#Troubleshooting">Learn more.</a>
                                </p>
                            </li>
                            <li>
                                <p><span class="bold">Pending:</span> Indicates that work on an ad job has not been started. </p>
                                <p class="Note">Due to the speed at which ad jobs are processed, this state should happen infrequently. Additionally, an ad job that does report this state should quickly transition to a different state.</p>
                            </li>
                            <li>
                                <p><span class="bold">Processing:</span> Indicates that an ad job contains at least one transaction that is still being processed. For example, this state may indicate that the system is still fetching ads from the ad decision server and creating the ad payload. </p>
                                <p class="Note">Due to the speed at which ad jobs are processed, this state should happen infrequently. Additionally, an ad job that does report this state should quickly transition to a different state.</p>
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Date Created</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates the date and time at which the ad job was initiated.</p>
                        <MadCap:snippetBlock src="../Resources/Snippets/Date-Time.flsnp" />
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Channel/Event</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies a live channel or a live event by its name.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Session ID</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies a playback session by its system-defined ID.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>T#</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates the number of <MadCap:glossaryTerm glossTerm="Uplynk.Term23">transactions</MadCap:glossaryTerm> associated with the ad job.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>B#</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates the number of <MadCap:glossaryTerm glossTerm="Uplynk.Term24">beacons</MadCap:glossaryTerm> associated with the ad job.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyB-Column1-Row1">
                        <p>F#</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyA-Column1-Row1">
                        <p>Indicates the number of failed transactions that occurred within an ad job. A transaction is considered a failure when it either does not complete on time or it resulted in an empty or malformed response. </p>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="Tip">Click on an ad job to view its transactions and beacons.</p>
        <h3><a name="Transactions"></a>Transactions</h3>
        <p>View an ad job's <MadCap:glossaryTerm glossTerm="Uplynk.Term23">transactions</MadCap:glossaryTerm> by clicking on an ad job from the
		<span class="option">Ad Server Debug Query Results</span> page. The following information is reported for each transaction:</p>
        <table style="width: 100%; mc-table-style: url('../Resources/TableStyles/StandardTable.css'); margin-left: 0; margin-right: auto;" class="TableStyle-StandardTable" cellspacing="0">
            <col class="TableStyle-StandardTable-Column-Column1" />
            <col class="TableStyle-StandardTable-Column-Column1" />
            <thead>
                <tr class="TableStyle-StandardTable-Head-Header1">
                    <th class="TableStyle-StandardTable-HeadE-Column1-Header1">Name</th>
                    <th class="TableStyle-StandardTable-HeadD-Column1-Header1">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Status</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates a transaction's status. The available statuses are described below.</p>
                        <ul>
                            <li><span class="bold">Completed:</span> Indicates that the transaction was completed in a timely manner.</li>
                            <li>
                                <p><span class="bold">Failed:</span> Indicates that the transaction either did not complete on time or resulted in an empty or malformed response. </p>
                                <p>View the failure reason by hovering over this label. </p>
                                <p>
                                    <img src="../Resources/Images/Ad-Server-Debug-Failed.png" class="simage" />
                                </p>
                                <p><a href="#Troubleshooting">Learn more.</a>
                                </p>
                            </li>
                            <li>
                                <p><span class="bold">Pending:</span> Indicates that the ad request has not been submitted.</p>
                                <p class="Note">Due to the speed at which ad jobs are processed, this state should happen infrequently. Additionally, an ad job that does report this state should quickly transition to a different state.</p>
                            </li>
                            <li>
                                <p><span class="bold">Processing:</span> Indicates that the transaction that is still being processed. For example, this state may indicate that the system is still fetching the requested ad from the ad decision server and creating the ad payload. </p>
                                <p class="Note">Due to the speed at which ad jobs are processed, this state should happen infrequently. Additionally, an ad job that does report this state should quickly transition to a different state.</p>
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Date Created</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates the date and time at which the transaction was initiated.</p>
                        <MadCap:snippetBlock src="../Resources/Snippets/Date-Time.flsnp" />
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Type</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates the transaction type: is the primary ad request (labeled “Primary” in purple), a wrapper spawned from the primary transaction (labeled “Primary Wrapper”), or a wrapper spawned from another wrapper transaction (labeled “Wrapper”).</p>
                        <ul>
                            <li><span class="bold">Primary:</span> The primary ad request.</li>
                            <li><span class="bold">Primary Wrapper:</span> A wrapper spawned from the primary transaction.</li>
                            <li><b>Wrapper</b>: A wrapper spawned from another wrapper transaction.</li>
                        </ul>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Total Elapsed Time</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates the total amount of time it took to complete the transaction.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Transaction ID</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies the transaction by its system-defined ID.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">Initial Ad ID</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">Displays the ad ID found in the initial/ primary response.</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">Wrapper Chains</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">Indicates the number and status of wrapper chains spawned from this transaction. <br /><br />Each wrapper chain starts with a primary transaction followed by one or more wrapper transactions. <br /><br />Green indicates all wrapper chains ended with a successful response containing ads.<br />Yellow indicates a mix of successes and failures.<br />Red indicates all wrapper chains ended with a failed response.<br /><br />Wrapper chains can be collapsed or expanded with the carrot buttons on the left, or with the <span class="btn">Expand All / Collapse All</span> buttons.</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyB-Column1-Row1">Wrapper Depth</td>
                    <td class="TableStyle-StandardTable-BodyA-Column1-Row1">Indicates the position of this wrapper in the chain with the number of parent transactions of this request. 0 is the primary ad request, 1 is for Primary Wrappers, 2 would be the 3rd transaction in the wrapper chain, and so on.</td>
                </tr>
            </tbody>
        </table>
        <p class="Tip">Click on a transaction to view the ad request and the raw XML response from the ad decision server.</p>
        <p class="Tip">Sort the table to quickly find transactions with similar attributes (e.g., status, wrappers, and creatives).</p>
        <h4><a name="TransactionDetails"></a>Transaction Details</h4>
        <p>View a transaction's request and response by clicking on it from the <span class="option">Transactions</span> tab of the <span class="option">Job Details</span> page. </p>
        <ul>
            <li>The <span class="option">Request</span> tab describes either the initial request to an ad decision server or a wrapper. </li>
            <li>The <span class="option">Response</span> tab provides the raw XML response provided by an ad decision server and summary information.</li>
        </ul>
        <h5><a name="TransactionDetailsRequest"></a>Request</h5>
        <p>The <span class="option">Request</span> tab describes either the initial request to an ad decision server or a wrapper. This tab reports the following information:</p>
        <table style="width: 100%; mc-table-style: url('../Resources/TableStyles/StandardTable.css'); margin-left: 0; margin-right: auto;" class="TableStyle-StandardTable" cellspacing="0">
            <col class="TableStyle-StandardTable-Column-Column1" />
            <col class="TableStyle-StandardTable-Column-Column1" />
            <thead>
                <tr class="TableStyle-StandardTable-Head-Header1">
                    <th class="TableStyle-StandardTable-HeadE-Column1-Header1">Name</th>
                    <th class="TableStyle-StandardTable-HeadD-Column1-Header1">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Request URL</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Typically indicates the request URL. The request URL's query string parameters are reported directly below this URL.</p>
                        <p class="Note"><span class="SubTitle">Google Ad Manager and </span>
                            <MadCap:glossaryTerm glossTerm="Uplynk.Term13" class="SubTitle">VOD</MadCap:glossaryTerm><span class="SubTitle"> Playback</span>
                            <br />If the <a href="DoubleClick.htm#adoutput">ad.output parameter</a> was set to a VAST format (i.e., <span class="userinput">xml__vast3</span> or <span class="userinput">xml_vast2</span>) for a VOD playback session, then this field returns a VMAP template instead of a URL for the initial ad request. However, our service populates this field with a request URL for subsequent wrapper requests. </p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Request Headers</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Contains a list of request headers and their values. </p>
                        <p class="Note"><span class="SubTitle">Google Ad Manager and </span>
                            <MadCap:glossaryTerm glossTerm="Uplynk.Term13" class="SubTitle">VOD</MadCap:glossaryTerm><span class="SubTitle"> Playback</span>
                            <br />If the <a href="DoubleClick.htm#adoutput">ad.output parameter</a> was set to a VAST format (i.e., <span class="userinput">xml__vast3</span> or <span class="userinput">xml_vast2</span>) for a VOD playback session, then this section will not be populated for the initial ad request. However, our service populates this section for subsequent wrapper requests.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Date Created</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies the date and time at which the ad request was submitted.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p class="Deprecated">Date Updated</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Deprecated.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Total Time</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies the total amount of time, in seconds, it took to submit the ad request and receive a response from the ad decision server. </p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Connection Time</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies the amount of time, in seconds, it took to establish a connection to the ad decision server.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Header Request Time</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies the amount of time, in seconds, it took after establishing a connection to send the ad request and to download response headers.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Body Download Time</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies the amount of time, in seconds, it took to download the response body.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Failure Reason</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies the reason for which the transaction failed. This field reports <span class="userinput">None</span> for pending or successful ad requests.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Pod Location</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Reserved for future use.</p>
                        <p MadCap:conditions="General.WIP">the request responds to a preroll, postroll or one of the midrolls, however there are many complicated pieces to this, such as differences between live and vod ad requests, so it is not useful right now</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyB-Column1-Row1">
                        <p>Redirects</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyA-Column1-Row1">
                        <p>Identifies the number of HTTP redirects (e.g., <span class="statuscode">302 Found</span>) that were generated as a result of this ad request. </p>
                        <p class="SubTitle">Example:</p>
                        <p>A request for <span class="userinput">http://example.com</span> may redirect to <span class="userinput">https://www.example.com</span>.</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <h5><a name="TransactionDetailsResponse"></a>Response</h5>
        <p>The <span class="option">Response</span> tab describes the response from an ad decision server. This tab reports the following information:</p>
        <table style="width: 100%; mc-table-style: url('../Resources/TableStyles/StandardTable.css'); margin-left: 0; margin-right: auto;" class="TableStyle-StandardTable" cellspacing="0">
            <col class="TableStyle-StandardTable-Column-Column1" />
            <col class="TableStyle-StandardTable-Column-Column1" />
            <thead>
                <tr class="TableStyle-StandardTable-Head-Header1">
                    <th class="TableStyle-StandardTable-HeadE-Column1-Header1">Name</th>
                    <th class="TableStyle-StandardTable-HeadD-Column1-Header1">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Raw Response</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Contains the raw response provided by the ad decision server.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Date Created</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies the date and time at which the ad request was submitted. </p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Date Updated</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Reserved for future use.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Ads</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies the number of ad creatives that were provided by the ad decision server as a result of this transaction.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Beacons</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies the number of beacons that were sent to the ad decision server.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>In Wrapper</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates whether this response is due to a wrapper. </p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Depth</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies the number of times that an ad decision server forwarded this ad request to another server.
						</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>ID</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates the system-defined ID assigned to the response.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Failure Reason</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Identifies the reason for which the transaction failed. This field reports <span class="userinput">None</span> for pending or successful ad requests.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Errors</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates any errors that occurred when processing the response.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyB-Column1-Row1">
                        <p>Warnings</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyA-Column1-Row1">
                        <p>Indicates any warnings that occurred.</p>
                    </td>
                </tr>
            </tbody>
        </table>
        <h3><a name="Ads"></a>Ads</h3>
        <p>View the list of ads returned by this ad job here. The following information is reported for each ad:</p>
        <table style="width: 100%; mc-table-style: url('../Resources/TableStyles/StandardTable.css'); margin-left: 0; margin-right: auto;" class="TableStyle-StandardTable" cellspacing="0">
            <col class="TableStyle-StandardTable-Column-Column1" />
            <col class="TableStyle-StandardTable-Column-Column1" />
            <thead>
                <tr class="TableStyle-StandardTable-Head-Header1">
                    <th class="TableStyle-StandardTable-HeadE-Column1-Header1">Name</th>
                    <th class="TableStyle-StandardTable-HeadD-Column1-Header1">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">Selected?</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">True/ False indicating whether this ad was selected for insertion into the ad break.</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">Break #</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">Which ad break the ad belong to, 0-indexed.</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">Ad #</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">Position of the ad within the ad break, 0-index. For example, a break # of 0 and an Ad # of 2 indicates the ad was the third ad inserted into the first ad break.</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">Initial Ad ID</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">ID of this ad as found in the initial/primary ad response (the top-level parent in the case of wrappers). Otherwise, this will often be the same as the Ad ID.</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">Ad ID</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">ID of this ad as found in the ad response.</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">Creative ID</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">ID of the ad asset / creative, as found in the ad response.</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1" MadCap:conditions="">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">Duration</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">Duration of the ad asset, in seconds.</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1" MadCap:conditions="">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">Fallback?</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">True/ False indicating whether this ad was a fallback ad. Fallback ads are used as backup ads in the case other ads are unusable.</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1" MadCap:conditions="">
                    <td class="TableStyle-StandardTable-BodyB-Column1-Row1">Asset Status</td>
                    <td class="TableStyle-StandardTable-BodyA-Column1-Row1">Displays the status of the ad asset in the Uplynk system. Clicking the button will play the ad if its status is ‘OK’.</td>
                </tr>
            </tbody>
        </table>
        <h3><a name="TransactionDetailsBeacons"></a>Beacons</h3>
        <p>View an ad job's beacons by clicking on an ad job from the
		<span class="option">Ad Server Debug Query Results</span> page and then clicking on the <span class="option">Beacons</span> tab. The following information is reported for each beacon:</p>
        <table style="width: 100%; mc-table-style: url('../Resources/TableStyles/StandardTable.css'); margin-left: 0; margin-right: auto;" class="TableStyle-StandardTable" cellspacing="0">
            <col class="TableStyle-StandardTable-Column-Column1" />
            <col class="TableStyle-StandardTable-Column-Column1" />
            <thead>
                <tr class="TableStyle-StandardTable-Head-Header1">
                    <th class="TableStyle-StandardTable-HeadE-Column1-Header1">Name</th>
                    <th class="TableStyle-StandardTable-HeadD-Column1-Header1">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Delivered</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates whether the current beacon was successfully delivered to an ad decision server. Valid values are:</p>
                        <ul>
                            <li><span class="bold">success:</span> The ad decision server received the beacon.</li>
                            <li><span class="bold">pending:</span> Our system has not yet sent the beacon to the ad decision server.</li>
                            <li><span class="bold">error:</span> Our system experienced a communication error upon sending the beacon to the ad decision server. For example, an error occurs when the ad decision server does not return a <span class="statuscode">2xx</span> response or it takes too long to respond.</li>
                        </ul>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Date Created</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates the date and time at which the beacon was sent to the ad decision server.</p>
                        <MadCap:snippetBlock src="../Resources/Snippets/Date-Time.flsnp" />
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Name</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates the name assigned to the beacon. </p>
                        <div MadCap:conditions="General.WIP">
                            <p>VAST: The `event` attribute for the `Tracking` element that holds the beacon URL
							</p>
                            <p>Freewheel SmartXML: The `name` attribute of `eventCallback` element that holds the beacon URL
							</p>
                        </div>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Beacon URL</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates the URL to which beacon data was sent.</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Type</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates the type of ad event that triggered the beacon. Valid values are:</p>
                        <ul>
                            <li>
                                <p><span class="bold">IMPRESSION:</span> Indicates that a creative was rendered.</p>
                            </li>
                            <li><span class="bold">ERROR:</span> Indicates that an error occurred.</li>
                            <li><span class="bold">CLICK:</span> Indicates that the viewer clicked on a creative.</li>
                        </ul>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">
                        <p>Code</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">
                        <p>Indicates the beacon's HTTP status code (e.g., <span class="statuscode">200</span>).</p>
                    </td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1" MadCap:conditions="">
                    <td class="TableStyle-StandardTable-BodyB-Column1-Row1">
                        <p>Browser</p>
                    </td>
                    <td class="TableStyle-StandardTable-BodyA-Column1-Row1">
                        <p>Indicates the client's behavior when a viewer clicks on an ad. Valid values are:</p>
                        <ul>
                            <li><span class="bold">Hide:</span> Indicates that the ad will continue to play.</li>
                            <li><span class="bold">Replace:</span> Indicates that the client should open the link associated with the ad and switch focus to that content.</li>
                        </ul>
                        <p class="Note">This field is only relevant for client-side beacons. </p>
                    </td>
                </tr>
            </tbody>
        </table>
        <p class="Tip">Sort the table to quickly find beacons with similar attributes (e.g., delivery status or HTTP status code).</p>
        <h2 MadCap:conditions="General.WIP">Ad Verification</h2>
        <MadCap:snippetBlock src="../Resources/Snippets/TODO.flsnp" MadCap:conditions="General.WIP" />
        <h2><a name="Troubleshooting"></a>Troubleshooting Ad Jobs</h2>
        <p>Troubleshoot ad jobs that contain completed transactions with warnings, failed transactions, or both.</p>
        <p class="Tip"><a href="#AuditingaPlaybackSession">Audit your own playback session</a> to correlate the playback experience to ad insertion data.</p>
        <p class="Note">An ad job is considered to be successfully completed when the initial transactions to the ad decision server are completed in a timely manner. However, a successful ad job may contain transaction(s) with warnings or failures. </p>
        <p class="ProcedureSection">To troubleshoot an ad job</p>
        <ol>
            <li>Click on the desired ad job.</li>
            <li>Click on the desired transaction.</li>
            <li>From the <span class="option">Request</span> tab, review the URL, query string parameters, and headers for the request submitted to the ad decision server. </li>
            <li>From the right-hand pane, review the <span class="option">Failure Reason</span> field.</li>
            <li>Click the <span class="option">Response</span> tab.</li>
            <li>
                <p>From the right-hand pane, review the following fields:</p>
                <ul>
                    <li><span class="bold">Failure Reason:</span> Indicates the reason that a transaction failed.</li>
                    <li><span class="bold">Errors:</span> Indicates any errors that occurred when processing the response.</li>
                    <li><span class="bold">Warnings:</span> Indicates any warnings that occurred.</li>
                </ul>
            </li>
            <li>Use the information uncovered in the previous step to perform additional investigation into the failure, error, or warning.</li>
            <li MadCap:conditions="General.WIP">Open the JSON file in the desired editor.</li>
            <li MadCap:conditions="General.WIP">
                <p>Review the transaction. </p>
                <p class="SubTitle">Key fields:</p>
                <ul>
                    <li><span class="bold">request_url:</span> Indicates the request URL sent to the ad decision server.</li>
                    <li><span class="bold">raw_response:</span>&#160;Contains the XML response from the ad decision server.</li>
                    <li><span class="bold">total_elapsed_request_time:</span> Indicates the amount of time it took to submit a request. </li>
                </ul>
            </li>
        </ol>
        <p class="Note">View the transaction in JSON format by clicking the <span class="btn">Export Transaction JSON</span>. The <span class="element">raw_response</span> JSON field contains the raw data for the response in XML format. </p>
        <h3>Warnings</h3>
        <p>A warning indicates that the request to the ad decision server was incomplete or improperly formed. For example, a warning is generated when the request contains missing parameters or values. </p>
        <p>A warning icon (<img src="../Resources/Images/Icon/Icon-Warning.png" />) appears next to both of the following:</p>
        <ul>
            <li>Ad jobs that contain at least one transaction with a warning.</li>
            <li>The transaction to which the warning applies.</li>
        </ul>
        <p>View the warning by hovering over it as illustrated below.</p>
        <p>
            <img src="../Resources/Images/Ad-Server-Debug-Warning-Green.png" class="simage" />
        </p>
        <p>In the above illustration, the ad job contains a warning that indicates that a transaction contains 4 empty impressions. Inspecting the transaction's raw response reveals that it does contain 4 empty impressions. Reviewing the <span class="HTMLtag">Error</span> tag indicates that an error also occurred. Although the ad decision server returned 4 empty impressions and an error, an ad was still served to the viewer. </p><pre class="prettyprint sa" xml:space="preserve">			&lt;Impression id=\"3rdparty\"/&gt;
			&lt;Impression id=\"3rdparty\"/&gt;
			&lt;Impression id=\"3rdparty\"/&gt;
		&lt;Impression id=\"3rdparty\"/&gt;</pre>
        <h3>Failure</h3>
        <p>A failed transaction indicates that an ad impression was not delivered either because the transaction did not complete on time or it resulted in an empty or malformed response. View the failure reason by hovering over the transaction's status.</p>
        <p>
            <img src="../Resources/Images/Ad-Server-Debug-Failed.png" class="simage" />
        </p>
        <h3>Ad Request Failure Reasons</h3>
        <p>Failures can occur at various stages of processing an ad request. Edgio categorizes the failure reasons into failure types based on these stages.</p>
        <p>The failure types are:</p>
        <ul>
            <li><a href="#Request">Request</a>
            </li>
            <li><a href="#Response">Response</a>
            </li>
            <li><a href="#Parsing">Parsing</a>
            </li>
            <li><a href="#Processing">Processing</a>
            </li>
        </ul>
        <p>In certain cases, the "Error" section of the job or transaction details includes additional information about an ad failure that can be sent to Edgio Support to help troubleshoot an inquiry about a failed job or transaction.</p>
        <h4><a name="Request"></a>Request</h4>
        <p>An error occurred while establishing an HTTP connection to the ad server and downloading the ad response. To troubleshoot request failures, contact the ad server. The ad server may have some data, or it may not have any data. The Ad Analytics reports can be used to gather data on how frequent these errors occur.</p>
        <p style="font-weight: bold;">Request Errors</p>
        <table style="width: 100%; mc-table-style: url('../Resources/TableStyles/StandardTable.css'); margin-left: 0; margin-right: auto;" class="TableStyle-StandardTable" cellspacing="0">
            <col class="TableStyle-StandardTable-Column-Column1" />
            <col class="TableStyle-StandardTable-Column-Column1" />
            <thead>
                <tr class="TableStyle-StandardTable-Head-Header1">
                    <th class="TableStyle-StandardTable-HeadE-Column1-Header1">Failure</th>
                    <th class="TableStyle-StandardTable-HeadD-Column1-Header1">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">connection error	</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">An error occurred establishing the connection with the ad server. This typically means the ad server was unreachable.
					</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">connection timeout	</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">The ad server did not respond quickly enough to the connection attempt. Standard timeout is limited to 1 second.
					</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">download error	</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">There was an error attempting to download the prepared ad response from the ad server.
					</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">download timeout	</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">The ad server took too long to send the next packet while downloading the ad response. Standard timeout is limited to 1 second.
					</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">invalid URL	</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">The URL used to make the request was not valid. This typically happens because a wrapper URL contains a bad URL.
					</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">non 200	</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">The ad server responded with an error code. Usually either a 4xx or 5xx HTTP status code.
					</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">read timeout	</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">The ad server took too long to respond back while preparing the ad response. Standard timeout is limited to 1 second.
					</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyB-Column1-Row1">SSL error	</td>
                    <td class="TableStyle-StandardTable-BodyA-Column1-Row1">There was a problem with the ad server’s security certificate.
					</td>
                </tr>
            </tbody>
        </table>
        <h4><a name="Response"></a>Response</h4>
        <p>A high-level check of the response contents ensuring they are in a valid format. For these failures, the ad server should be notified.</p>
        <p style="font-weight: bold;">Response Errors</p>
        <table style="width: 100%; mc-table-style: url('../Resources/TableStyles/StandardTable.css'); margin-left: 0; margin-right: auto;" class="TableStyle-StandardTable" cellspacing="0">
            <col class="TableStyle-StandardTable-Column-Column1" />
            <col class="TableStyle-StandardTable-Column-Column1" />
            <thead>
                <tr class="TableStyle-StandardTable-Head-Header1">
                    <th class="TableStyle-StandardTable-HeadE-Column1-Header1">Failure</th>
                    <th class="TableStyle-StandardTable-HeadD-Column1-Header1">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">empty response	</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">The ad response is an empty string with no content.
					</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">invalid XML	</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">The XML of the ad response was malformed.
					</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyB-Column1-Row1">response too big	</td>
                    <td class="TableStyle-StandardTable-BodyA-Column1-Row1">The ad response was too big. Ad responses are limited to 1 MB to ensure processing ad jobs aren’t blocked by an enormous ad response.
					</td>
                </tr>
            </tbody>
        </table>
        <h4><a name="Parsing"></a>Parsing</h4>
        <p>Reading and parsing the response to extract the ad information.</p>
        <p>For the no ad break, no ads returned and no media file errors, the ad server did not provide the needed information and should be contacted to see why the responses did not include that data. Parse errors can occur for a variety of reasons. Contact support with any questions and be sure to include any additional information provided in the “Errors” section.</p>
        <p style="font-weight: bold;">Parsing Errors</p>
        <table style="width: 100%; mc-table-style: url('../Resources/TableStyles/StandardTable.css'); margin-left: 0; margin-right: auto;" class="TableStyle-StandardTable" cellspacing="0">
            <col class="TableStyle-StandardTable-Column-Column1" />
            <col class="TableStyle-StandardTable-Column-Column1" />
            <thead>
                <tr class="TableStyle-StandardTable-Head-Header1">
                    <th class="TableStyle-StandardTable-HeadE-Column1-Header1">Failure</th>
                    <th class="TableStyle-StandardTable-HeadD-Column1-Header1">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">no ad break	</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">The VMAP ad response did not contain any ad breaks.
					</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">no ads returned	</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">The ad response did not contain any ads.
					</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyE-Column1-Row1">no media file	</td>
                    <td class="TableStyle-StandardTable-BodyD-Column1-Row1">The ad response contained ads, but none of the ads contained media files.
					</td>
                </tr>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyB-Column1-Row1">parse error	</td>
                    <td class="TableStyle-StandardTable-BodyA-Column1-Row1">Something in the ad response caused parsing to fail.
					</td>
                </tr>
            </tbody>
        </table>
        <h4><a name="Processing"></a>Processing</h4>
        <p>After parsing there are some additional actions taken to ensure the ads are prepared for stitching. Also covers any issues before or between the other stages.</p>
        <p style="font-weight: bold;">Processing Errors</p>
        <table style="width: 100%; mc-table-style: url('../Resources/TableStyles/StandardTable.css'); margin-left: 0; margin-right: auto;" class="TableStyle-StandardTable" cellspacing="0">
            <col class="TableStyle-StandardTable-Column-Column1" />
            <col class="TableStyle-StandardTable-Column-Column1" />
            <thead>
                <tr class="TableStyle-StandardTable-Head-Header1">
                    <th class="TableStyle-StandardTable-HeadE-Column1-Header1">Failure</th>
                    <th class="TableStyle-StandardTable-HeadD-Column1-Header1">Description</th>
                </tr>
            </thead>
            <tbody>
                <tr class="TableStyle-StandardTable-Body-Row1">
                    <td class="TableStyle-StandardTable-BodyB-Column1-Row1">process timeout	</td>
                    <td class="TableStyle-StandardTable-BodyA-Column1-Row1">The allotted time for completing the ad job expired before being able to finish processing the ad request
					</td>
                </tr>
            </tbody>
        </table>
        <div MadCap:conditions="General.WIP">
            <p>Those statuses are caused by the following conditions:</p>
            <p>ConnectionReadTimeout during download</p>
            <p>MissingSchema during connection</p>
            <p>ConnectionReadTimeout during connection</p>
            <p>ReadTimeout during connection</p>
            <p>ConnectionError during connection</p>
            <p>ConnectTimeout during connection</p>
            <p>ConnectionError during download</p>
            <p>ContentDecodingError during download</p>
            <p>SSLError during connection</p>
            <p>Error encountered in response parser while parsing response</p>
            <p>&#160;</p>
            <p>In addition to the Warnings we store statically, we collect and display Warnings from third-parties.</p>
            <p>The Freewheel specific errors we've collected thus far include:</p>
            <p>MULTIPLE_SPONSORED_PLACEMENTS</p>
            <p>INVALID_ASSET_CUSTOM_ID</p>
            <p>NO_COMMERCIAL_BREAK_PATTERN_FOUND</p>
            <p>INVALID_SITE_SECTION_CUSTOM_ID</p>
            <p>REQUEST_DURATION_NOT_AVAILABLE</p>
            <p>The list of 3rd party errors isn’t something we can determine and provide. We just receive and store them. They are displayed in the Ad Debug API response, if they exist, under ‘Warnings’.</p>
        </div>
        <h3><a name="AuditingaPlaybackSession"></a>Auditing a Playback Session</h3>
        <p>Verify that ads are being served properly or troubleshoot ad delivery by auditing a playback session. If you audit your own playback session, you can view the ads that were served and then review the corresponding ad jobs that were triggered by those ads.</p>
        <p class="ProcedureSection">To audit your own playback session</p>
        <ol>
            <li>From within your web browser, open developer tools (e.g., Chrome offers DevTools).</li>
            <li>View your own network traffic by clicking on the <span class="option">Network</span> tab.</li>
            <li>Start video playback of the desired live stream or VOD.</li>
            <li>From within the <span class="option">Network</span> tab of your web browser's developer tools, select a playback request.</li>
            <li>Copy your playback session ID from the <span class="element">pbs</span> query string parameter.</li>
            <li>Navigate to the <a href="https://cms.uplynk.com/static/cms2/index.html#/ad-server-debug" target="_blank">Ad Server Debug page</a>. <MadCap:expanding><MadCap:expandingHead>How?</MadCap:expandingHead><MadCap:expandingBody>From the CMS, navigate to <span class="option">Services</span> | <span class="option">Ad Server Debug</span>.</MadCap:expandingBody></MadCap:expanding></li>
            <li>Paste your playback session ID within the <span class="option">Session ID</span> option.</li>
            <li>
                <p>Click <span class="btnSave">Fetch Ad Data</span>.</p>
                <p class="Tip">Ad job data is provided in near real-time. If the desired results are not returned, try again after a minute or two.</p>
            </li>
            <li>Review ad job data.</li>
            <li>
                <p>Retrieve the latest ad job data by performing the following steps:</p>
                <ol style="list-style-type: lower-roman;">
                    <li>Update the <span class="option">To</span> option to the current time.</li>
                    <li>Click <span class="btnSave">Update Query</span>.</li>
                </ol>
            </li>
        </ol>
    </body>
</html>
