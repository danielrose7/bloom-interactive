// Open source projects: card copy for /open-source and long-form case study
// copy for /open-source/[slug]. Facts here come from each repo's README and docs.

export const projects = [
  {
    slug: "story-points",
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
            "Every tool that can run a planning-poker session asks for something before the first vote: an account for the facilitator, a seat for everyone, a paid tier once the team grows past a cap. The free ones tend to forget everything when the session ends, so the deck, the settings, and the history are gone by the next sprint.",
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
    caseStudy: {
      eyebrow: "Case study",
      role: "Product and engineering",
      facts: [
        { value: "~13 KB", label: "gzipped widget" },
        { value: "0", label: "accounts or extensions" },
        { value: "117", label: "unit tests" },
        { value: "168", label: "browser checks" },
      ],
      sections: [
        {
          heading: "The problem",
          body: [
            "When an agency sends a client a preview of their website, the feedback comes back by email, text message, or a phone call, with no link to the part of the page it was about. \"The second thing on the services page looks off\" has to be turned back into a place on a page, and then into a change, by hand.",
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
          heading: "Where it's headed",
          body: [
            "It is not deployed publicly yet. Next up is deployment, then tenancy, then a versioned API and an apply-feedback skill so an agent can work the whole loop: pull the open threads, change the site, reply with what changed, and resolve.",
            "Follow along or open an issue on the repo.",
          ],
        },
      ],
    },
  },
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}
