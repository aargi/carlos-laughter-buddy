import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Slack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { SlackLogo } from "@/components/SlackLogo";
import { ShareButton } from "@/components/ShareButton";
import { SiteFooter } from "@/components/SiteFooter";
import polly from "@/assets/app-logos/polly.png.asset.json";

const TITLE = "Why Polly Works: How Quick Questions Drive Team Participation in Slack";
const DESCRIPTION = "A sourced case study of Polly for Slack: one-click polls, pulse checks and recurring questions, what its adoption claims mean, and lessons for Slack apps.";
const URL = "https://laughteryoga.lovable.app/blog/polly-slack";

export const Route = createFileRoute("/blog/polly-slack")({
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
  component: PollySlackArticle,
});

const SOURCES = [
  { title: "Polly: Official homepage", url: "https://www.polly.ai/" },
  { title: "Slack Marketplace: Polly product listing", url: "https://slack.com/marketplace/A04E6JX41-polly" },
  { title: "Polly: Polly for Slack product page", url: "https://www.polly.ai/slack-poll" },
];

function Source({ n }: { n: number }) {
  const source = SOURCES[n - 1];
  if (!source) return null;
  return <a href={source.url} className="font-semibold text-primary underline underline-offset-4" aria-label={`Source ${n}: ${source.title}`}>[{n}]</a>;
}

function PollySlackArticle() {
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
              <img src={polly.url} alt="Polly logo" width={48} height={48} className="size-12 shrink-0 rounded-md object-contain" />
              <span className="inline-flex items-center gap-2"><Slack className="size-4" aria-hidden="true" /> Slack app case study</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-tight md:text-5xl">Why Polly Works: How Quick Questions Drive <span className="text-primary">Team Participation in Slack</span></h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">A question in the channel, a few buttons and a result everyone can see. Polly’s premise is that asking a team something should take no longer than the conversation it belongs to.</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">We build Laughter Circle. This is an editorial case study of a different Slack app, not a claim that our product is better. Polly’s figures below are vendor-reported; we label them as such and separate them from evidence of business outcomes.</p>
          </header>

          <div className="max-w-3xl space-y-14 pt-12 text-lg leading-relaxed text-muted-foreground md:space-y-16">
            <section aria-labelledby="problem">
              <h2 id="problem" className="font-display text-3xl font-black leading-tight text-foreground">The problem: feedback that interrupts the work it is about</h2>
              <p className="mt-5">Teams constantly need small answers: which time works for the meeting, how a sprint went, whether a new process is helping. The traditional route is a form or a survey link—another tab, another login, another reminder when responses are slow.</p>
              <p className="mt-4">That friction has a cost beyond time. When responding feels like a task, fewer people answer, and the people who do answer may not represent the team. Polly’s Marketplace listing frames its pitch around exactly this: “No forms to fill out, no external links to click, no chasing people down.” <Source n={2} /></p>
              <p className="mt-4">Team feedback is most useful when it is easy to give and visible enough that people see it was heard. That is the gap Polly targets inside Slack.</p>
            </section>

            <section aria-labelledby="mechanics">
              <h2 id="mechanics" className="font-display text-3xl font-black leading-tight text-foreground">How Polly works: polls, pulse checks and recurring questions</h2>
              <p className="mt-5">The entry point is a slash command. Typing <code className="rounded bg-muted px-1.5 py-0.5 text-base text-foreground">/polly</code> or <code className="rounded bg-muted px-1.5 py-0.5 text-base text-foreground">/poll</code> in a channel starts a question; the Marketplace listing also documents shortcuts for creating a polly from a message. <Source n={2} /></p>
              <blockquote className="mt-6 border-l-2 border-primary pl-6 text-foreground">
                <p>/poll When should we hold the meeting?</p>
                <footer className="mt-2 text-sm text-muted-foreground">Example command from the Slack Marketplace listing. <Source n={2} /></footer>
              </blockquote>
              <p className="mt-5">From there, the listing describes several formats: <strong className="text-foreground">Slack polls and surveys</strong> with multiple-choice, open-ended and rating questions; <strong className="text-foreground">pulse checks</strong>, described as automated, asynchronous sentiment and health checks for managers, including eNPS; <strong className="text-foreground">async standups</strong> for agile teams; live quizzes; and trigger-based workflows. <Source n={2} /></p>
              <p className="mt-4">Recurring questions are the quiet backbone. Polly’s Slack page describes scheduling a recurring polly for “routine but important tasks: 1-on-1 meeting agendas, weekly check-in, daily standup, and more.” Results appear as responses arrive. <Source n={3} /></p>
              <p className="mt-4">Polly also extends beyond Slack—to Microsoft Teams, the web and presentations—but this case study focuses on the Slack experience. <Source n={1} /> <Source n={2} /></p>
            </section>

            <section aria-labelledby="friction">
              <h2 id="friction" className="font-display text-3xl font-black leading-tight text-foreground">Why frictionless, asynchronous participation matters</h2>
              <p className="mt-5">Inside Slack, the question arrives in the same place as the discussion that prompted it. Responding is a click on a button in the message rather than a trip to another tool. Polly describes this as letting a team respond “in one click, right where the conversation is happening.” <Source n={2} /></p>
              <p className="mt-4">Asynchrony matters as much as speed. A distributed team does not need to be online at the same moment to vote, rate a week or share a blocker. A standup that used to require a meeting can become a set of written answers people give when they start their day.</p>
              <p className="mt-4">Polly’s homepage claims responses that are “7-10x faster” than a typical survey or form. <Source n={3} /> We did not find a published methodology for that comparison, so we treat it as a vendor claim rather than a measured fact. The underlying design logic does not depend on the exact number: fewer steps usually leave fewer places for people to drop off.</p>
            </section>

            <section aria-labelledby="ritual">
              <h2 id="ritual" className="font-display text-3xl font-black leading-tight text-foreground">How small, repeated questions become team rituals</h2>
              <p className="mt-5">A single poll is a tool. The same question on the same day each week starts to become a ritual: a Monday check-in, a Friday “how did this week feel?”, a retro rating at the end of each sprint. Recurrence supplies the cue, and the predictable format means nobody has to design the moment again.</p>
              <p className="mt-4">Visibility completes the loop. When results show up in the channel, people see that others answered and what the team as a whole thinks. That can turn a feedback request into a shared reference point—something a team discusses rather than something that disappears into a spreadsheet.</p>
              <p className="mt-4">The ritual only holds if answers lead somewhere. A weekly pulse that never changes anything teaches people that responding is optional. Asking less often and acting visibly on what you hear will usually matter more than the poll itself. Some questions also call for anonymity and care that a public channel cannot provide.</p>
            </section>

            <section aria-labelledby="evidence">
              <h2 id="evidence" className="font-display text-3xl font-black leading-tight text-foreground">Evidence of adoption: what the claims do and do not say</h2>
              <p className="mt-5">Polly publishes adoption signals, but unlike some vendors it does not, as far as we found, publish definitions for them. Read them as company-reported:</p>
              <ul className="mt-6 space-y-5">
                <li><span className="font-semibold text-accent">“Trusted by 400,000+ teams and enterprises.”</span> This appears on Polly’s homepage. <Source n={1} /> It does not say whether it counts current or lifetime users, workspaces or individual teams, nor whether it covers Slack only or also Microsoft Teams and the web.</li>
                <li><span className="font-semibold text-accent">Named customer logos.</span> The Marketplace listing says Polly is “trusted by teams at Stripe, Docusign, Expedia, Okta, and Twitch,” and Polly’s Slack page displays logos including Okta, Moody’s, Expedia, Tinder, Lattice and PIMCO. <Source n={2} /> <Source n={3} /> Logos indicate that some teams at these companies use Polly, not company-wide deployment or measured results.</li>
                <li><span className="font-semibold text-accent">“7-10x faster response.”</span> A product-page claim compared with “a typical survey or a form,” without a published method. <Source n={3} /></li>
                <li><span className="font-semibold text-accent">Availability in the Slack Marketplace.</span> Polly is listed in Slack’s official app directory with documented commands, shortcuts and an Enterprise Grid note. <Source n={2} /> A listing confirms availability and features; it is not an endorsement of outcomes.</li>
              </ul>
              <p className="mt-6 border-l-2 border-accent pl-5 text-base">We did not find independently audited usage data or controlled studies of Polly. These sources support that Polly is widely distributed and used by teams at recognizable companies. They do not establish that it improves employee engagement, retention or productivity.</p>
            </section>

            <section aria-labelledby="lessons">
              <h2 id="lessons" className="font-display text-3xl font-black leading-tight text-foreground">What other Slack apps can learn from Polly</h2>
              <ul className="mt-6 space-y-5">
                <li><strong className="text-foreground">Make the first action a command people can guess.</strong> “/poll” describes itself. A new user does not need onboarding to try it.</li>
                <li><strong className="text-foreground">Keep the response inside the message.</strong> Every link out of Slack is a chance to lose someone. Buttons in the channel keep participation at one click.</li>
                <li><strong className="text-foreground">Design for asynchrony.</strong> Teams across time zones participate when they can, not when a meeting is scheduled.</li>
                <li><strong className="text-foreground">Turn repetition into a feature.</strong> Scheduled, recurring questions convert a one-off tool into a team habit.</li>
                <li><strong className="text-foreground">Show the result back to the group.</strong> Shared visibility is what makes individual answers feel like team participation.</li>
                <li><strong className="text-foreground">Define your numbers.</strong> A headline count without a denominator is hard to judge. HeyTaco’s published methodology is a useful contrast.</li>
              </ul>
              <p className="mt-5">Polly sits alongside other patterns we have studied. <Link to="/blog/donut-slack" className="font-semibold text-primary underline">Donut</Link> uses Slack to make introductions recur; <Link to="/blog/heytaco-slack" className="font-semibold text-primary underline">HeyTaco</Link> turns appreciation into a daily gesture. Our <Link to="/blog/best-slack-apps-team-building" className="font-semibold text-primary underline">comparison of Slack apps for team building</Link> places them side by side, and our guide to <Link to="/slack/employee-engagement" className="font-semibold text-primary underline">employee engagement in Slack</Link> looks at feedback as one ingredient among several.</p>
            </section>

            <section aria-labelledby="laughter-circle" className="border-t pt-10">
              <h2 id="laughter-circle" className="font-display text-3xl font-black leading-tight text-foreground">Where Laughter Circle fits</h2>
              <p className="mt-5">Polly helps teams ask and answer questions without leaving the flow of work. Laughter Circle explores a different, complementary kind of small moment: not collecting feedback, but sharing a short guided laughter session with colleagues.</p>
              <p className="mt-4"><Link to="/slack" className="font-semibold text-primary underline">Laughter Circle for Slack</Link> starts with an invitation in a channel and opens the session in the browser. It is not a feedback tool, not a replacement for Polly and makes no claim to Polly’s adoption. What the two share is a design question: how can a light, low-effort action become something a team returns to?</p>
            </section>

            <section aria-labelledby="sources" className="border-t pt-10 text-sm">
              <h2 id="sources" className="font-display text-2xl font-black text-foreground">Sources and reading</h2>
              <p className="mt-3">Sources reviewed on November 6, 2026. All usage figures are reported by Polly; the Marketplace listing is a product listing written by the vendor.</p>
              <ol className="mt-5 space-y-3">
                {SOURCES.map((source, index) => <li key={source.url}><a href={source.url} className="text-primary underline underline-offset-4">{index + 1}. {source.title}</a></li>)}
              </ol>
            </section>
          </div>
          <Button asChild variant="link" className="mt-10 h-auto max-w-full justify-start px-0 whitespace-normal text-left"><Link to="/blog/best-slack-apps-team-building"><ArrowLeft aria-hidden="true" />Back to the seven-app comparison</Link></Button>
        </article>
        <SiteFooter />
      </div>
    </main>
  );
}
