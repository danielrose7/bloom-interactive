"use client";

import { useRef, useCallback } from "react";
import Layout from "../layout";
import utilStyles from "../../styles/utils.module.css";
import styles from "../../styles/portfolio.module.css";

const projects = [
  {
    name: "Plantiful",
    tagline: "Pre-launch to $1M ARR",
    description:
      "Plant-specific ERP for inventory, production, ordering, reporting, and AI-assisted workflows. I joined pre-launch as one of three founding engineers.",
    url: "https://plantiful.ai",
  },
  {
    name: "Tote",
    tagline: "A cart that doesn't belong to a store",
    description:
      "A universal product-saving tool with a Chrome extension. Save items from any store, organize into collections, track prices, and share wishlists. Privacy-first — no tracking, no ads.",
    url: "https://tote.tools/",
    image: "/images/portfolio/tote.png",
  },
  {
    name: "Citrus Surf",
    tagline: "Browser-based data tools",
    description:
      "A toolkit for converting messy spreadsheets and JSON into SQL, transforming between data formats, and generating IDs. All processing happens client-side — your data never leaves the browser.",
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
