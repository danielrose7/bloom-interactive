import Link from "next/link";
import Layout from "../layout";
import styles from "../../styles/open-source-case-study.module.css";

function Section({ heading, body, items }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionHeading}>{heading}</h2>
      <div className={styles.sectionBody}>
        {body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {items && (
          <dl className={styles.items}>
            {items.map(({ title, text }) => (
              <div key={title} className={styles.item}>
                <dt>{title}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

export default function OpenSourceCaseStudy({ project, next }) {
  const { name, status, tagline, description, stack, license, image, imageAlt, links, caseStudy } = project;
  const { eyebrow, role, facts, sections } = caseStudy;
  const live = status === "Live";

  return (
    <Layout>
      <article className={styles.page}>
        <nav className={styles.crumbs} aria-label="Breadcrumb">
          <Link href="/open-source" transitionTypes={["bloom-navigation"]}>Open source</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{name}</span>
        </nav>

        <header className={styles.hero}>
          <div className={styles.meta}>
            <span>{eyebrow}</span>
            <span className={`${styles.status} ${live ? styles.statusLive : ""}`}>{status}</span>
            {license && <span>{license} licensed</span>}
          </div>
          <h1 className={styles.title}>{name}</h1>
          <p className={styles.tagline}>{tagline}</p>
          <p className={styles.lede}>{description}</p>
          <div className={styles.actions}>
            {links.map(({ label, href, primary }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={primary ? styles.buttonPrimary : styles.button}
              >
                {label} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
        </header>

        {image && (
          <div className={styles.media}>
            <img src={image} alt={imageAlt} />
          </div>
        )}

        <dl className={styles.facts}>
          {facts.map(({ value, label }) => (
            <div key={label}>
              <dt>{value}</dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.summary}>
          <div>
            <h2 className={styles.summaryLabel}>Role</h2>
            <p>{role}</p>
          </div>
          <div>
            <h2 className={styles.summaryLabel}>Built with</h2>
            <ul className={styles.stack}>
              {stack.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        {sections.map((section) => <Section key={section.heading} {...section} />)}

        <footer className={styles.footer}>
          <Link href="/open-source" transitionTypes={["bloom-navigation"]}>&larr; All open source</Link>
          {next && (
            <Link href={`/open-source/${next.slug}`} transitionTypes={["bloom-navigation"]}>
              Next: {next.name} &rarr;
            </Link>
          )}
        </footer>
      </article>
    </Layout>
  );
}
