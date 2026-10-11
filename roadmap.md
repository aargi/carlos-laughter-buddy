# Roadmap

- [x] Correct English default SEO metadata and verify self-referencing canonical URLs on leaf pages.

- [x] Add official app logos and links beneath Best for in the seven-app comparison; Laughter Circle links to For Slack. Verified all seven logos and the internal destination in the browser.

- [x] Add reusable ElevenLabs voice and laugh demos to all six office characters on For Slack.

- [x] Refresh Slack message copy, test delivery, and request publication. Slack bot avatar must be changed in Slack app settings by the owner.

- [x] Closing screen "What's next?" section: 3 main CTAs (new session with another AI guide, session with a laughter yoga professional, custom Pro avatar) + 1 smaller CTA (sign up as laughter yoga professional).
- [x] Correct "FinYoga" → "laughter yoga" wording.
- [x] Verify build/typecheck clean after changes.
- [x] Share button (copy link + social networks: X, WhatsApp, Facebook, LinkedIn; Web Share API on mobile) on Home and Closing.
- [x] Our Story page (/story) linking the project to Running Hackathon Barcelona, with CTA to try the session; linked from Home nav.
- [x] Group laugh ON by default: two "buddy" avatars laugh the exercise's own pattern (ha/he/hi…) alongside the user on "Your turn", with ON/OFF toggle in the circle.
- [x] New brand kit "Fiesta Tropical" (dark plum + fuchsia + coral + yellow) applied app-wide, aura glows re-lit for dark background.
- [x] Vídeo subido por el usuario en la parte superior de /story (CDN asset, vertical, poster, autoplay+controles)
- Logo Laughter Circle: rejected generic flat icons; must match the site's illustrated/gouache avatar style with aura circles. IN PROGRESS
- [x] Laughter Circle for Slack MVP built; tests + security scan done. Remaining: user publishes, adds redirect URL in Slack app, real end-to-end connect test.
- [x] Scheduler every 15 min (user choice).
- [x] Slack plan changes: completeConnectorConnection, sessionStorage temp id + event purge on token expiry, client-side open (estimated), no auto-retry on ambiguous errors + `unknown` state, Block Kit fallback text, slack_workspace_members schema + owner-deletion behaviour. Then implement MVP, tests, Deep Security Scan.
- [x] New SEO page /slack/team-building (title: Slack Team Building: Simple Activities Your Team Can Do Without Another Meeting); SlackWaitlistForm extracted to shared component; slack.tsx converted to layout with slack.index.tsx leaf.
- [x] New SEO page /blog/best-slack-apps-team-building ("7 Best Slack Apps for Team Building in 2026"): honest comparison of Laughter Circle, Donut, Trivia, CultureBot, HeyTaco, Polly, Ricotta; blog.tsx layout; footer link; published.
- [x] New SEO page /slack/employee-engagement (Employee Engagement in Slack: Simple Ways to Help Teams Connect): six engagement approaches with guided laughter sessions as one of them, linking to /slack; included in sitemap.
- [x] Waitlist forms confirm delivery before showing success: shared src/lib/waitlist.ts returns true only when the API stores the row; SlackWaitlistForm and index.tsx WaitlistForm show a sending state and an inline error on failure. Verified in browser (success + aborted network + invalid email) and by reading rows back from the database.
- [x] New SEO page /slack/icebreakers (Slack Icebreakers: Simple Ideas to Help Teams Connect): six balanced icebreaker formats, guided laughter as one optional shared experience, natural links to the Slack hub, team building and employee engagement pages; included in sitemap and published.
- [x] New SEO page /slack/remote-teams (Remote Team Building in Slack: Simple Ways to Help Distributed Teams Connect): six ways to connect distributed teams, guided laughter as one shared experience, links to /slack, /slack/team-building, /slack/employee-engagement and /slack/icebreakers; included in sitemap, then publish.
- [x] New SEO page /slack/wellness (Slack Wellness: Simple Ways to Support Wellbeing at Work): six wellbeing approaches, guided laughter as one shared break option with no health claims, links to all five related pages; included in sitemap, then publish.
