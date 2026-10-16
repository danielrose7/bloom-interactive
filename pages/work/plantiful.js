"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/plantiful.module.css";

const features = [
  { id: "intake", number: "01", name: "AI order intake", eyebrow: "Any format in. A trusted draft out.", title: "Orders arrived as everything except clean data.", body: "I built an authorized inbound-email pipeline that normalized attachments into PDFs, extracted a consistent JSON schema, and used agent-based matching to connect inconsistent plant names, customers, and shipping details to Plantiful records.", detail: "Every result remained a draft until a person reviewed it. AI handled the interpretation; people kept the consequential decision.", visual: "intake" },
  { id: "reports", number: "02", name: "AI reports", eyebrow: "Natural language over a complex data model.", title: "Ask for a view instead of hunting through filters.", body: "I proposed and built a conversational reports assistant that translates a request into columns, filters, and sorting across Plantiful’s tables. When a request is fuzzy, the agent asks follow-up questions before suggesting a configuration.", detail: "Unit-tested bridges, controlled retries, and resilient parsing kept imperfect model responses from flowing directly into application state.", visual: "reports" },
  { id: "ordering", number: "03", name: "Online ordering", eyebrow: "Wholesale commerce at nursery scale.", title: "Not an ordinary shopping cart.", body: "I owned a complete ordering system for customer-specific prices, quote-first workflows, inventory controls, public and embedded catalogs, and orders containing as many as 1,500 line items.", detail: "Device storage protected carts built over multiple sessions. Refreshing after two days of work should never be a heartbreaking moment.", visual: "ordering" },
  { id: "lifecycle", number: "04", name: "Living inventory", eyebrow: "Inventory that grows, moves, splits, and dies.", title: "A plant-specific ERP needs a plant-specific model.", body: "Production items move from planned to started to ready, affecting the current and future orders they can fulfill. They can change grade, split into groups, move locations, or become different sellable items.", detail: "I worked on item-specific task completion, splitting, and regrading workflows, with a seed-to-sale history that supports needs such as organic certification.", visual: "lifecycle" },
];

function FeatureVisual({ type }) {
  if (type === "reports") return <div className={styles.reportVisual}><span>Ask Plantiful</span><p>“Show me orders shipping this week.”</p><div><b>Shipping date</b><em>is this week</em></div><div><b>Sort</b><em>earliest first</em></div><button type="button">Apply to current view</button></div>;
  if (type === "ordering") return <div className={styles.cartVisual}><span>Wholesale order · saved locally</span><strong>1,248 items</strong><div><i style={{ width: "82%" }}></i></div><small>Your order is saved on this device</small></div>;
  if (type === "lifecycle") return <div className={styles.lifeVisual}><div><i></i><b>Planned</b><small>Jan 08</small></div><div><i></i><b>Started</b><small>Feb 16</small></div><div><i></i><b>Regraded</b><small>May 02</small></div><div><i></i><b>Ready</b><small>Jun 18</small></div></div>;
  return <div className={styles.intakeVisual}><span>Incoming / order-1438.pdf</span><div><b>Customer</b><em>Forest Lake Greenhouses</em><i>Matched</i></div><div><b>Line items</b><em>143 products</em><i>Review</i></div><div><b>Ship date</b><em>October 12</em><i>Matched</i></div><button type="button">Review draft order</button></div>;
}

export default function PlantifulCaseStudy() {
  const [activeFeature, setActiveFeature] = useState(features[0]);
  return (
    <>
      <Head>
        <title>Plantiful case study | Bloom Interactive</title>
        <link rel="icon" href="/images/bloom-logo.png" />
        <meta name="description" content="How Daniel helped turn Plantiful from a pre-launch idea into a plant-specific ERP serving 50+ customers." />
      </Head>

      <article className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroTopline}>
            <Link href="/portfolio" transitionTypes={["bloom-navigation"]}>← Selected work</Link>
            <span>Founding Engineer · Pre-launch to $1M ARR</span>
          </div>
          <p className={styles.caseLabel}>Case study 01 / Plantiful</p>
          <h1>Helping turn an idea into <em>a business.</em></h1>
          <p className={styles.heroSummary}>I joined Plantiful pre-launch as one of three founding engineers and worked across nearly every part of the product—from the inventory systems required for launch to online ordering, reporting, notifications, and AI-assisted workflows.</p>
          <div className={styles.heroFoot}>
            <a href="https://plantiful.ai" target="_blank" rel="noreferrer">Visit Plantiful ↗</a>
            <span className={styles.scrollNote}>The short version ↓</span>
          </div>
        </header>

        <section className={styles.stats} aria-label="Plantiful at a glance">
          <div><strong>3</strong><span>engineers when I joined</span></div>
          <div><strong>50+</strong><span>live customers</span></div>
          <div><strong>$1M</strong><span>annual recurring revenue</span></div>
          <div><strong>40+</strong><span>data grids on shared infrastructure</span></div>
        </section>

        <section className={styles.opening}>
          <div className={styles.sideNote}><span>My role</span><strong>Founding Engineer</strong><small>Employee · pre-launch team</small></div>
          <div className={styles.openingCopy}>
            <p className={styles.eyebrow}>Starting near zero</p>
            <h2>A Figma file, a few models, and a lot left to figure out.</h2>
            <p>My first project was a data-transformation pipeline that converted MUI table filters and quick-search logic into SQL queries. It eventually powered more than 40 data grids across the application.</p>
            <p>That first system set the pattern for the work that followed: understand a complicated domain, build the reusable foundation, and keep going until it works for the people doing the job.</p>
          </div>
        </section>

        <section className={styles.previewBand} aria-label="Selected systems preview">
          <div className={styles.previewIntro}><span>Selected systems</span><h2>AI when it helps. Boring reliability everywhere else.</h2></div>
          <div className={styles.previewWindow}>
            <div className={styles.windowBar}><i></i><i></i><i></i><span>AI order intake / Draft order</span></div>
            <div className={styles.orderPreview}>
              <p className={styles.mailTag}>Forwarded email + 3 attachments</p>
              <h3>Spring order — ready for review</h3>
              <div className={styles.matchRow}><span>Knockout Rose, 3 gal</span><b>Matched</b></div>
              <div className={styles.matchRow}><span>Coral Drift, #2</span><b>Review</b></div>
              <div className={styles.matchRow}><span>Blue Spruce, 7 gal</span><b>Missing</b></div>
              <button type="button">Review draft order</button>
            </div>
          </div>
        </section>

        <section className={styles.featureSection}>
          <div className={styles.featureHeading}>
            <p className={styles.eyebrow}>Things I helped build</p>
            <h2>Four systems. One complicated, living business.</h2>
            <p>Choose a feature to see the product problem, what I owned, and the part that was harder than it looks.</p>
          </div>
          <div className={styles.featureExplorer}>
            <div className={styles.featureTabs} role="tablist" aria-label="Plantiful feature stories">
              {features.map((feature) => <button key={feature.id} type="button" role="tab" aria-selected={activeFeature.id === feature.id} onClick={() => setActiveFeature(feature)}><span>{feature.number}</span>{feature.name}</button>)}
            </div>
            <div className={styles.featurePanel} role="tabpanel" aria-live="polite">
              <div className={styles.featureCopy}>
                <p>{activeFeature.eyebrow}</p><h3>{activeFeature.title}</h3><p>{activeFeature.body}</p>
                <aside><span>The harder bit</span>{activeFeature.detail}</aside>
              </div>
              <div className={styles.featureVisual}><FeatureVisual type={activeFeature.visual} /></div>
            </div>
          </div>
        </section>

        <section className={styles.quoteSection}>
          <p className={styles.eyebrow}>What changed for customers</p>
          <blockquote>“The majority of our customers started ordering online as soon as we opened it up. Each order used to take about 15 minutes to input—now it comes straight into the system.”</blockquote>
          <div><strong>Luke Venable</strong><span>Owner &amp; General Manager, Forest Lake Greenhouses</span><em>65–70% of customers ordering online</em></div>
        </section>

        <section className={styles.foundationSection}>
          <div><p className={styles.eyebrow}>Under the visible work</p><h2>Features are only as good as the systems beneath them.</h2></div>
          <div className={styles.foundationList}>
            <article><span>01</span><h3>Shared data-grid infrastructure</h3><p>My first project turned interface filters and quick-search behavior into reusable SQL queries. It grew to serve more than 40 data grids.</p></article>
            <article><span>02</span><h3>An automated test suite</h3><p>I introduced test coverage as the early product expanded, giving the team safer ground for fast iteration.</p></article>
            <article><span>03</span><h3>Notifications and workflows</h3><p>I built configurable in-app and email notifications, including event-driven external syncs and scheduled customer balances.</p></article>
            <article><span>04</span><h3>Flexible by design</h3><p>Custom fields let specialized nurseries capture requirements outside the shared product model without making the core brittle.</p></article>
          </div>
        </section>

        <section className={styles.outcomeSection}>
          <div className={styles.outcomeMark}>1 → 50+</div>
          <div><p className={styles.eyebrow}>From an idea to a business</p><h2>I joined before launch. I left after helping build the system that ran the company’s customers.</h2><p>Plantiful grew into a connected platform for inventory, production, ordering, reporting, and operational automation—serving more than 50 live customers and reaching $1 million in annual recurring revenue.</p></div>
        </section>

        <footer className={styles.caseFooter}>
          <p>Have a complicated product that needs an owner?</p>
          <a href="mailto:dan@gobloom.io?subject=I saw the Plantiful case study">Text Daniel.* <span>↗</span></a>
          <small>*Okay, this one opens email. The phone number comes later.</small>
        </footer>
      </article>
    </>
  );
}
