"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Coordonnées en pourcentage (x%, y%) — viewBox "0 0 100 150"
// Recalibrées d'après les cartes colorées nord/sud
const nations = [
  {
    id: "mitsurin",
    name: "Mitsurin",
    href: "/nations/mitsurin",
    color: "#0fea08",
    points: [
      [17.2,17.2], [12.2,26.1], [15.1,34.1], [22.0,45.6], [18.4,55.8], [22.8,57.6], [31.3,57.7], [42.5,62.8], [50.2,64.9], [53.5,61.1], [48.0,56.5], [56.3,50.9], [57.8,44.0], [57.1,39.1], [52.5,34.9], [43.4,26.0], [32.1,16.7],
    ],
  },
  {
    id: "dakurodo",
    name: "Dakurodo",
    href: "/nations/dakurodo",
    color: "#0a0403",
    points: [
      [56.2,33.6], [63.1,29.2], [62.3,24.4], [67.9,18.7], [75.1,17.5], [85.3,20.8], [97.5,20.8], [99.8,20.5], [99.8,52.5], [87.3,53.2], [80.7,47.9], [78.1,47.1], [73.8,44.5], [71.8,45.6], [72.3,49.4], [70.0,51.5], [77.1,53.2], [78.9,56.3], [74.8,60.8], [72.0,64.2], [53.9,61.1], [52.1,56.1], [58.8,49.2], [59.5,39.7],
    ],
  },
  {
    id: "tengoku",
    name: "Tengoku",
    href: "/nations/tengoku",
    color: "#a0a3a3",
    points: [
      [73.0,36.9], [73.6,41.0], [76.9,41.7], [82.2,44.3], [87.8,45.0], [91.9,41.0], [92.7,36.4], [88.6,33.3], [84.8,34.8], [82.5,35.6], [80.2,35.6],
    ],
  },
  {
    id: "alakasham",
    name: "Alakasham",
    href: "/nations/alakasham",
    color: "#e6c532",
    points: [
      [20.1,80.3], [23.9,89.0], [27.6,87.5], [39.6,89.7], [43.6,92.7], [51.9,93.6], [56.1,93.3], [56.6,89.4], [48.8,78.6], [32.6,77.1],
    ],
  },
  {
    id: "thogdur",
    name: "Thogdur",
    href: "/nations/thogdur",
    color: "#3b6e0a",
    points: [
      [14.1,87.7], [23.3,89.2], [27.6,88.0], [39.6,90.1], [43.2,92.7], [42.2,97.9], [38.4,96.6], [36.8,97.4], [34.3,100.4], [31.5,101.6], [27.9,101.5], [22.5,103.5], [21.3,103.8], [17.9,100.7], [15.9,102.2], [12.8,99.6],
    ],
  },
  {
    id: "hokkaido",
    name: "Hokkaido",
    href: "/nations/hokkaido",
    color: "#cf72f4",
    points: [
      [24.4,112.4], [21.5,120.5], [16.0,120.8], [3.7,113.0], [0.6,106.4], [0.6,91.6], [1.8,86.5], [9.6,84.8], [14.0,87.5], [13.4,89.9], [12.6,99.4], [14.6,105.7], [18.7,108.5],
    ],
  },
  {
    id: "ipulos-tacderen",
    name: "Ipulos Tacderen",
    href: "/nations/ipulos-tacderen",
    color: "#747171",
    points: [
      [32.0,108.7], [35.5,110.9], [39.1,110.9], [39.6,113.0], [42.4,115.7], [39.4,117.8], [44.7,119.0], [47.5,122.3], [49.6,125.0], [53.2,129.2], [52.4,131.3], [49.3,132.1], [48.0,134.4], [46.8,136.5], [44.5,138.5], [40.1,135.2], [37.6,133.4], [38.6,131.6], [35.3,128.2], [32.0,128.4], [27.6,126.5], [22.5,125.7], [20.5,122.5], [22.3,119.9], [23.6,117.5], [24.8,112.7], [26.6,109.1], [31.2,106.8],
    ],
  },
  {
    id: "arcabios",
    name: "Arcabios",
    href: "/nations/arcabios",
    color: "#ef4444",
    points: [
      [42.6,115.4], [55.3,115.4], [61.3,119.5], [67.1,119.8], [70.8,124.7], [67.1,129.6], [57.3,135.2], [47.2,139.6], [45.5,139.3], [47.5,135.2], [53.8,131.2], [54.4,127.8],
    ],
  },
  {
    id: "asdorath",
    name: "Asdorath",
    href: "/nations/asdorath",
    color: "#eb8628",
    points: [
      [76.9,92.7], [56.2,93.6], [52.9,96.8], [53.4,102.9], [55.2,107.5], [56.7,111.5], [65.4,114.8], [73.6,121.0], [80.4,123.3], [86.1,116.2], [89.1,110.7], [88.4,107.7], [92.2,105.7], [90.7,101.1], [85.3,96.5], [79.4,96.5],
    ],
  },
  {
    id: "solarsen",
    name: "Solarsen",
    href: "/nations/solarsen",
    color: "#f59e0b",
    points: [
      [83.5,121.1], [86.1,116.5], [95.0,119.9], [92.7,126.0], [94.1,130.0], [86.7,136.9], [82.9,135.7], [80.6,131.1], [82.0,127.1], [80.6,123.3],
    ],
  },
  {
    id: "zone-ombre",
    name: "Zone d'Ombre",
    href: "/nations/zone-ombre",
    color: "#6b7280",
    points: [
      [31.8,56.9], [25.8,62.3], [19.1,64.3], [18.8,73.2], [20.1,81.0], [22.8,80.1], [24.7,78.2], [35.8,77.5], [48.9,79.0], [54.1,85.5], [58.1,93.2], [68.0,91.1], [75.2,86.7], [78.3,83.8], [82.9,82.5], [82.7,75.5], [80.7,74.9], [80.2,70.8], [76.4,68.6], [72.4,65.0], [54.4,62.4], [52.2,64.3], [46.7,64.4], [44.7,63.3], [42.6,63.6],
    ],
  },
];

function pointsToSvgPolygon(points: number[][]) {
  return points.map(([x, y]) => `${x},${y}`).join(" ");
}

export default function CarteduMondePage() {
  const [hoveredNation, setHoveredNation] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <main className="carte-page">
      {/* ── Lightbox agrandissement ── */}
      {lightboxOpen && (
        <div
          className="lightbox-overlay"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Carte agrandie"
        >
          <button
            className="lightbox-close"
            onClick={() => setLightboxOpen(false)}
            aria-label="Fermer"
          >
            ✕
          </button>
          <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
            <Image
              src="/new-carte.png"
              alt="Carte d'Izaria agrandie"
              width={900}
              height={1350}
              className="lightbox-img"
              priority
            />
          </div>
        </div>
      )}

      <div className="page-container">
        {/* ── Titre ── */}
        <header className="page-header">
          <h1 className="page-title">Carte du Monde</h1>
          <p className="page-subtitle">Izaria</p>
        </header>

        {/* ── Avant / Après ── */}
        <section className="comparison-section">
          <div className="comparison-grid">
            {/* Ancienne carte */}
            <div className="map-card old-map">
              <span className="map-label">Ancienne carte du monde</span>
              <div className="map-img-wrapper">
                <Image
                  src="/old-carte.png"
                  alt="Ancienne carte du monde d'Izaria"
                  width={400}
                  height={560}
                  className="map-static-img"
                />
              </div>
            </div>

            {/* Flèche */}
            <div className="arrow-container" aria-hidden="true">
              <svg viewBox="0 0 80 40" className="arrow-svg">
                <defs>
                  <linearGradient id="arrowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8b6914" />
                    <stop offset="100%" stopColor="#d4a017" />
                  </linearGradient>
                </defs>
                <polygon
                  points="0,12 52,12 52,2 78,20 52,38 52,28 0,28"
                  fill="url(#arrowGrad)"
                />
              </svg>
            </div>

            {/* Nouvelle carte interactive */}
            <div className="map-card new-map">
              <span className="map-label">Nouvelle carte du monde</span>
              <div className="map-img-wrapper interactive-map-wrapper">
                {/* Image de fond */}
                <Image
                  src="/new-carte.png"
                  alt="Nouvelle carte du monde d'Izaria"
                  width={400}
                  height={600}
                  className="map-static-img"
                  onClick={() => setLightboxOpen(true)}
                  style={{ cursor: "zoom-in" }}
                />

                {/* SVG overlay zones cliquables */}
                <svg
                  className="nation-overlay"
                  viewBox="0 0 100 150"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Carte interactive des nations d'Izaria"
                >
                  {nations.map((nation) => (
                    <Link key={nation.id} href={nation.href}>
                      <polygon
                        points={pointsToSvgPolygon(nation.points)}
                        fill={nation.color}
                        fillOpacity={hoveredNation === nation.id ? 0.45 : 0}
                        stroke={nation.color}
                        strokeWidth={hoveredNation === nation.id ? 0.4 : 0.15}
                        strokeOpacity={hoveredNation === nation.id ? 0.9 : 0.3}
                        onMouseEnter={() => setHoveredNation(nation.id)}
                        onMouseLeave={() => setHoveredNation(null)}
                        style={{ cursor: "pointer", transition: "fill-opacity 0.2s, stroke-width 0.2s" }}
                        role="link"
                        aria-label={`Aller à la page de ${nation.name}`}
                      />
                    </Link>
                  ))}
                </svg>

                {/* Tooltip nation au hover */}
                {hoveredNation && (
                  <div className="nation-tooltip">
                    <span className="tooltip-name">
                      {nations.find((n) => n.id === hoveredNation)?.name}
                    </span>
                    <span className="tooltip-hint">Cliquer pour explorer →</span>
                  </div>
                )}

                {/* Hint zoom */}
                <div className="zoom-hint">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/>
                  </svg>
                  Cliquez sur la carte pour agrandir
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Légende ── */}
        <section className="legend-section">
          <div className="legend-scroll">
            <p className="legend-text">
              Izaria est une planète qui abrite de nombreuses nations dont certaines que nous connaissons.
              La taille du monde connu est d&apos;environ <strong>2&apos;200 km</strong> d&apos;est en ouest
              et d&apos;environ <strong>5&apos;000 km</strong> du nord au sud.
            </p>
            <p className="legend-hint">
              Survolez les nations sur la nouvelle carte pour les identifier, et cliquez pour accéder à leur page.
              Cliquez sur la carte pour l&apos;agrandir.
            </p>
          </div>

          {/* Grille nations */}
          <div className="nations-grid">
            {nations.map((nation) => (
              <Link
                key={nation.id}
                href={nation.href}
                className="nation-chip"
                style={{ "--nation-color": nation.color } as React.CSSProperties}
              >
                <span className="nation-dot" />
                {nation.name}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        /* ── Base ── */
        .carte-page {
          min-height: 100vh;
          background: #f5f0e8;
          font-family: Georgia, "Times New Roman", serif;
          color: #2c1e0f;
        }

        .page-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem;
        }

        /* ── Header ── */
        .page-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .page-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #2c1e0f;
          margin: 0 0 0.25rem;
          text-shadow: 1px 2px 4px rgba(0,0,0,0.12);
        }

        .page-subtitle {
          font-size: 1.1rem;
          color: #8b6914;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          margin: 0;
        }

        /* ── Comparison ── */
        .comparison-section {
          margin-bottom: 2.5rem;
        }

        .comparison-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 1.5rem;
          align-items: center;
        }

        @media (max-width: 700px) {
          .comparison-grid {
            grid-template-columns: 1fr;
          }
          .arrow-container {
            transform: rotate(90deg);
            width: 60px;
            margin: 0 auto;
          }
        }

        /* ── Map cards ── */
        .map-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .map-label {
          font-size: 0.85rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #7a5c2e;
          background: rgba(139, 105, 20, 0.1);
          border: 1px solid rgba(139, 105, 20, 0.25);
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
        }

        .map-img-wrapper {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25),
                      0 0 0 2px rgba(139, 105, 20, 0.3);
          transition: box-shadow 0.2s;
        }

        .map-img-wrapper:hover {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35),
                      0 0 0 2px rgba(212, 160, 23, 0.6);
        }

        .map-static-img {
          display: block;
          width: 100%;
          height: auto;
          max-width: 380px;
        }

        /* ── Interactive map overlay ── */
        .interactive-map-wrapper {
          cursor: default;
        }

        .nation-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: all;
        }

        /* ── Nation tooltip ── */
        .nation-tooltip {
          position: absolute;
          bottom: 0.75rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(20, 12, 4, 0.85);
          color: #f5e6c8;
          border: 1px solid rgba(212, 160, 23, 0.5);
          border-radius: 6px;
          padding: 0.4rem 0.9rem;
          text-align: center;
          pointer-events: none;
          backdrop-filter: blur(4px);
          white-space: nowrap;
          z-index: 10;
        }

        .tooltip-name {
          display: block;
          font-size: 1rem;
          font-weight: 700;
          color: #d4a017;
          letter-spacing: 0.05em;
        }

        .tooltip-hint {
          display: block;
          font-size: 0.72rem;
          color: #c9b99a;
          letter-spacing: 0.04em;
          margin-top: 0.1rem;
        }

        /* ── Zoom hint ── */
        .zoom-hint {
          position: absolute;
          top: 0.6rem;
          right: 0.6rem;
          background: rgba(20, 12, 4, 0.7);
          color: #c9b99a;
          font-size: 0.68rem;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          pointer-events: none;
          backdrop-filter: blur(3px);
          border: 1px solid rgba(255,255,255,0.1);
        }

        /* ── Arrow ── */
        .arrow-container {
          width: 80px;
          flex-shrink: 0;
        }

        .arrow-svg {
          width: 100%;
          height: auto;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        /* ── Legend ── */
        .legend-section {
          background: rgba(255, 248, 235, 0.8);
          border: 1px solid rgba(139, 105, 20, 0.25);
          border-radius: 10px;
          padding: 1.75rem 2rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.07);
        }

        .legend-text {
          font-size: 1rem;
          line-height: 1.75;
          color: #3d2b10;
          margin: 0 0 0.75rem;
          font-style: italic;
        }

        .legend-hint {
          font-size: 0.875rem;
          color: #7a5c2e;
          margin: 0 0 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(139, 105, 20, 0.2);
        }

        /* ── Nations grid ── */
        .nations-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-top: 0.25rem;
        }

        .nation-chip {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          border: 1px solid var(--nation-color);
          color: #2c1e0f;
          font-size: 0.85rem;
          font-family: Georgia, serif;
          text-decoration: none;
          background: rgba(255, 255, 255, 0.5);
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
        }

        .nation-chip:hover {
          background: var(--nation-color);
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 3px 10px rgba(0,0,0,0.15);
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }

        .nation-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--nation-color);
          flex-shrink: 0;
          transition: background 0.15s;
        }

        .nation-chip:hover .nation-dot {
          background: rgba(255,255,255,0.8);
        }

        /* ── Lightbox ── */
        .lightbox-overlay {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(10, 6, 2, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(6px);
          animation: fadeIn 0.2s ease;
          padding: 1rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .lightbox-close {
          position: fixed;
          top: 1.25rem;
          right: 1.5rem;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          color: #f5e6c8;
          font-size: 1.25rem;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.15s;
          z-index: 1001;
        }

        .lightbox-close:hover {
          background: rgba(255,255,255,0.2);
        }

        .lightbox-inner {
          max-height: 90vh;
          overflow-y: auto;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.7);
        }

        .lightbox-img {
          display: block;
          max-width: min(90vw, 700px);
          height: auto;
          border-radius: 8px;
        }
      `}</style>
    </main>
  );
}
