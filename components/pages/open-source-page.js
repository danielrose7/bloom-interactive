import Link from "next/link";
import Layout from "../layout";
import { projects } from "../../lib/open-source";
import utilStyles from "../../styles/utils.module.css";
import styles from "../../styles/open-source.module.css";

function ProjectCard({ project }) {
  const { slug, name, status, tagline, description, highlights, stack, license, image, imageAlt, mediaCaption, links } = project;
  const live = status === "Live";

  return (
    <article className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.meta}>
          <span className={`${styles.status} ${live ? styles.statusLive : ""}`}>{status}</span>
          {license && <span className={styles.license}>{license} licensed</span>}
        </div>
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.tagline}>{tagline}</p>
        <p className={styles.description}>{description}</p>
        <ul className={styles.highlights}>
          {highlights.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <ul className={styles.stack} aria-label="Built with">
          {stack.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className={styles.actions}>
          <Link href={`/open-source/${slug}`} className={styles.buttonPrimary} transitionTypes={["bloom-navigation"]}>
            Case study <span aria-hidden="true">&rarr;</span>
          </Link>
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              {label} <span aria-hidden="true">&rarr;</span>
            </a>
          ))}
        </div>
      </div>
      {image ? (
        <div className={styles.media}>
          <img src={image} alt={imageAlt} loading="lazy" />
        </div>
      ) : (
        <div className={`${styles.media} ${styles.mediaPlaceholder}`} aria-hidden="true">
          <span className={styles.pin}><span>1</span></span>
          <span className={`${styles.pin} ${styles.pinSecond}`}><span>2</span></span>
          <span className={styles.mediaCaption}>{mediaCaption ?? "Built in the open."}</span>
        </div>
      )}
    </article>
  );
}

export default function OpenSourcePage() {
  return (
    <Layout>
      <section className={styles.page}>
        <div className={styles.intro}>
          <h2 className={utilStyles.headingXl}>Open source</h2>
          <p>
            Small, sharp tools we built because we needed them, and kept open because
            you might too. Use them, fork them, send a pull request.
          </p>
        </div>
        <div className={styles.cards}>
          {projects.map((project) => <ProjectCard key={project.name} project={project} />)}
        </div>
        <div className={styles.cta}>
          <h3>Community</h3>
          <p>
            Found a bug, want a feature, or have a translation to contribute? Issues and
            pull requests are welcome on each repo. Story Points locale files are one file,
            one PR.
          </p>
          <a href="https://github.com/danielrose7" target="_blank" rel="noopener noreferrer" className={styles.ctaLink}>
            github.com/danielrose7 &rarr;
          </a>
        </div>
      </section>
    </Layout>
  );
}
