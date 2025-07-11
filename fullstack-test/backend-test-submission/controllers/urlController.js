import Url from "../models/url.js";
import { nanoid } from "nanoid";

export async function createShortUrl(req, res) {
  const { url, validity, shortcode } = req.body;
  if (!url) return res.status(400).json({ message: "URL is required." });

  const minutes = validity || 30;
  const expiry = new Date(Date.now() + minutes * 60000);

  let code = shortcode;
  if (shortcode) {
    if (!/^[a-zA-Z0-9]{3,10}$/.test(shortcode)) {
      return res.status(400).json({ message: "Shortcode must be alphanumeric and 3-10 characters." });
    }
    const exists = await Url.findOne({ shortcode });
    if (exists) return res.status(400).json({ message: "Shortcode already exists." });
  } else {
    do {
      code = nanoid(6);
    } while (await Url.findOne({ shortcode: code }));
  }

  const newUrl = new Url({ originalUrl: url, shortcode: code, expiry });
  await newUrl.save();

  return res.status(201).json({
    shortLink: `${process.env.HOST}/${code}`,
    expiry: expiry.toISOString(),
  });
}

export async function redirectToOriginal(req, res) {
  const { code } = req.params;
  const url = await Url.findOne({ shortcode: code });
  if (!url) return res.status(404).json({ message: "Not found." });
  if (new Date() > url.expiry) return res.status(410).json({ message: "Expired." });

  url.totalClicks += 1;
  url.clicks.push({
    referrer: req.get("Referrer") || "Direct",
    location: "Unknown",
  });
  await url.save();

  return res.redirect(url.originalUrl);
}

export async function getUrlStats(req, res) {
  const { code } = req.params;
  const url = await Url.findOne({ shortcode: code });
  if (!url) return res.status(404).json({ message: "Not found." });

  res.json({
    originalUrl: url.originalUrl,
    createdAt: url.createdAt,
    expiry: url.expiry,
    totalClicks: url.totalClicks,
    clicks: url.clicks,
  });
}
