import Layout from "../layout";
import utilStyles from "../../styles/utils.module.css";
import styles from "../../styles/open-source.module.css";

const projects = [
  {
    name: "Story Points",
    status: "Live",
    tagline: "Realtime pointing poker for agile teams",
    description:
      "One standing URL per room, no accounts, nothing to install. Votes stay hidden until reveal, rooms remember their settings between sprints, and the whole app runs on Cloudflare's free plan.",
    highlights: [
      "Ticket queue with Linear and Jira CSV import",
      "Round history, countdown, and vote statistics",
      "Six languages, themes, and a joyful reaction layer",
      "Docs, llms.txt, and an API for agents",
    ],
    stack: ["Lit", "Cloudflare Workers", "Durable Objects", "WebSockets"],
    license: "MIT",
    image: "/images/open-source/story-points.png",
    imageAlt: "Story Points room with cards ready to vote",
    links: [
      { label: "Try it", href: "https://story-points.danielrose7.workers.dev", primary: true },
      { label: "Docs", href: "https://story-points.danielrose7.workers.dev/docs/" },
      { label: "Source", href: "https://github.com/danielrose7/story-points" },
    ],
  },
  {
    name: "preview-feedback",
    status: "In development",
    tagline: "Honor-system feedback for private website previews",
    description:
      "A reviewer opens a preview link, drops a pin on the page, and leaves a comment. No account, no browser extension: the unguessable link is the access control. Think the Vercel toolbar's comments, for any host.",
    highlights: [
      "One script tag, a ~13 KB web component in a shadow root",
      "Threads, replies, resolve and reopen, cross-page inbox",
      "Self-hosted dashboard for every site's threads",
      "A CLI so you and your agents can pull, reply, and resolve",
    ],
    stack: ["Web components", "Cloudflare Workers", "Durable Objects", "TypeScript"],
    license: null,
    links: [
      { label: "Source", href: "https://github.com/danielrose7/preview-feedback", primary: true },
    ],
  },
];

function ProjectCard({ project }) {
  const { name, status, tagline, description, highlights, stack, license, image, imageAlt, links } = project;
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
      </div>
      {image ? (
        <div className={styles.media}>
          <img src={image} alt={imageAlt} loading="lazy" />
        </div>
      ) : (
        <div className={`${styles.media} ${styles.mediaPlaceholder}`} aria-hidden="true">
          <span className={styles.pin}><span>1</span></span>
          <span className={`${styles.pin} ${styles.pinSecond}`}><span>2</span></span>
          <span className={styles.mediaCaption}>Pin it. Comment. Ship.</span>
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
