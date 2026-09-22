"use client";

import { useRef, useCallback } from "react";
import Layout from "../layout";
import utilStyles from "../../styles/utils.module.css";
import styles from "../../styles/portfolio.module.css";

const projects = [
  {
    name: "Vertical SaaS",
    tagline: "Pre-launch to $1M ARR",
    description:
      "Plantiful.ai is a plant-specific ERP for inventory, production, ordering, reporting, and AI-assisted workflows. I joined pre-launch as one of three founding engineers.",
    url: "https://plantiful.ai",
    image: "/images/portfolio/plantiful.png",
  },
  {
    name: "Patient scheduling platform",
    tagline: "Scheduling, intake, charting, and billing",
    description:
      "Goji combines online scheduling, custom patient intake, rich-text clinical charting, billing and invoicing, and patient portals for acupuncturists and small clinics.",
    url: "https://goji.health/",
    image: "/images/portfolio/goji.png",
  },
  {
    name: "Product-saving app",
    tagline: "Available on iOS and the Chrome Web Store",
    description:
      "Tote is a universal product-saving app and Chrome extension. Save items from any store, organize collections, track prices, and share wishlists. Privacy-first — no tracking, no ads.",
    url: "https://tote.tools/",
    image: "/images/portfolio/tote.png",
  },
  {
    name: "Data toolkit",
    tagline: "Browser-based data tools",
    description:
      "Citrus Surf converts messy spreadsheets and JSON into SQL, transforms data between formats, and generates IDs. Everything happens client-side — your data never leaves the browser.",
    url: "https://www.citrus.surf/",
    image: "/images/portfolio/citrus.png",
  },
  {
    name: "Practice test portal",
    tagline: "4MM+ questions answered",
    description:
      "Built a fully featured online, interactive practice test tool from zero to one for ArborBridge and Private Prep. Adaptive, data-driven lessons across SAT, ACT, and entrance exam prep.",
    url: "https://www.arborbridge.com/",
    image: "/images/portfolio/arborbridge.png",
    clients: ["ArborBridge", "Private Prep"],
  },
  {
    name: "Class sign-up",
    tagline: "Discovery, enrollment, and back-office",
    description:
      "End-to-end class platform for The Coding Space. Client-side filtering across hundreds of offerings, billing and payments, plus a backend for scheduling, client and student profiles, and teacher assignment.",
    url: "https://www.thecodingspace.com/classes",
    image: "/images/portfolio/tcs-classes.png",
  },
  {
    name: "Online storefront",
    tagline: "Local print shop with six locations",
    description:
      "Custom e-commerce site for a Colorado screen printing company with six locations. Includes custom order forms with Dropbox upload, inventory management via InkSoft integration, and a full product catalog.",
    url: "https://www.labseven.co/",
    image: "/images/portfolio/labseven.png",
  },
];

function ProjectItem({ name, tagline, description, url, image, clients, internal }) {
  const previewRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (previewRef.current) {
      previewRef.current.style.left = `${e.clientX + 20}px`;
      previewRef.current.style.top = `${e.clientY - 100}px`;
    }
  }, []);

  return (
    <li className={styles.project} onMouseMove={handleMouseMove}>
      <a href={url} target={internal ? undefined : "_blank"} rel={internal ? undefined : "noopener noreferrer"} className={styles.projectLink}>
        <div className={styles.projectInfo}>
          <h2 className={styles.projectName}>
            {name}
            <span className={styles.arrow}>&rarr;</span>
          </h2>
          <p className={styles.projectDescription}>{description}</p>
        </div>
        <span className={styles.projectTagline}>{tagline}</span>
      </a>
      {image && <div className={styles.imagePreview} ref={previewRef}><img src={image} alt={`${name} preview`} /></div>}
    </li>
  );
}

export default function Portfolio() {
  return (
    <Layout>
      <section className={styles.portfolio}>
        <div className={styles.intro}>
          <h2 className={utilStyles.headingXl}>Portfolio</h2>
          <p>If it's on the internet, we can build it<a href="#disclaimer" className={styles.asterisk}><sup>*</sup></a></p>
        </div>
        <ul className={styles.projectList}>
          {projects.map((project) => (
            <ProjectItem key={project.name} {...project} />
          ))}
        </ul>
        <p id="disclaimer" className={styles.disclaimer}><sup>*</sup>Or at least figure out how to, quickly.</p>
        <div className={styles.cta}>
          <p>Have something you <em>actually</em> want to get off the ground?</p>
          <a href="mailto:dan@gobloom.io?subject=Hello from gobloom.io" className={styles.ctaLink}>
            dan@gobloom.io &rarr;
          </a>
        </div>
      </section>
    </Layout>
  );
}
