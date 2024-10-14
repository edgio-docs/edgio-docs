---
title: Encoding Profiles
---

An encoding profile determines the audio/video quality for live and on-demand content encoded by Live Slicers and Slicers. For example, it determines the resolution for each ray generated from your video. The available encoding profiles are listed below.

| Profile<br />*\{Resolution\}*<br />*\{FPS\}* | Maximum Resolution | Video Compression | GPU<br />(Live) | GPU<br />(VOD) | B-frame | IFO |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| UHD 2160p50/60<br />HDR Optional | 3840x2160 | HEVC | Required | Required | \* | \* |
| UHD 2160p25/30<br />HDR Optional | 3840x2160 | HEVC | Required | Required | \* | \* |
| HD 1080p50/60 | 1920x1080 | AVC | Required | Recommended | \* | \* |
| HD 1080p25/30 | 1920x1080 | AVC |   |   | \* | \* |
| HD 720p50/60 | 1280x720 | AVC | Recommended | Recommended | \* | \* |
| HD 720p25/30<br />Default Profile | 1280x720 | AVC |   |   | \* | \* |
| SD 480p25/30 | 854x480 | AVC |   |   | \* | \* |

<Tip>You may add support for multiple encoding profiles to your account. Contact your account manager to either add an encoding profile or upgrade an existing one.</Tip>

<Important>A 4K UHD encoding profile requires GPU hardware (e.g., Nvidia Tesla T4 GPU) and the latest video drivers (e.g., Linux x86_64 driver version 418.39 or higher).</Important>
