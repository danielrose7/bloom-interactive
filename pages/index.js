import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Layout, { siteTitle } from "../components/layout";
import styles from "../styles/home.module.css";

const problems = [
  ["Stuck at the start line", "Turn a validated idea and a long list of unknowns into a clear plan and a working first release."],
  ["Running against a deadline", "Add senior, hands-on capacity without months of hiring and onboarding."],
  ["Outgrowing the MVP", "Stabilize the product and build the systems your next stage needs."],
  ["Putting AI into production", "Move past the demo with reliable workflows, structured data, and useful product design."],
];

function PhonePopover() {
  const [open, setOpen] = useState(false);

  return <>
    <button className={styles.cta} type="button" onClick={() => setOpen(true)}>Text Daniel <span>↗</span></button>
    {open && <div className="phone-popover-backdrop" role="presentation" onClick={() => setOpen(false)}>
      <div className="phone-popover" role="dialog" aria-modal="true" aria-labelledby="phone-popover-title" onClick={(event) => event.stopPropagation()}>
        <button className="phone-popover-close" type="button" aria-label="Close" onClick={() => setOpen(false)}>×</button>
        <p id="phone-popover-title">Text Daniel</p>
        <strong>720-878-4015</strong>
        <small>Save the day.</small>
      </div>
    </div>}
  </>;
}
const offers = [
  ["Diagnostic", "Repository and roadmap review, risk assessment, and written action plan.", "$2K–$3.5K"],
  ["Launch or rescue sprint", "One bounded outcome delivered in one to two weeks.", "$4K–$8K"],
  ["Fractional technical partner", "One to two days a week of product ownership and implementation.", "$6K–$12K/mo"],
];

export default function Home() {
  return <Layout home>
    <Head><title>{`Build it better | ${siteTitle}`}</title><meta name="description" content="Daniel Rose helps founder-led companies build and ship better digital products." /></Head>
    <div className={`${styles.home} theme-home`}>
      <section className={styles.hero}>
        <div className={styles.sticker}><span>Accepting</span><strong>Projects</strong><small>Fall 2026</small></div>
        <p className={styles.kicker}>Independent product studio</p>
        <h1>Build it better.<br />Build it faster.</h1>
        <p className={styles.lede}>Are you running against deadlines or struggling to get off the start line?</p>
        <PhonePopover />
        <p className="cta-note">Move the needle. Tag Dan in.</p>
        <p className={styles.heroNote}>Strategy, design, and engineering—from one accountable senior builder.</p>
      </section>

      <section className={styles.intro}><p className={styles.kicker}>A small studio with senior hands</p><div><h2>Eleven years of turning ambitious ideas into useful things.</h2><p>Daniel has built brands, apps, and websites; owned infrastructure supporting more than $15 million in annual billing; and joined a pre-launch company on its path from idea to $1 million in ARR.</p><p className={styles.punchline}>He has sold logos, too.</p></div></section>

      <section className={styles.section}><header><p className={styles.kicker}>Good reasons to call</p><h2>Your product has momentum—or needs some.</h2></header><div className={styles.problemGrid}>{problems.map(([title,copy],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className={`${styles.section} ${styles.work}`} id="work"><header><p className={styles.kicker}>Proof, not promises</p><h2>Plug in. Expand capacity. Ship now.</h2></header><div className={styles.metrics}>
        <article><strong>$15M+</strong><small>annual billing supported</small><h3>Private Prep</h3><p>Built and operated billing software and a custom CRM before serving as CTO.</p></article>
        <article><strong>$1M</strong><small>ARR journey</small><h3>Plantiful</h3><p>Joined the founding team before launch and helped build the product used by more than 50 client businesses.</p></article>
        <article><strong>0→1</strong><small>production AI workflow</small><h3>Document intake</h3><p>Built a pipeline that turns emailed attachments into structured sales-order data.</p></article>
      </div><Link className={styles.inlineLink} href="/portfolio">See selected client work →</Link></section>

      <section className={styles.letter} aria-labelledby="letter-title">
        <div className={styles.letterLabel}><span>Letter from Dan</span><small>Silverton, Colorado<br />September 2026</small></div>
        <div className={styles.letterBody}>
          <h2 id="letter-title">The best client relationships feel like building on the same side of the table.</h2>
          <p>Most founders don’t need more software for software’s sake. You need to get something important into customers’ hands, fix what is slowing the business down, or make a technical decision you can live with two years from now.</p>
          <p>That’s the work I like. I’ve spent the last eleven years moving between the whiteboard and the codebase—shaping the idea, finding the smallest honest path through it, and staying close enough to the details to make sure it actually works.</p>
          <p>I’m not bringing a bench of mystery developers or handing the project off after the kickoff. You’ll work directly with me. I’ll ask a lot of questions, tell you when I think there’s a simpler way, and treat your time and runway like they matter.</p>
          <p>If you have a good business, a stubborn product problem, and an appetite for candid collaboration, send me the messy version. We can start there.</p>
          <p className={styles.signature}>— Daniel</p>
        </div>
      </section>

      <section className={styles.section}><header><p className={styles.kicker}>Ways to work together</p><h2>Start with the size of engagement the problem deserves.</h2></header><div className={styles.offers}>{offers.map(([title,copy,price],i)=><article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{copy}</p></div><strong>{price}</strong></article>)}</div></section>

      <section className={styles.products}><header><p className={styles.kicker}>Products from Bloom</p><h2>Client work is only half the story.</h2></header><div className={styles.productGrid}>
        <a href="https://tote.tools/" target="_blank" rel="noreferrer"><div className={styles.productImage}><Image src="/images/portfolio/tote.png" alt="Tote preview" fill sizes="50vw" /></div><h3>Tote ↗</h3><p>A privacy-first universal cart for saving products from any store.</p></a>
        <a href="https://www.citrus.surf/" target="_blank" rel="noreferrer"><div className={styles.productImage}><Image src="/images/portfolio/citrus.png" alt="Citrus Surf preview" fill sizes="50vw" /></div><h3>Citrus Surf ↗</h3><p>Browser-based tools for turning messy spreadsheets and data into useful formats.</p></a>
      </div></section>

      <section className={styles.about}><div><p className={styles.kicker}>Daniel Rose</p><h2>You work with the person doing the work.</h2><p>I’m a product-minded engineer and former CTO based in Silverton, Colorado. I work directly in your repository, alongside your team, and leave behind tested systems and documented decisions—not a dependency.</p><p>I’m especially useful to founder-led companies with customers, funding, or validated demand.</p><p><a href="https://www.linkedin.com/in/daniel-rose-11a91b70/">LinkedIn ↗</a> <a href="https://github.com/danielrose7">GitHub ↗</a></p></div><div className={styles.portrait}><Image src="/images/profile.png" alt="Daniel Rose" fill sizes="40vw" /></div></section>

      <section className="word-bank" aria-labelledby="word-bank-title"><div><p className={styles.kicker}>However you describe the help</p><h2 id="word-bank-title">One senior partner from idea to production.</h2></div><ul>
        <li>Independent product engineer</li><li>Software development consultant</li><li>Senior full-stack developer</li><li>Principal software engineer</li><li>Staff software engineer</li><li>Fractional principal engineer</li><li>Contract staff engineer</li><li>Fractional founding engineer</li><li>Hands-on fractional CTO</li><li>MVP developer</li><li>Startup technical partner</li><li>Product development studio</li><li>AI application developer</li><li>Software rescue consultant</li>
      </ul></section>

      <section className={styles.contact} id="contact"><p className={styles.kicker}>Accepting a small number of projects</p><h2>What are you trying to get over the line?</h2><p>Save the day. We’ll figure out whether I’m the right person to help.</p><PhonePopover /><a className={styles.email} href="mailto:dan@gobloom.io">dan@gobloom.io</a></section>
    </div>
  </Layout>;
}
