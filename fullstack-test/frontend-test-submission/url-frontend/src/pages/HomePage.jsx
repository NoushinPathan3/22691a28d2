import React from "react";
import ShortenForm from "../components/ShortenForm";

function HomePage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      <ShortenForm />
    </div>
  );
}

export default HomePage;
