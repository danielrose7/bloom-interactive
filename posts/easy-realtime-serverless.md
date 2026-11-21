---
title: "Easy Realtime in Serverless Cloud"
date: "2026-06-19"
image: "/images/gifs/easy-realtime-serverless.svg"
imageWidth: 640
imageHeight: 400
slug: easy-realtime-serverless
layout: stacked
---

Added real-time sync to [Tote](https://tote.tools) in about 10 minutes. Two things made it that fast.

First, [Ably's](https://ably.com/) onboarding — a short series of structured questions plus a free-text field, likely AI-driven, that ends with a specific product recommendation rather than a docs dump. Landed on the Ably Postgres Connector without having to figure that out myself.

Second, feeding the [Neon real-time comments guide](https://neon.com/guides/real-time-comments) URL directly into a prompt. The guide covers the full stack; the model had everything it needed to generate working code on the first try.

The pattern underneath is a **transactional outbox** — the write and the notification are one atomic database transaction, so there's no case where they fall out of sync. Postgres is the handoff between the stateless (Vercel) and stateful (Ably) halves of the architecture.

Total surface area: 1 Drizzle migration, 1 UI form, 2 ENV vars.

## Update — November 2026

The connector was easy to set up. It was also why the database never slept.

Neon scales compute to zero when nothing is connected. The Ably Postgres Connector keeps a `LISTEN` connection open on its notify channel and regularly writes heartbeats to its own table, so there's always something connected. Result: 141 compute-hours in the first three weeks of November on a database serving a few hundred realtime messages a day.

The fix was to drop the outbox and publish to Ably's REST API right after each write commits. One small helper, called once per mutation. Same channels, same clients, no long-lived connection.

What you give up is the outbox's guarantee: if the publish fails after the commit, that notification is lost. In Tote's case that's fine, because every message just means "refetch". Clients ignore the payload, and a missed ping is corrected on the next refetch or window focus. If your messages *are* the data, keep the outbox, or at least know what it costs.

The takeaway: on scale-to-zero Postgres, anything that holds a connection open (`LISTEN`, pollers, idle workers) is a fixed monthly cost.
