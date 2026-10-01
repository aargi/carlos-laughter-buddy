// Pure Block Kit builder.
export function buildLaughMessage(opts: { url: string; guide: string; isTest?: boolean }) {
  const title = "3-minute laugh break 😂";
  const description = `${opts.guide} is ready to guide today’s Laughter Circle. Take three minutes to laugh, reset and return lighter.`;
  const text = `${title}\n${description}\nStart 3-minute laugh break: ${opts.url}\nAnonymous by design: only aggregate participation is measured.`;
  return {
    text, // full fallback for notifications and screen readers
    blocks: [
      { type: "header", text: { type: "plain_text", text: title, emoji: true } },
      { type: "section", text: { type: "mrkdwn", text: description } },
      {
        type: "actions",
        elements: [{ type: "button", style: "primary", text: { type: "plain_text", text: "Start 3-minute laugh break", emoji: true }, url: opts.url, action_id: "open_session" }],
      },
      { type: "context", elements: [{ type: "mrkdwn", text: "Anonymous by design: only aggregate participation is measured." }] },
    ],
    unfurl_links: false,
    unfurl_media: false,
  };
}

const GUIDES = ["Carlos", "Amara", "Kenji", "Nonna Rosa", "Tiago", "Ingrid", "Priya", "Big Walt", "Zoe", "Malik"];
export function guideForSlot(slot: Date): string {
  return GUIDES[Math.floor(slot.getTime() / 86400000) % GUIDES.length]!;
}
