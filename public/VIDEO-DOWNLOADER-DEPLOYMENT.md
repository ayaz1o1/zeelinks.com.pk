# Video Downloader deployment

The Zee Links website remains static and can stay on Firebase Hosting.

The downloader backend is in:

`video-downloader-server/`

Deploy that backend to a Node-capable server/container service. Then set the frontend API base URL in `tools/video-downloader/index.html`:

```js
const API_BASE = "https://YOUR-DOWNLOADER-BACKEND.example.com";
```

Or define `window.ZEE_LINKS_DOWNLOADER_API` before that script.

The backend expects a separate trusted extraction engine through `DOWNLOAD_ENGINE_URL`.

Do not place server secrets in the Firebase frontend.
