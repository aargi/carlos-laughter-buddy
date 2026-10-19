<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Slack integration: only via Lovable Slack App User Connector (gateway owns OAuth tokens); we store only the opaque lovack handle; scheduler = pg_cron (15 min) → /api/public/slack/scheduler with LOVABLE_CRON_SECRET; deliveries claimed atomically (claim_slack_deliveries) and ambiguous post outcomes go to `unknown`, never auto-retried. Why: no duplicate posts, no Slack tokens in our DB.
- Office-character voice previews are pre-generated ElevenLabs MP3 pairs served as static assets; never synthesize them on each click, to keep playback quick and recurring voice costs at zero.
- Main-session playback uses static MP3s with local browser speech fallback; /api/tts is retired with HTTP 410 and no provider calls. Generate fixed audio offline only, so anonymous sessions cannot incur synthesis charges.
- App comparison logos use project-owned asset pointers downloaded from official product sites; internal destinations use TanStack links, keeping images stable and navigation local.
- Laughter-yoga editorial pages are sibling leaf routes under the existing layout, with per-page metadata and staticData.sitemap inclusion; research pages cite sources and distinguish study populations from the unstudied app to avoid conflating evidence.
- Laughter-therapy editorial pages use an Outlet-only parent and sibling leaf routes with individual metadata and sitemap decisions, so the pillar can gain child pages without duplicate URLs.
- Professional pages use an Outlet-only parent with sibling index/find/join leaves; link discovery to find and applications to join, keeping directory discovery and bookings clearly separate from application submission.
- Professional applications share a browser-safe Zod schema with a public server function, use a publishable insert-only database client, and confirm success only after persistence; application rows remain private and do not create profiles or bookings.
- Planned professional-request requirements live in a browser-safe data module with focused tests; editorial copy consumes the advance-notice value, while submission and booking stay unavailable until implemented, to keep future rules consistent without implying current service availability.
