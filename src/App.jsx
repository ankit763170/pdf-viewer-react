import React, { useRef, useEffect } from "react";
import {
  RPConfig,
  RPProvider,
  RPDefaultLayout,
  RPPages,
} from "@pdf-viewer/react";
// import "@pdf-viewer/react/style.css";

const App = () => {
  const highlightRef = useRef(null);

  const handleReferenceClick = (ref) => {
    if (ref === 3) {
      // Scroll to roughly where the text should be on the PDF (simulate "Page 15" behavior)
      const viewer = document.querySelector(".rpv-default-layout__viewer");
      if (viewer) viewer.scrollTo({ top: 1000, behavior: "smooth" });

      // Remove existing highlight if any
      if (highlightRef.current) {
        highlightRef.current.remove();
        highlightRef.current = null;
      }

      // Add a yellow overlay highlight
      const overlay = document.createElement("div");
      Object.assign(overlay.style, {
        position: "absolute",
        top: "50%",
        left: "10%",
        width: "80%",
        height: "30px",
        backgroundColor: "yellow",
        opacity: 0.6,
        zIndex: 20,
        borderRadius: "4px",
        pointerEvents: "none",
        textAlign: "center",
        fontWeight: "bold",
        color: "black",
        lineHeight: "30px",
        fontSize: "13px",
      });
      overlay.textContent = "Gain on sale of non-current assets, etc., net 25 (208)";
      highlightRef.current = overlay;

      const pdfArea = document.querySelector(".rpv-core__viewer");
      if (pdfArea) pdfArea.appendChild(overlay);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* ===== Left: PDF Viewer ===== */}
      <div style={{ flex: 1, borderRight: "1px solid #ccc" }}>
        <RPConfig>
          <RPProvider src="/mark.pdf">
            <RPDefaultLayout style={{ height: "100vh" }}>
              <RPPages />
            </RPDefaultLayout>
          </RPProvider>
        </RPConfig>
      </div>

      {/* ===== Right: Analysis Section ===== */}
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <h2>Analysis</h2>
        <p>
          No extraordinary or one-off items affecting EBITDA were reported in
          Maersk’s Q2 2025 results. The report explicitly notes that EBITDA
          improvements stemmed from operational performance — including volume
          growth, cost control, and margin improvement across Ocean, Logistics &
          Services, and Terminals segments{" "}
          <span
            onClick={() => handleReferenceClick(1)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            [1]
          </span>
          <span
            onClick={() => handleReferenceClick(2)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            [2]
          </span>
          . Gains or losses from asset sales, which could qualify as
          extraordinary items, are shown separately under EBIT and not included
          in EBITDA. The gain on sale of non-current assets was USD 25m in Q2
          2025, significantly lower than USD 208m in Q2 2024, but these affect
          EBIT, not EBITDA{" "}
          <span
            onClick={() => handleReferenceClick(3)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            [3]
          </span>
          . Hence, Q2 2025 EBITDA reflects core operating activities without
          one-off extraordinary adjustments.
        </p>

        <h3>Findings</h3>
        <p>
          <strong>Page 3 — Highlights Q2 2025:</strong> EBITDA increase (USD 2.3
          bn vs USD 2.1 bn prior year) attributed to operational improvements;
          no mention of extraordinary or one-off items.{" "}
          <span
            onClick={() => handleReferenceClick(1)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            [1]
          </span>
        </p>
        <p>
          <strong>Page 5 — Review Q2 2025:</strong> EBITDA rise driven by higher
          revenue and cost control across all segments; no extraordinary gains
          or losses included.{" "}
          <span
            onClick={() => handleReferenceClick(2)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            [2]
          </span>
        </p>
        <p>
          <strong>Page 15 — Condensed Income Statement:</strong> Gain on sale of
          non-current assets USD 25m (vs USD 208m prior year) reported
          separately below EBITDA; therefore, not part of EBITDA.{" "}
          <span
            onClick={() => handleReferenceClick(3)}
            style={{ color: "blue", cursor: "pointer" }}
          >
            [3]
          </span>
        </p>
      </div>
    </div>
  );
};

export default App;
