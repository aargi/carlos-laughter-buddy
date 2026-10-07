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
- App comparison logos use project-owned asset pointers downloaded from official product sites; internal destinations use TanStack links, keeping images stable and navigation local.
