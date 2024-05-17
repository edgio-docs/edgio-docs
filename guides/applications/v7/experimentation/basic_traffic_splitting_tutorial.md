---
title: Basic Traffic Splitting Tutorial
---

This tutorial demonstrates how to split traffic between our [simple and full-featured sample sites](https://docs.edg.io/applications/v7/performance/cdn_as_code#examples). 

<ButtonLink variant="fill" type="default" href="https://edgio-community-examples-entry.glb.edgio.link/experiment-selection">

 Try it out!

</ButtonLink>

## Quick Start {/*quick-start*/}

1.  Create an entry environment that contains origin configurations through which traffic will be routed between our sample sites. 
    -   Create an origin configuration that points to our simple performance site.
    -   Create an origin configuration that points to our full-featured performance site.
2.  Create a rule that returns the [Experimentation - Variant Selector web page](https://edgio-community-examples-entry.glb.edgio.link/experiment-selection).
3.  Create an experiment that splits traffic between the entry environment's origin configurations.

## Create Entry Environment {/*create-entry-environment*/}

This tutorial requires an environment that is dedicated to splitting traffic between our sample sites. We will now add one by creating a property.

1.  Load the desired organization or your private space.
2.  Click **New Property**.
3.  Under the **Self Host Property** section, click **Create Property**.
4.  In the **Property Name** option, type `Basic Traffic Splitting`.
5.  Set up an origin configuration for the Simple Performance site.

    1.  From the **Origins** section, set the **Name** option to `simple-site`.
    2.  Set the **Origin Hostname** option to `edgio-community-examples-v7-simple-performance-live.edgio.link`.
    3.  Set the **Override Host Header** option to `edgio-community-examples-v7-simple-performance-live.edgio.link`.

    Your new property configuration should now look like this:
    
    ![Create Property - Simple site - origin configuration](/images/v7/experimentation/basic-traffic-splitting-origins-1.png)

6.  Set up an origin configuration for the Full-Featured Performance site.

    1.  Click **+ Add Origin**.
    2.  Set the **Name** option to `full-featured-site`.
    3.  Set the **Origin Hostname** option to `edgio-community-examples-v7-full-featured-perfor-f74158.edgio.link`.
    4.  Set the **Override Host Header** option to `edgio-community-examples-v7-full-featured-perfor-f74158.edgio.link`.

    Your new origin configuration should now look like this:
    
    ![Create Property - Full-Featured site - origin configuration](/images/v7/experimentation/basic-traffic-splitting-origins-2.png)

7.  Click **Create Property**. {{ PRODUCT }} will now create a property whose Production environment contains two origin configurations that point to our sample Performance websites. After which, it will automatically deploy this configuration. 

## Create Rule {/*create-rule*/}

Set up a rule that delivers a custom web page that allows you to select the variant that will be loaded.

1.  Navigate to the **Rules** page.
2.  Click **+ Add Rule**.
3.  Add a Path match condition for `/experiment-selection`.

    1.  Click **+ Add** and then select **Add Condition**.

        ![Rules - Add condition](/images/v7/experimentation/basic-traffic-splitting-rules-add-condition.png)

    2.  From the **Variable** option, select `Path`.
    3.  Verify that the **Operator** option is set to `matches (simple)`.
    4.  Set the **Match Value** option to `/experiment-selection`.

        Your configuration should now look like this:

        ![Rules - Path](/images/v7/experimentation/basic-traffic-splitting-rules-path.png)

    5.  Click **Add Condition**.

4.  Add a Set Response Body feature for the custom web page.

    1.  Click **+ Add** and then select **Add Feature**.
    2.  Select `Set Response Body`.
    3.  In the **Response Body** option, paste the following:

        ```html
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Experimentation - Variant Selector</title><style>body{font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu}h2{font-size:24px;line-height:28px;font-weight:600;margin-top:50px}label,p{font-size:16px;line-height:26px;font-weight:400;overflow:auto}code{font-size:15px;line-height:25px;font-weight:500;text-decoration:none;padding:0 4px;border-radius:4px;background:#f6f9fc;border:1px solid var(--inline-code-border-color);font-variant-ligatures:none;margin:0;text-align:left;box-decoration-break:clone}button{margin-top:15px;padding:8px;border-radius:3px;display:flex;-moz-box-align:center;align-items:center;gap:8px;font-family:"Inter",sans-serif;font-size:14px;font-weight:600;color:#000;background:linear-gradient(90deg,#00bda6 0%,#00a2e2 100%)}.center{margin:auto;width:60%;padding:10px}</style>
        </head>
        <body>
            <div class="center">
                <h2>Experimentation - Variant Selector</h2>
                <p>The purpose of this page is to demonstrate a sample implementation of Experimentation. This experiment contains the following two variants:
                </p>
                <ul>
                    <li><b>Simple Site:</b> This site is loaded when the <code>x-edg-experiments</code> cookie is set to a value from 1 to 89.
                    </li>
                    <li><b>Full-Featured Site:</b> This site is loaded when the <code>x-edg-experiments</code> cookie is set to a value from 90 to 99.
                    </li>
                </ul>
             
                <p>
                Choose a variant or set this cookie to a specific value.
                </p>
                <label>
                    <input type="radio" name="experimentOption" value="20" checked> Load the Simple site (<code>x-edg-experiments = 20</code>)
                </label><br>
                <label>
                    <input type="radio" name="experimentOption" value="90"> Load the Full-Featured site (<code>x-edg-experiments = 90</code>)
                </label><br>
                <label>
                    <input type="radio" name="experimentOption" value="custom"> Set the <code>x-edg-experiments</code> cookie to:
                    <input type="text" id="customValue" placeholder="1 - 99"  maxlength="2" size="2">
                </label><br>
                <button onclick="setExperimentAndLoad()" type="button">Load Variant</button>

                <h2>How Does It Work?</h2>

                <p>This page loads a specific variant by setting the <code>x-edg-experiments</code> cookie and then reloading the page. 
                </p>
                <p><b>More Information:</b>
                <p>The <code>x-edg-experiments</code> cookie is a HttpOnly cookie. This means that it cannot be set through a client-side script. Rather, it must be set through the Set-Cookie response header. As a result, we set this cookie upon clicking <b>Load Variant</b> and then we reload the page so that the client may submit a request with the updated cookie. Edgio will then respond with the variant that corresponds to that cookie value.    
                </p>
            </div>
            <script>
                function setExperimentAndLoad() {
                    var selectedOption = document.querySelector('input[name="experimentOption"]:checked').value;
                    var customValue = document.getElementById("customValue").value;

                    // Set the experiment query string parameter based on the selected option
                    var url = "https://edgio-community-examples-entry.glb.edgio.link/";
                    if (selectedOption === "custom" && customValue.trim() !== "") {
                        url += "?experiment=" + encodeURIComponent(customValue);
                    } else {
                        url += "?experiment=" + encodeURIComponent(selectedOption);
                    }

                    var win = window.open(url, '_blank');
                    
                    win.addEventListener('load', function() {
                        debugger;
                        win.location.reload();
                    })
                }
            </script>
        </body>
        </html>
        ```

    4.  Click **Add Feature**.
    
5.  Add a Set Done feature to prevent requests to `/experiment-selection` from being proxied to the origin.

    1.  Click **+ Add** and then select **Add Feature**.
    2.  Select `Set Done`.
    3.  Click **Add Feature**.
    
    Your rule should now look like this:
    
    ![Rules page](/images/v7/experimentation/basic-traffic-splitting-rule.png)

## Create Experiment {/*create-experiment*/}

Set up an experiment that sends 90% of traffic to the Simple site and the remaining 10% of traffic to the Full-Featured site.

1.  Navigate to the **Experimentation** page.
2.  Click **+ Add Experiment**.
3.  Set the **Name** option to `Basic Traffic Splitting`.
4.  Add a criteria that excludes requests to `/experiment-selection` from this experiment. 

    1.  Click **+ Add Criteria**.
    2.  From the **Variable** option, select `Path`.
    3.  Set the **Operator** option to `does not match (simple)`.
    4.  Set the **Match Value** option to `/experiment-selection`.
    
        Your configuration should now look like this:

        ![Experimentation - Path condition](/images/v7/experimentation/basic-traffic-splitting-experimentation-path-condition.png)

    5.  Click **Add Condition**.

5.  Define a variant that sends 90% of traffic to the Simple site.

    1.  Set the **Name** option to `Simple Site`.
    2.  Set the **Percentage** option to `90`.
    3.  Click **+ Add Action**.
    4.  Select `Set Origin`.
    5.  From the **Origin Name** option, select `simple-site`.

        Your configuration should now look like this:

        ![Experimentation - Set Origin](/images/v7/experimentation/basic-traffic-splitting-experimentation-set-origin.png)

    6.  Click **Add Feature**.

5.  Define a variant that sends 90% of traffic to the Simple site.

    1.  Set the **Name** option to `Full Featured Site`.
    2.  Set the **Percentage** option to `10`.
    3.  Click **+ Add Action**.
    4.  Select `Set Origin`.
    5.  From the **Origin Name** option, select `full-featured-site`.
    6.  Click **Add Feature**.
    
6.  Click **Deploy Changes**. When prompted, click **Deploy Changes** to confirm the deployment.

## Experiment {/*experiment*/}

Congratulations on setting up an experiment. You can now test this experiment by either:
-   Loading the site normally. Click on the deployment's URL.

    ![Experimentation - Deployment URL](/images/v7/experimentation/basic-traffic-splitting-deployment-url.png)

    <Callout type="info">

    The variant assigned to a client persists until cookies are cleared. This means that testing this experiment may require clearing your cookies various times or initiating various distinct private browsing sessions. 

    </Callout>

-   Loading the custom web page (Experimentation - Variant Selector) that was defined within your rule. Append `/experiment-selection` to the deployment's URL.

    **Sample URL:**
    
    `https://edgio-community-examples-entry.glb.edgio.link/experiment-selection`