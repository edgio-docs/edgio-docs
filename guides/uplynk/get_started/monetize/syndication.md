---
title: Syndication
---

Our Syndication product allows you to distribute your live or virtual live content simultaneously to multiple social media and content distribution platforms, such as YouTube, with minimal effort. By setting up publishing targets, you can configure your streams to be pushed or pulled using various protocols, including HLS-Pull for platforms that support this method. This feature ensures that your content reaches a wider audience across different platforms without the need for multiple streams. Additionally, our Syndication product supports the insertion of SCTE-35 markers to indicate where ads should be placed, enabling better ad management and monetization.

## Use Cases  {/*syndication-use-cases*/}

### 1. Expand Audience Reach  {/*expand-audience-reach*/}

**Objective:** Increase the visibility of your live content by broadcasting simultaneously on YouTube.

**Scenario:** You want to reach a broader audience by streaming live events on YouTube in addition to your native platform. This helps in engaging with YouTube's vast user base, gaining new followers, and promoting your content more effectively.

### 2. Diversify Distribution with HLS-Pull  {/*diversify-distribution*/}

**Objective:** Stream your content on multiple FAST platforms using HLS-Pull.

**Scenario:** You aim to distribute your live stream across various FAST platforms that support HLS-Pull, such as Samsung TV Plus or Pluto TV. Syndication Publishing supports SCTE-35 markers, allowing you to indicate where ads should be placed within your content. This approach ensures better ad management and monetization opportunities while reaching different audience segments across multiple streaming services.

### 3. Monetize and Engage  {/*monetize-and-engage*/}

**Objective:** Leverage YouTube’s monetization features.

**Scenario:** You want to monetize live streams through YouTube’s advertising and super chat features. By streaming directly to YouTube, you can access these monetization tools while engaging with viewers through YouTube's interactive features like live chat.

## Set Up a YouTube Publishing Target  {/*set-up-youtube-publishing-target*/}

1. **Contact Account Manager:** Ensure Syndication Publishing is activated by contacting your account manager.

2. **Create a Publishing Target**
   - Navigate to **Settings** > **Publishing**.
   - Click **+ New Target** to open the Add Publishing Target dialog box.
   - Assign a unique name to the new publishing target under Target Name.
   - Select **YouTube** from the Platform options.

3. **Authenticate** via one of these methods:
   - **Stream Key:**
     - Obtain your stream key from YouTube's live streaming settings.
     - Paste the stream key into the Stream Key option.

   - **Integrated Authentication**
     - Ensure you have a Clipping profile with YouTube integration.
     - Enable the YouTube Integrated Authentication option.
     - Select the appropriate Clipping profile for authentication.

4. **Save and Validate**
     - Click **Save**.
     - The service will validate the stream key or credentials and attempt to connect to YouTube. Verify and correct any errors if the connection fails.

5. **Configure Stream Details**:  (Integrated Authentication Only): Set the video title, description, privacy level, and audience (for kids or not) within the YouTube options on the Publish tab.

## Set Up HLS Pull  {/*set-up-hls-pull*/}

1. **Create a Publishing Target**
   - Navigate to **Settings** > **Publishing**.
   - Click **+ New Target** to open the Add Publishing Target dialog box.
   - Assign a unique name to the new publishing target under Target Name.
   - Select **Custom** from the Platform options.
   - Choose **HLS** from the Protocol options.
   - Ensure the Stream URI is correctly set for HLS-Pull.

2. **Start Publishing**
   - Navigate to the **Publish** tab of the desired live channel or live event.
   - Click **Add Target** and select the HLS-Pull publishing target.
   - Start slicing content to your live channel or event.
   - Mark the rays to be published and set the video quality.

3. **Configure Social Media Platform**
   - Once the HLS-Pull target is active, copy the HLS Master URL.
   - Configure the desired social media or content distribution platform (e.g., YouTube) to pull the HLS stream using the copied URL.

4. **Manage and Monitor**
   - Monitor the status of your publishing targets (active, stopped, scheduled, error).
   - Adjust stream quality and other settings as needed.
   - Stop or modify publishing as necessary through the Publish tab.

By following these steps, you can effectively distribute your live streaming content to YouTube and other platforms using HLS-Pull, enhancing your audience reach and ensuring reliable streaming performance.

## More Information  {/*more-information*/}

View detailed [instructions and options on syndication and publishing](/uplynk/monetize/syndication).
