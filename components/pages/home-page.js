"use client";

import Image from "next/image";
import Link from "next/link";
import Layout from "../layout";
import { ContactTrigger } from "../contact-popover";
import styles from "../../styles/home.module.css";

const problems = [
  ["Stuck at the start line", "Turn a validated idea and a long list of unknowns into a clear plan and a working first release."],
  ["Running against a deadline", "Add senior, hands-on capacity without months of hiring and onboarding."],
  ["Starting a new project", "Carve out a new feature set, make the key decisions, and build with momentum from day one."],
  ["Putting AI into production", "Move past the demo with reliable workflows, structured data, and useful product design."],
];

const offers = [
  ["Focused Sprint", "A senior builder dropped into one urgent, well-defined problem. Best for shipping a feature, stabilizing a launch, or clearing a technical bottleneck."],
  ["Embedded Capacity", "Add experienced product and engineering capacity without making a full-time hire. I work directly in your codebase and alongside your team."],
  ["Technical Leadership", "Senior technical judgment for teams navigating architecture, hiring, delivery, or a consequential new product bet."],
];

export default function Home() {
  return <Layout home>
    <div className={`${styles.home} theme-home`}>
      <section className={styles.hero}>
        <div className={styles.sticker}><span>Accepting</span><strong>Projects</strong><small>Fall 2026</small></div>
        <p className={styles.kicker}>Independent product studio</p>
        <h1>Build it better.<br />Build it faster.</h1>
        <p className={styles.lede}>Are you running against deadlines or struggling to get off the start line?</p>
        <ContactTrigger className={styles.cta} />
        <p className="cta-note">Move the needle. Tag Dan in.</p>
        <p className={styles.heroNote}>Strategy, design, and engineering—from one accountable senior builder.</p>
      </section>

      <section className={styles.intro}><p className={styles.kicker}>A small studio with senior hands</p><div><h2>A career of delivering things on time and above expectations.</h2><p>Daniel has built brands, apps, and websites; owned infrastructure supporting more than $15 million in annual billing; and joined a pre-launch company on its path from idea to $1 million in ARR.</p><p className={styles.punchline}>He has sold logos, too.</p></div></section>

      <section className={styles.section}><header><p className={styles.kicker}>Good reasons to call</p><h2>Your product has momentum—or needs some.</h2></header><div className={styles.problemGrid}>{problems.map(([title,copy],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className={`${styles.section} ${styles.work}`} id="work"><header><p className={styles.kicker}>Proof, not promises</p><h2>Plug in. Expand capacity. Ship now.</h2></header><div className={styles.metrics}>
        <article><strong>$15M+</strong><small>annual billing supported</small><h3>Private Prep</h3><p>Built and operated billing software and a custom CRM before serving as CTO.</p></article>
        <article><strong>$1M</strong><small>ARR journey</small><h3>Plantiful</h3><p>Joined the founding team before launch and helped build the product used by more than 50 client businesses.</p></article>
        <article><strong>0→1</strong><small>reliable AI delivery</small><h3>Applied AI</h3><p>Shipped reliable AI features that turn messy inputs into useful, structured workflows.</p></article>
      </div><Link className={styles.inlineLink} href="/portfolio" transitionTypes={["bloom-navigation"]}>See selected client work →</Link></section>

      <section className={styles.letter} aria-labelledby="letter-title">
        <div className={styles.letterLabel}><span>Letter from Dan</span></div>
        <div className={styles.letterBody}>
          <h2 id="letter-title">If it’s on the internet, we can build it*</h2>
          <p>A core memory of my childhood is watching a seed turn into a garden. My dad let me sketch out which seeds should go where. We planted. We watered. We sat together on the corner and sold our excess produce to the neighborhood: Dan’s Veggies, my first business. I even added it as a contact in my dad’s PalmPilot—basically a luxurious website in the ’90s.</p>
          <p>Since the veggie stand, I graduated with two degrees in Potions (Chemistry) and Herbology (Biology) and taught myself to code. I worked at a branding agency, went through a developer apprenticeship program and became a CTO. I joined the founding team at a startup and achieved both launch and $1MM ARR.</p>
          <p>By day you can find me at a computer, tinkering. By night you can find me cooking 🤌 and arguing if we should go surfing because life is short or if life is long.</p>
          <p>I’m anticipating your note and know together we’ll build something great.</p>
          <p>Upwards,</p>
          <div className={styles.signature}>
            <Image src="/images/daniel-rose-signature.png" alt="Daniel Rose" width={904} height={286} />
          </div>
          <p><small>*Or at least figure out how to, quickly.</small></p>
        </div>
      </section>

      <section className={styles.section}><header><p className={styles.kicker}>Ways to work together</p><h2>Start with the shape of support the problem deserves.</h2></header><div className={styles.offers}>{offers.map(([title,copy],i)=><article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div><p className="offer-note">Engagements are scoped around outcomes and typically begin with a short working session.</p></section>

      <section className={styles.products}><header><p className={styles.kicker}>Products from Bloom</p><h2>Client work is only half the story.</h2></header><div className={styles.productGrid}>
        <a href="https://tote.tools/" target="_blank" rel="noreferrer"><div className={styles.productImage}><Image src="/images/portfolio/tote.png" alt="Tote preview" fill sizes="50vw" /></div><h3>Tote ↗</h3><p>A privacy-first universal cart for saving products from any store.</p></a>
        <a href="https://www.citrus.surf/" target="_blank" rel="noreferrer"><div className={styles.productImage}><Image src="/images/portfolio/citrus.png" alt="Citrus Surf preview" fill sizes="50vw" /></div><h3>Citrus Surf ↗</h3><p>Browser-based tools for turning messy spreadsheets and data into useful formats.</p></a>
      </div></section>

      <section className={styles.about}><div><p className={styles.kicker}>Daniel Rose</p><h2>You work with the person doing the work.</h2><p>I’m a product-minded engineer and former CTO based in Silverton, Colorado. I work directly in your codebase, alongside your team, and leave behind tested systems and documented decisions—not a dependency.</p><p>I’m especially useful to founder-led companies with customers, funding, or validated demand.</p><p><a href="https://www.linkedin.com/in/daniel-rose-11a91b70/">LinkedIn ↗</a> <a href="https://github.com/danielrose7">GitHub ↗</a></p></div><div className={styles.portrait}><Image src="/images/profile.png" alt="Daniel Rose" fill sizes="40vw" /></div></section>

      <section className="word-bank" aria-labelledby="word-bank-title"><div><p className={styles.kicker}>However you describe the help</p><h2 id="word-bank-title">One senior partner from idea to production.</h2></div><ul>
        <li>Independent product engineer</li><li>Software development consultant</li><li>Senior full-stack developer</li><li>Principal software engineer</li><li>Staff software engineer</li><li>Fractional principal engineer</li><li>Contract staff engineer</li><li>Fractional founding engineer</li><li>Hands-on fractional CTO</li><li>MVP developer</li><li>Startup technical partner</li><li>Product development studio</li><li>AI application developer</li><li>Software rescue consultant</li>
      </ul></section>

      <section className={styles.contact} id="contact"><p className={styles.kicker}>Accepting a small number of projects</p><h2>What are you trying to get over the line?</h2><p>Save the day. We’ll figure out whether I’m the right person to help.</p><ContactTrigger className={styles.cta} /><a className={styles.email} href="mailto:dan@gobloom.io">dan@gobloom.io</a></section>
    </div>
  </Layout>;
}
