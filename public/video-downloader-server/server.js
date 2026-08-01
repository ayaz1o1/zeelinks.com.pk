import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const port = Number(process.env.PORT || 8080);
const allowed = (process.env.ALLOWED_ORIGINS || "")
  .split(",").map(s => s.trim()).filter(Boolean);

app.use(helmet());
app.use(express.json({ limit: "32kb" }));
app.use(cors({
  origin(origin, cb) {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    return cb(new Error("Origin not allowed"));
  }
}));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "zee-links-video-downloader" });
});

app.post("/api/analyze", async (req, res) => {
  const url = String(req.body?.url || "").trim();

  if (!/^https?:\/\//i.test(url)) {
    return res.status(400).json({ error: "Please provide a valid http/https URL." });
  }

  /*
   * IMPORTANT:
   * The actual media extraction engine is intentionally not bundled here.
   * A production downloader needs a server-side extraction service/engine.
   *
   * Set DOWNLOAD_ENGINE_URL to your own trusted service and have it return:
   * {
   *   "title": "...",
   *   "thumbnail": "...",
   *   "formats": [
   *      {"label":"720p","url":"https://...","ext":"mp4","size":12345678}
   *   ]
   * }
   */
  if (!process.env.DOWNLOAD_ENGINE_URL) {
    return res.status(501).json({
      error: "Downloader engine is not configured yet.",
      message: "The Zee Links frontend and API are ready; connect a server-side extraction engine to enable platform URL downloads."
    });
  }

  try {
    const response = await fetch(process.env.DOWNLOAD_ENGINE_URL, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({ url })
    });

    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { raw: text }; }

    if (!response.ok) {
      return res.status(502).json({ error: "Downloader engine returned an error.", details: data });
    }

    return res.json(data);
  } catch (err) {
    return res.status(502).json({
      error: "Unable to reach downloader engine.",
      details: String(err?.message || err)
    });
  }
});

if (allowed.length === 0) {
  console.warn("ALLOWED_ORIGINS is empty. Configure it before production deployment.");
}

app.listen(port, () => {
  console.log(`Zee Links downloader API listening on port ${port}`);
});
