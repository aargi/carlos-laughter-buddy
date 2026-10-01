// Pure Block Kit builder.
export function buildLaughMessage(opts: { url: string; guide: string; isTest?: boolean }) {
  const title = "Laugh break 😂";
  const headline = "Time for a laugh break!";
  const description = `${opts.guide} is guiding a ~3 minute Laughter Circle. Join from your browser, laugh along, feel lighter.`;
  const text = `${title}\n${headline}\n${description}\nStart laughing: ${opts.url}\nAnonymous: Laughter Circle only counts totals, never who joined.`;
  return {
    text, // full fallback for notifications and screen readers
    blocks: [
      { type: "header", text: { type: "plain_text", text: title, emoji: true } },
      { type: "section", text: { type: "mrkdwn", text: `*${headline}*\n${description}` } },
      {
        type: "actions",
        elements: [{ type: "button", style: "primary", text: { type: "plain_text", text: "Start laughing", emoji: true }, url: opts.url, action_id: "open_session" }],
      },
      { type: "context", elements: [{ type: "mrkdwn", text: "Anonymous: Laughter Circle only counts totals, never who joined." }] },
    ],
    unfurl_links: false,
    unfurl_media: false,
  };
}

const GUIDES = ["Carlos", "Amara", "Kenji", "Nonna Rosa", "Tiago", "Ingrid", "Priya", "Big Walt", "Zoe", "Malik"];
export function guideForSlot(slot: Date): string {
  return GUIDES[Math.floor(slot.getTime() / 86400000) % GUIDES.length]!;
}
