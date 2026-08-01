# Zee Links Video Downloader Backend

This is the server-side API layer for the Video Downloader UI.

## What it does

- Provides `/health`
- Provides `POST /api/analyze`
- Validates URLs
- Handles CORS and security headers
- Forwards a URL to a separately configured downloader engine

## Why the extraction engine is separate

Firebase Hosting serves static files and is not a persistent Node/Python process. Platform media extraction should therefore run on a suitable backend service.

Set:

```text
DOWNLOAD_ENGINE_URL=https://YOUR-BACKEND-ENGINE/api/analyze
```

The engine should return JSON containing a title and available downloadable formats.

## Important

Only use the downloader with media you have permission to download and in compliance with the relevant platform's terms and applicable law.


## Frontend connection
After deploying this API, configure the downloader page with `window.ZEE_LINKS_DOWNLOADER_API` pointing to the API origin (for example, `https://your-api.example.com`). The frontend remains hosted on the Zee Links Firebase/custom-domain site.
