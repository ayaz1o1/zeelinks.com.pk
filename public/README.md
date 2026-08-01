# Zee Links Website — Completed Baseline

This is the completed baseline built from the supplied `zeelinks2.com.pk-main.zip`.

## Firebase migration
Copy the contents of this project into your existing Firebase repository's `public/` directory.
Keep the existing repository-level `firebase.json`, `.firebaserc`, and `.github/workflows/` files unchanged.

## Included
- Current Zee Links homepage design preserved
- Local logo and favicon
- Local placeholder SVG artwork for all referenced homepage images (no broken image paths)
- Products and Portfolio pages
- Privacy Policy and Terms pages
- Manifest, robots.txt and sitemap.xml
- Functional CCTV Storage, PoE, IPv4/CIDR, Bandwidth and Password tools
- QR generator
- Offline starter MAC vendor lookup
- Video Downloader page with direct-media download support and a clear backend hook requirement for platform URLs
- Safer/null-safe JavaScript and WhatsApp enquiry flow

## Important
A browser-only Firebase Hosting page cannot reliably extract/download protected streams from YouTube, Facebook, TikTok and similar services. Those URLs require a server-side downloader/API. The Video Downloader page is therefore intentionally honest about that limitation rather than pretending a client-side button can bypass it.


## Video Downloader integration
The original supplied Zee Links Downloader frontend has been integrated at `tools/video-downloader/`. The uploaded ZIP contains frontend-only code; platform extraction/download requires a server-side backend/API. Direct media URLs can be opened/downloaded in-browser. No credentials or backend code were invented.
