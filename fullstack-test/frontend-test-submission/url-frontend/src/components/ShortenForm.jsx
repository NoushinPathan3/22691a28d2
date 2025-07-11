import React, { useState } from "react";
import axios from "axios";
import "./ShortenForm.css";

function ShortenForm() {
  const [url, setUrl] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowResult(false);
    try {
      const res = await axios.post("http://localhost:5000/shorturls", { url });
      setShortLink(res.data.shortLink);
      setExpiry(res.data.expiry);
      setShowResult(true);
      setUrl("");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <div className="card hover-glow">
      <h2> URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste your long URL here" required />
        <button type="submit" disabled={loading}>
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>
      {showResult && (
        <div className="result fade-in">
          <p>Short Link:</p>
          <a href={shortLink} target="_blank" rel="noreferrer">
            {shortLink}
          </a>
          <p> Expires at: {new Date(expiry).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

export default ShortenForm;