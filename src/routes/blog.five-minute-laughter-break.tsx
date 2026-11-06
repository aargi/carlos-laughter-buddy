import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { SlackLogo } from "@/components/SlackLogo";
import { ShareButton } from "@/components/ShareButton";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "How to Run a 5-Minute Laughter Break With Your Remote Team";
const DESCRIPTION = "A practical guide to a 5-minute laughter break for remote teams: simple laughter exercises at work, an optional format, and how to make it a light Slack team ritual.";
const URL = "https://laughteryoga.lovable.app/blog/five-minute-laughter-break";

export const Route = createFileRoute("/blog/five-minute-laughter-break")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: `${TITLE} — Laughter Circle` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Article",
        headline: TITLE, description: DESCRIPTION, mainEntityOfPage: URL,
        author: { "@type": "Organization", name: "Laughter Circle" },
        publisher: { "@type": "Organization", name: "Laughter Circle" },
      }),
    }],
  }),
  component: LaughterBreakArticle,
});

const linkCls = "font-semibold text-primary underline";
const h2Cls = "font-display text-3xl font-black leading-tight text-foreground";
const h3Cls = "font-display text-xl font-black text-foreground";

const steps = [
  { t: "Pick a low-pressure moment", d: "Right after a long call, mid-afternoon when energy dips, or at the end of a weekly sync. Avoid slots right before important deadlines or customer meetings." },
  { t: "Send a short, optional invitation", d: "One message is enough: what it is, how long it takes, and that skipping is completely fine. Say clearly that cameras can stay off." },
  { t: "Set expectations in one sentence", d: "Explain that laughter exercises start as deliberate, slightly silly laughing, and that it often turns into real laughter on its own. Nobody needs to be funny." },
  { t: "Run two or three short exercises", d: "Keep each one under a minute. Model the exercise first, then invite people to join. Breathe between exercises." },
  { t: "Close with a calm breath", d: "End with one slow breath in and a long exhale, then let everyone go back to work. No debrief, no round of reflections." },
  { t: "Keep it light afterwards", d: "A quick emoji in the channel is plenty. Don't track who took part, and don't follow up with people who skipped." },
];

const exercises = [
  { t: "Greeting laugh", d: "Instead of saying hello, everyone waves at the screen or their room and laughs gently, as if greeting an old friend." },
  { t: "Silent laugh", d: "Laugh with an open mouth and no sound. Useful in shared homes, open offices, or when someone is on mute." },
  { t: "Milkshake laugh", d: "Pretend to pour a drink from one glass to another with an \u201caeee\u201d sound, then \u201cdrink\u201d it and laugh. Simple, visual and a bit absurd." },
  { t: "Phone-call laugh", d: "Hold an imaginary phone and laugh as if someone just told you the best news. Works perfectly with cameras off." },
  { t: "Ho-ho, ha-ha-ha", d: "Clap along to a steady \u201cho-ho, ha-ha-ha\u201d rhythm. It's a classic laughter yoga warm-up and needs no explanation." },
];

const faqs = [
  { q: "Do people actually need to find something funny?", a: "No. Laughter exercises start with intentional laughing, without jokes. Many people find it turns into genuine laughter once they hear others, but there is no expectation that it will." },
  { q: "Does everyone need to be on camera?", a: "No. Most exercises work with cameras off or on mute, and audio-guided sessions don't involve a camera at all." },
  { q: "How often should we do a laughter break?", a: "Whatever feels sustainable. Many teams start with once a week and adjust. A small habit people choose to join is better than a frequent one they feel obliged to attend." },
  { q: "What if someone feels uncomfortable?", a: "That's fine and expected. Make opting out invisible: no attendance list, no follow-up. Silent laughter or simply listening is a valid way to take part." },
  { q: "Is a laughter break a health or therapy session?", a: "No. It's a short social break. It is not a medical treatment and doesn't replace professional support." },
];

function LaughterBreakArticle() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <div className="mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-12">
        <nav aria-label="Main navigation" className="sticky top-0 z-50 -mx-5 mb-10 flex items-center justify-between gap-2 px-5 py-3 md:-mx-6 md:mb-12 md:px-6">
          <Button asChild variant="link" className="h-auto shrink-0 gap-2 p-0 font-display text-base font-black text-foreground no-underline hover:no-underline md:text-xl">
            <Link to="/"><LogoMark size={28} className="hidden sm:block" /><span>Laughter<span className="text-primary">Circle</span></span></Link>
          </Button>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex"><Link to="/story">Our story</Link></Button>
            <ShareButton />
            <Button asChild variant="slack" size="sm"><Link to="/slack"><SlackLogo className="size-4" />Slack</Link></Button>
          </div>
        </nav>

        <article lang="en">
          <header className="border-b pb-10 md:pb-12">
            <div className="flex items-center gap-3 text-sm font-semibold text-muted-foreground">
              <span className="inline-flex items-center gap-2"><Timer className="size-4" aria-hidden="true" /> Practical guide</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-tight md:text-5xl">How to Run a <span className="text-primary">5-Minute Laughter Break</span> With Your Remote Team</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">A laughter break is one of the simplest remote team activities you can try: a few minutes of deliberate, playful laughing that anyone can join from their desk. Here's how to run one without turning it into forced fun.</p>
          </header>

          <div className="max-w-3xl space-y-14 pt-12 text-lg leading-relaxed text-muted-foreground md:space-y-16">
            <section aria-labelledby="what">
              <h2 id="what" className={h2Cls}>What is a laughter break?</h2>
              <p className="mt-5">A laughter break is a short pause in the workday where people laugh on purpose, usually through simple exercises borrowed from <Link to="/laughter-yoga/exercises" className={linkCls}>laughter yoga</Link>. It doesn't rely on jokes, wit or anyone being "the funny one". Someone starts a silly exercise, others follow, and the laughter tends to spread.</p>
              <p className="mt-4">Teams try it for modest, practical reasons: it breaks up long stretches of calls, gives remote colleagues a shared moment that isn't about work, and takes far less time to organize than most virtual team building. We won't promise health outcomes. The honest case is simpler: it's a short, slightly absurd thing to do together, and many people enjoy it.</p>
            </section>

            <section aria-labelledby="steps">
              <h2 id="steps" className={h2Cls}>A step-by-step guide to a 5-minute laughter break</h2>
              <p className="mt-5">Five minutes is a planning slot, not a rule. It leaves room for a quick intro, a few exercises and a calm finish.</p>
              <ol className="mt-6 space-y-5">
                {steps.map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary font-display font-black text-primary-foreground">{i + 1}</span>
                    <div><h3 className={h3Cls}>{s.t}</h3><p className="mt-1">{s.d}</p></div>
                  </li>
                ))}
              </ol>
              <p className="mt-6 rounded-2xl border bg-card p-5 text-base">Sample invitation: <span className="text-foreground">"Laughter break at 3:00 for five minutes. Silly on purpose, cameras optional, totally fine to skip. 😄"</span></p>
            </section>

            <section aria-labelledby="exercises">
              <h2 id="exercises" className={h2Cls}>Easy laughter exercises at work that suit remote teams</h2>
              <p className="mt-5">Choose exercises that work on mute, with cameras off, and in a chair. A few reliable ones:</p>
              <ul className="mt-6 space-y-4">
                {exercises.map((e) => (
                  <li key={e.t} className="rounded-2xl border bg-card p-5"><h3 className={h3Cls}>{e.t}</h3><p className="mt-1 text-base">{e.d}</p></li>
                ))}
              </ul>
              <p className="mt-6">For more ideas with step-by-step instructions, see our <Link to="/laughter-yoga/exercises" className={linkCls}>laughter yoga exercises</Link> collection.</p>
            </section>

            <section aria-labelledby="ai">
              <h2 id="ai" className={h2Cls}>Using an AI-guided audio session instead of a live leader</h2>
              <p className="mt-5">The hardest part of a laughter break is often finding someone willing to lead it. Starting to laugh in front of colleagues takes some nerve, and the organizer can end up feeling like the entertainment.</p>
              <p className="mt-4">An audio-guided session removes that pressure. In Laughter Circle, an AI-voiced character explains each exercise and laughs first, then it's your turn to follow along, with companion laughs from the circle. Nobody on the team has to perform, and each person can join in their own browser, with headphones, whenever it suits them. You can read more about <Link to="/blog/ai-guided-laughter" className={linkCls}>how AI-guided laughter works</Link> and <Link to="/blog/voice-not-screens" className={linkCls}>why we built it around voice rather than screens</Link>.</p>
              <p className="mt-4">It isn't a replacement for a skilled human facilitator, who can read a group and adapt. It's a way to make the break possible on days when nobody wants to lead.</p>
            </section>

            <section aria-labelledby="ritual">
              <h2 id="ritual" className={h2Cls}>Turning it into a light team ritual, including in Slack</h2>
              <p className="mt-5">Rituals stick when they're small, predictable and easy to skip. A few habits help:</p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>Use the same day and time, so nobody has to remember to organize it.</li>
                <li>Post the invitation where the team already is, rather than adding a calendar meeting.</li>
                <li>Rotate who posts the reminder, not who has to lead.</li>
                <li>Let people join asynchronously if a shared time doesn't fit across time zones.</li>
              </ul>
              <p className="mt-4">For many teams, that place is Slack. A short message in a channel is one of the lightest Slack team activities there is: people see it, react, and join if they want. See <Link to="/slack" className={linkCls}>Laughter Circle for Slack</Link> for how it works with your workspace, and our guide to <Link to="/slack/team-building" className={linkCls}>Slack team building</Link> for other short ideas.</p>
            </section>

            <section aria-labelledby="optional">
              <h2 id="optional" className={h2Cls}>Keep it optional, and keep it comfortable</h2>
              <p className="mt-5">Laughter can't be mandated. The moment a laughter break feels like an obligation, it stops working. Say "optional" and mean it: no attendance tracking, no calling on people, no comments about who didn't join. Offer quiet alternatives such as silent laughter or simply listening. And if the format doesn't suit your team, drop it. A good break is one people choose.</p>
            </section>

            <section aria-labelledby="faq" className="border-t pt-10">
              <h2 id="faq" className={h2Cls}>FAQ</h2>
              <dl className="mt-6 space-y-6">
                {faqs.map((f) => (
                  <div key={f.q}><dt className={h3Cls}>{f.q}</dt><dd className="mt-1">{f.a}</dd></div>
                ))}
              </dl>
            </section>
          </div>
          <Button asChild variant="link" className="mt-10 h-auto max-w-full justify-start px-0 whitespace-normal text-left"><Link to="/blog/ai-guided-laughter"><ArrowLeft aria-hidden="true" />Read: how AI-guided laughter works</Link></Button>
        </article>
        <SiteFooter />
      </div>
    </main>
  );
}
