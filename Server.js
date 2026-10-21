
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "TikSave API",
    status: "online",
    message: "Backend berhasil berjalan!"
  });
});

app.post("/api/video", (req, res) => {
  const { url } = req.body || {};

  if (typeof url !== "string") {
    return res.status(400).json({
      error: "Link video wajib diisi."
    });
  }

  try {
    const videoUrl = new URL(url);

    if (
      videoUrl.protocol !== "https:" ||
      !/(^|\.)tiktok\.com$/i.test(videoUrl.hostname)
    ) {
      return res.status(400).json({
        error: "Link TikTok tidak valid."
      });
    }

    res.json({
      success: true,
      message: "Link berhasil divalidasi!",
      url: videoUrl.href,
      downloadReady: false
    });

  } catch (error) {
    res.status(400).json({
      error: "Format link tidak valid."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`TikSave API berjalan di port ${PORT}`);
});
