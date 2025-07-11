import express from "express";
import { createShortUrl, redirectToOriginal, getUrlStats } from "../controllers/urlController.js";

const router = express.Router();

router.post("/shorturls", createShortUrl);
router.get("/shorturls/:code", getUrlStats);
router.get("/:code", redirectToOriginal);

export default router;
