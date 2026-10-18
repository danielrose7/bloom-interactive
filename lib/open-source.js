// Open source projects: card copy for /open-source and long-form case study
// copy for /open-source/[slug]. Facts here come from each repo's README and docs.

const projectDetails = [
  {
    slug: "embed-field-guide",
    name: "Embed Field Guide",
    status: "Guide",
    tagline: "Responsive iframes and honest browser boundaries",
    description:
      "A practical one-page guide to the parts of third-party embeds that fail in production: intrinsic height, resize feedback loops, cross-frame messages, framing policy, and what “same-origin security” does—and does not—mean.",
    highlights: [
      "A custom-element API over a vendor-origin iframe",
      "A responsive-height protocol that can grow and shrink",
      "Origin- and source-checked cross-frame messages",
      "Patterns informed by Cal.com, Typeform, and YouTube",
    ],
    stack: ["iframes", "postMessage", "ResizeObserver", "Content Security Policy"],
    license: "CC BY 4.0",
    links: [
      { label: "Markdown gist", href: "https://gist.github.com/danielrose7/2106de30042a44b2e553d8af2e261316" },
    ],
    mediaCaption: "Two documents. One explicit contract.",
    caseStudy: {
      eyebrow: "Field guide",
      role: "Research, implementation, and browser testing",
      facts: [
        { value: "2", label: "documents in every embed" },
        { value: "3", label: "approved lifecycle events" },
        { value: "360–900px", label: "default height clamp" },
        { value: "0", label: "form answers sent to the host" },
      ],
      sections: [
        {
          heading: "The architecture that held up",
          body: [
            "We built forms and booking flows as a small loader script that registers purpose-named custom elements such as <product-form> and <product-booking>. Each element creates an iframe pointing back to the application. The iframe owns application logic, browser storage, signatures, and submission; the host owns placement and width; a narrow message contract connects the two.",
            "The custom element is the integration API, not the security boundary. It gives customers readable markup, sensible defaults, validated attributes, lifecycle events, and one place to evolve compatibility. The iframe supplies the browser boundary. This follows the established shape used by products such as Cal.com, Typeform, and YouTube: a small host-side API around a vendor-origin iframe, with messages for the few things that must cross the boundary. The exact API differs—YouTube does not expose a custom element—but the architectural seam is proven and familiar.",
            "This was not just a convenient wrapper. Application code could keep using its existing same-origin data layer while the customer website stayed unable to read the iframe DOM, fields, or storage. Patient answers remained out of the host page and its third-party scripts.",
            "The important qualification is that same-origin is not, by itself, a security property. The iframe is same-origin with the application but normally cross-origin from the host. That boundary does not make a public form private, authenticate its visitor, or stop someone from copying the embed elsewhere.",
          ],
          code: [
            {
              label: "Host page: the custom element is the public API",
              source: `<script src="https://app.example.com/embed.js" async></script>
<product-form
  account="acme"
  form="intake"
  height="360,900"
  theme="auto"
></product-form>`,
            },
          ],
        },
        {
          heading: "Responsive height is a protocol",
          body: [
            "Width is ordinary responsive CSS: the iframe fills the space its host provides. Height crosses a document boundary, so the parent cannot inspect the child and CSS alone cannot solve it. Our first fixed 640px frame failed in both directions—empty space around short questions and an inner scrollbar on signatures and terms.",
          ],
          items: [
            { title: "Measure natural content", text: "Embedded mode removes viewport sizing such as min-height: 100dvh. A ResizeObserver watches the content root and posts a numeric height; a low-frequency polling fallback covers browsers where the observer is unavailable or throws." },
            { title: "Bound the movement", text: "The parent clamps reports to 360–900px by default and animates changes over 200ms, with fixed height and custom min,max options. A skeleton occupies the minimum before the first useful measurement and respects reduced-motion preferences." },
            { title: "Break the feedback loop", text: "The real bug was a measured screen that could shrink to its fixed-height flex parent. It reported the frame’s current height back and could never grow. Making that screen content-sized with flex: none fixed it. Never measure a node whose size is derived from the iframe viewport you are about to resize." },
            { title: "Test behavior, not a screenshot", text: "Cover narrow hosts, short and tall steps, validation errors, keyboard navigation, slow or blocked loads, reduced motion, and both growth and shrinkage. Disable embedded autofocus when it can unexpectedly scroll the host page." },
          ],
          code: [
            {
              label: "Child: report intrinsic height",
              source: `const root = document.querySelector("[data-embed-root]");
let lastHeight = 0;

const reportHeight = () => {
  const height = Math.ceil(root.getBoundingClientRect().height);
  if (height > 0 && height !== lastHeight) {
    lastHeight = height;
    window.parent.postMessage({ type: "embed:resize", height }, "*");
  }
};

new ResizeObserver(reportHeight).observe(root);
reportHeight();`,
            },
          ],
        },
        {
          heading: "A narrow message contract",
          body: [
            "The child reports readiness, successful completion, and a number for height—never form answers or guest details. The parent accepts a message only when event.origin is the application origin and event.source is that exact iframe window, then re-dispatches an approved event for host analytics or navigation.",
            "The child uses targetOrigin \"*\" because the same embed can appear on arbitrary customer domains. That is defensible only while outbound messages are non-sensitive. The moment a payload includes personal or booking data, the design needs an allow-listed parent origin and a different trust model.",
          ],
          code: [
            {
              label: "Parent: validate before resizing",
              source: `const appOrigin = new URL(iframe.src).origin;

window.addEventListener("message", (event) => {
  if (event.origin !== appOrigin) return;
  if (event.source !== iframe.contentWindow) return;
  if (event.data?.type !== "embed:resize") return;

  const height = Number(event.data.height);
  if (!Number.isFinite(height)) return;
  iframe.style.height = Math.min(900, Math.max(360, height)) + "px";
});`,
            },
          ],
        },
        {
          heading: "Scope the framing exception",
          body: [
            "Embeddable pages must allow another site to frame them; authenticated application pages should not. Our default is Content-Security-Policy frame-ancestors 'self', with X-Frame-Options: SAMEORIGIN as a legacy counterpart. Only dedicated embed routes omit that restriction. Before that split, staff pages were frameable too—a clickjacking exposure created by making the whole site convenient for one feature.",
            "Host customization is a validated set of values—theme, colors, radius, and font—not arbitrary CSS or markup. An iframe is a useful isolation boundary only while neither side quietly installs a tunnel through it.",
          ],
          code: [
            {
              label: "Next.js: protect everything except embed routes",
              source: `export default {
  async headers() {
    return [{
      source: "/:path((?!embed(?:/|$)).*)",
      headers: [
        { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ],
    }];
  },
};`,
            },
          ],
        },
        {
          heading: "What localhost will not tell you",
          body: [
            "Third-party cookies and storage vary by browser. Embedded localStorage is commonly partitioned by top-level site, so a draft on a practice website may not appear on the direct application link. Two localhost ports are still the same site for cookies, which can make a development embed look authenticated when a production cross-site embed will not be.",
            "Use genuinely different hostnames and include Safari and Firefox in the test matrix. Same-origin with the application preserves application capabilities; it does not replace rate limits, payload limits, authorization on private routes, clickjacking policy, or sensitive-data-safe logging.",
          ],
        },
        {
          heading: "The takeaway",
          body: [
            "Treat an embed as a small distributed system: two documents, a versioned message contract, an explicit trust boundary, and browser-dependent storage behavior. Keep the data flow minimal, validate both ends of every message, measure intrinsic content, scope framing exceptions to dedicated routes, and test on a genuinely different site before calling the result secure or responsive.",
          ],
        },
      ],
    },
  },
  {
    slug: "story-points",
    name: "Story Points",
    status: "Live",
    tagline: "Realtime pointing poker for agile teams",
    description:
      "Built after routine disappointment with pointing tools that did the job but often felt dated and disposable. One standing URL per room, no accounts, nothing to install, and enough memory to come back next sprint.",
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
    caseStudy: {
      eyebrow: "Case study",
      role: "Product, design, and engineering",
      facts: [
        { value: "~20 KB", label: "gzipped JavaScript" },
        { value: "6", label: "languages" },
        { value: "29", label: "themes" },
        { value: "$0", label: "to run, on the Workers free plan" },
      ],
      sections: [
        {
          heading: "The problem",
          body: [
            "Story Points came from routine disappointment with the pointing tools I used in real sprint planning. Tools such as PointingPoker.com could run the vote, but the experience often felt dated, temporary, and disconnected from the rest of the team's work.",
            "Many alternatives also ask for something before the first vote: an account for the facilitator, a seat for everyone, or a paid tier once the team grows past a cap. The free ones tend to forget everything when the session ends, so the deck, settings, and history are gone by the next sprint.",
            "The goal was the opposite: a room that is just a URL, costs nothing to open, and is still waiting, with its history, when the team comes back.",
          ],
        },
        {
          heading: "Decisions that shaped it",
          items: [
            {
              title: "The URL is the product",
              text: "Create a room or claim any address like /room/your-team, share the link, and everyone joins with a name. The same URL works sprint after sprint, and refreshing the page reclaims your seat. An optional six-character room code is the only lock.",
            },
            {
              title: "No accounts, including API keys",
              text: "Auth machinery is accounts by the back door: key issuance, rotation, revocation, a dashboard. So the credential is scoped to one room and shared the way the room is shared. That is also what makes \"point your own agent at the API\" a one-click idea instead of a setup ceremony.",
            },
            {
              title: "Identifiers are capabilities",
              text: "A user id reclaims a seat, so it never leaves the server. Broadcasts carry per-room opaque aliases, votes stay server-side until reveal, and the stats endpoint returns aggregate integers only. Every new field on a public payload gets the same question: is this someone else's credential, or state that is hidden on purpose?",
            },
            {
              title: "Dependencies must earn their place",
              text: "Animations are pure CSS and sounds are Web Audio, with no assets. The runtime roster is Lit plus a lazy-loaded 2 KB QR encoder that only downloads if you open the invite QR.",
            },
          ],
        },
        {
          heading: "What's inside",
          items: [
            { title: "Ticket queue", text: "Fill it by typing, pasting a tracker export, importing a Linear or Jira CSV into a preview table you can edit first, or posting from a script." },
            { title: "Round history", text: "Each round records the story, vote spread, and time to reveal. Copy it out as Markdown or CSV, or download JSON." },
            { title: "Voting modes", text: "Auto-reveal, a server-owned countdown, anonymous voting, away votes, custom decks and groups, and optional room codes." },
            { title: "A joy layer", text: "Emoji reactions that ride the socket and are never stored, shuffle-bag celebrations on reveal, a rabbit-hole timer that warns you when a story drags, and a hidden trigger word." },
            { title: "Themes and languages", text: "Twenty-nine themes including seasonal auto-theming, and a UI in English, Spanish, German, French, Portuguese, and Japanese from a zero-dependency translation layer." },
            { title: "Built for agents", text: "A plain-HTTP API for import and export, an llms.txt index, markdown twins of every docs page, and per-agent setup notes." },
          ],
        },
        {
          heading: "Under the hood",
          body: [
            "The frontend is Vite and Lit web components. The backend is a Cloudflare Worker with one Durable Object per room, using the WebSocket Hibernation API so idle rooms cost nothing. Room state persists in the object's SQLite storage for weeks between sessions, and a singleton stats object keeps anonymous aggregate counters.",
            "Because rooms are Durable Objects, self-hosting means your own Cloudflare account. Three commands (clone, install, deploy) put an identical copy there on the free plan, and nothing phones home. The license removes the ability for there to be a catch.",
          ],
        },
        {
          heading: "Contribute",
          body: [
            "Locale files are the easiest way in: one file, one pull request, and the file headers invite native-speaker review. Bug reports, theme ideas, and docs fixes are welcome on the repo too.",
          ],
        },
      ],
    },
  },
  {
    slug: "preview-feedback",
    name: "preview-feedback",
    status: "Live",
    tagline: "A self-hosted, open-source alternative to Vercel Toolbar comments",
    description:
      "Built for taking notes and receiving client feedback on pre-production website previews. Reviewers open a link, drop a pin, and comment—no account, browser extension, or proprietary platform required.",
    highlights: [
      "Made for Goji Health's free websites for acupuncture practices",
      "One script tag, a ~19 KB web component in a shadow root",
      "Threads, replies, resolve and reopen, cross-page inbox",
      "Self-hosted dashboard for every site's threads",
    ],
    stack: ["Web components", "Cloudflare Workers", "Durable Objects", "TypeScript"],
    license: "MIT",
    image: "/images/open-source/preview-feedback.png",
    imageAlt: "preview-feedback browser page with a numbered pin and comment thread",
    links: [
      { label: "Source", href: "https://github.com/danielrose7/preview-feedback", primary: true },
    ],
    caseStudy: {
      eyebrow: "Case study",
      role: "Product and engineering",
      facts: [
        { value: "~19 KB", label: "gzipped widget" },
        { value: "0", label: "accounts or extensions" },
        { value: "117", label: "unit tests" },
        { value: "168", label: "browser checks" },
      ],
      sections: [
        {
          heading: "The problem",
          body: [
            "preview-feedback began as part of Goji Health's offer to build websites for acupuncture practices at no cost. Each practice needs a private, pre-production copy where I can take implementation notes and the practitioner can review the site in context before it goes live.",
            "Without a shared feedback layer, those notes come back by email, text message, or a phone call, with no link to the part of the page they were about. \"The second thing on the services page looks off\" has to be turned back into a place on a page, and then into a change, by hand.",
            "Existing tools solve this well inside one host's ecosystem, or by asking every reviewer to install an extension or sign up. Neither fits a small client reviewing their own site once, on their phone.",
          ],
        },
        {
          heading: "Decisions that shaped it",
          items: [
            {
              title: "The link is the credential",
              text: "No logins, no extension. A site key lets whoever holds the preview link read and write that one site's comments and nothing else. It is the same trust model as sharing a private link, and the project deliberately never grows past it.",
            },
            {
              title: "Honor system, on purpose",
              text: "\"Same author\" means the same typed name, trimmed and case-insensitive. That is spoofable by design for a small group sharing a private link, and the docs say so rather than pretending it is stronger.",
            },
            {
              title: "Comments are untrusted input",
              text: "Anyone with a preview link can write text that a person or an agent will later read. Comments are never rendered as HTML, never executed or followed as instructions, and are marked as data in any agent-facing output.",
            },
            {
              title: "A widget that leaves no trace",
              text: "It is a custom element with its styles in a shadow root, so the host page's CSS cannot touch it and a bad brand color cannot make it unreadable. Everything it registers outside the shadow root is undone when the element is removed, and a browser check proves it. A site built without feedback has no element, no script, and no leftover file.",
            },
          ],
        },
        {
          heading: "What's inside",
          items: [
            { title: "Pins and threads", text: "Numbered pins on the page, threads with replies, resolve and reopen, author-only delete, and deep links that scroll to the exact pin." },
            { title: "A toolbar you can move", text: "Drag it anywhere, fold it into a bubble, and stand it against a side edge. Popovers are placed in the same render so they never flash at a default spot." },
            { title: "An inbox across pages", text: "Every open thread on the site in one list, ordered by the site's own navigation." },
            { title: "A dashboard you host yourself", text: "Every site's threads at /studio/ on the same Worker. Filter by page and width, reply, resolve with a note, and open the preview on the exact pin." },
            { title: "A CLI for you and your agents", text: "Register a site, pull open threads with deep links, then reply, resolve, and reopen from the terminal." },
            { title: "Stable anchors", text: "Comments pin to the nearest section, with a short path and a text snippet that lets the pin be found again after a rebuild." },
          ],
        },
        {
          heading: "Under the hood",
          body: [
            "One Cloudflare Worker with a SQLite-backed Durable Object per site, so a site's comments are small, written rarely, read together, and serialised for free. The widget started as vanilla TypeScript and moved to Lit in steps, with the browser checks passing unchanged, because hand-written render-and-restore-focus code had caused real bugs. Geometry and rules live in pure, unit-tested modules.",
            "A change is only done when typecheck, unit tests, and the real-Chrome end-to-end check all pass. The next step on the roadmap is workspaces, so a second agency can use the same Worker with its data kept strictly separate, one Durable Object per site.",
          ],
        },
        {
          heading: "Use it now",
          body: [
            "preview-feedback is live as a self-hosted, open-source alternative to Vercel Toolbar comments. Deploy the Worker to your own Cloudflare account, add one script tag to a preview, and keep the feedback loop on infrastructure you control.",
            "Next on the roadmap: multi-workspace tenancy, a versioned API, and an apply-feedback skill so an agent can pull open threads, change the site, reply with what changed, and resolve the work.",
          ],
        },
      ],
    },
  },
  {
    slug: "db-test-kit-js",
    name: "db-test-kit-js",
    status: "Live",
    tagline: "Endpoint tests that are sane to write and easy to trust",
    description:
      "Rails made database-backed endpoint tests feel ordinary; many TypeScript stacks still do not. This runnable reference brings fast rollback isolation, readable fixtures, factories, and real authorization checks to the stacks that leave you to assemble them yourself.",
    highlights: [
      "Rails-like endpoint tests for TypeScript applications",
      "Rollback each test instead of truncating the database",
      "Typed, label-addressed fixtures and lazy factories",
      "Working Drizzle and Prisma 7 implementations",
    ],
    stack: ["TypeScript", "Postgres", "Drizzle", "Prisma", "Vitest"],
    license: "MIT",
    image: "/images/open-source/db-test-kit-js.png",
    imageAlt: "db-test-kit-js code editor, passing test results, and database rollback",
    links: [
      { label: "Read the guide", href: "https://danielrose7.github.io/db-test-kit-js/", primary: true },
      { label: "Source", href: "https://github.com/danielrose7/db-test-kit-js" },
    ],
    caseStudy: {
      eyebrow: "Case study",
      role: "Research, documentation, and engineering",
      facts: [
        { value: "~0.3 ms", label: "rollback per test" },
        { value: "2", label: "working ORM implementations" },
        { value: "1", label: "real authorization boundary" },
        { value: "0", label: "packages to install from the kit" },
      ],
      sections: [
        {
          heading: "The problem",
          body: [
            "Rails makes database-backed endpoint tests feel like a normal part of building an application. Across many TypeScript stacks, I could not find an equivalent system available out of the box: transaction isolation, fixtures, factories, authentication seams, and honest escape hatches working together.",
            "Teams are often left choosing between two unsatisfying extremes: fast tests built on mocks that cannot catch a missing tenant filter or constraint violation, and full end-to-end tests with enough setup and cleanup that people avoid writing them.",
            "The useful middle is an integration test that calls the same application function production calls, runs against a real schema and authorization decision, and leaves the database exactly as it found it.",
          ],
        },
        {
          heading: "Decisions that shaped it",
          items: [
            {
              title: "A reference, not a dependency",
              text: "Database test infrastructure touches an app's connection owner, migrations, schema types, auth boundary, and test runner. Those seams should remain visible, so the project is designed to be copied and adapted rather than installed and hidden behind a package.",
            },
            {
              title: "Rollback is the cleanup",
              text: "Each test runs inside an interactive transaction and throws a sentinel at the end so even a successful test rolls back. The application's database import points at that transaction, while nested application transactions become savepoints.",
            },
            {
              title: "Mock identity, not authorization",
              text: "Tests fake the one session lookup that says who is signed in, then exercise the real membership and tenancy checks. That makes cross-tenant access, audit writes, and missing filters observable instead of mocked away.",
            },
            {
              title: "Caveats belong in the suite",
              text: "One transaction means one connection: concurrent queries serialize, database now() is frozen, and a failed statement aborts the transaction. The kit pins those facts with tests and gives race-sensitive cases an explicit committed-mode escape hatch.",
            },
          ],
        },
        {
          heading: "What's inside",
          items: [
            { title: "Rollback harness", text: "A Vitest setup that wraps each example in a transaction and proves writes disappear before the next test." },
            { title: "Readable fixtures", text: "A small committed baseline keyed by labels, with deterministic IDs and type-checked references between rows." },
            { title: "Factories for variation", text: "Fishery factories persist only the state a test changes, with lazy associations that keep setup compact." },
            { title: "Seam and caveat tests", text: "Guardrails catch extra database connections and document the transaction behaviors that can otherwise make a suite quietly dishonest." },
            { title: "Two adoption paths", text: "The root project demonstrates Drizzle with PGlite or Postgres; a complete Prisma 7 variant covers the ORM-specific differences against real Postgres." },
            { title: "Docs for humans and agents", text: "A rendered field guide, raw Markdown, RECREATE.md, an Agent Skill, llms.txt, and a generated full-text reference all teach the same pattern." },
          ],
        },
        {
          heading: "Under the hood",
          body: [
            "The example domain is a small multi-tenant app with organizations, members, projects, tasks, and an audit log. Tests go through real server functions and the real membership boundary, so the examples demonstrate behavior that mocks routinely miss.",
            "The fast path runs in-process on PGlite with no database service. The same suite can run against Postgres, and concurrency tests intentionally leave the wrapping transaction for a throwaway committed-mode database. The Prisma variant carries the same design with its own verified harness and toolchain pins.",
          ],
        },
        {
          heading: "Use it",
          body: [
            "Choose the Drizzle or Prisma path, read the compatibility checklist, and copy only the layers your repository is missing. The guide ends with adversarial checks: deliberately fail inside the transaction, prove the seam guard catches a second pool, and verify existing tests still mean what they meant before.",
            "The repository is MIT licensed. Take the files, adapt them to the application in front of you, and keep the database boundary understandable.",
          ],
        },
      ],
    },
  },
];

const projectOrder = ["embed-field-guide", "db-test-kit-js", "preview-feedback", "story-points"];

export const projects = projectOrder.map((slug) =>
  projectDetails.find((project) => project.slug === slug),
);

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
