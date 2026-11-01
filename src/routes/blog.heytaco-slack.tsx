import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Slack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { SlackLogo } from "@/components/SlackLogo";
import { ShareButton } from "@/components/ShareButton";
import { SiteFooter } from "@/components/SiteFooter";
import heytaco from "@/assets/app-logos/heytaco.png.asset.json";

const TITLE = "How HeyTaco Turned Employee Recognition Into a Daily Slack Habit";
const DESCRIPTION = "A sourced look at HeyTaco’s Slack recognition loop: simple taco messages, daily allowances, customer examples, adoption data and lessons for team rituals.";
const URL = "https://laughteryoga.lovable.app/blog/heytaco-slack";

export const Route = createFileRoute("/blog/heytaco-slack")({
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
  component: HeyTacoSlackArticle,
});

const SOURCES = [
  { title: "HeyTaco: Product overview and founder’s account", url: "https://heytaco.com/" },
  { title: "HeyTaco: Peer-to-peer recognition", url: "https://heytaco.com/features/peer-to-peer-recognition" },
  { title: "Slack Marketplace: HeyTaco product listing", url: "https://slack.com/marketplace/A0J4UNFLN-heytaco" },
  { title: "HeyTaco: Where our numbers come from", url: "https://heytaco.com/methodology" },
  { title: "HeyTaco customer story: Deputy—5 countries, 1 recognition habit", url: "https://heytaco.com/customer-stories/deputy" },
];

function Source({ n }: { n: number }) {
  const source = SOURCES[n - 1];
  if (!source) return null;
  return <a href={source.url} className="font-semibold text-primary underline underline-offset-4" aria-label={`Source ${n}: ${source.title}`}>[{n}]</a>;
}

function HeyTacoSlackArticle() {
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
              <img src={heytaco.url} alt="HeyTaco logo" width={48} height={48} className="size-12 shrink-0 rounded-md object-contain" />
              <span className="inline-flex items-center gap-2"><Slack className="size-4" aria-hidden="true" /> Slack app case study</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-tight md:text-5xl">How HeyTaco Turned Employee Recognition Into a <span className="text-primary">Daily Slack Habit</span></h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">A teammate’s name, a taco emoji and a specific thank-you. HeyTaco’s core idea is small enough to fit inside an ordinary work conversation—and repeatable enough to become part of it.</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">We build Laughter Circle. This is an editorial case study of a different team ritual, not a claim that our product is better. Usage figures are attributed and distinguished from evidence of business outcomes.</p>
          </header>

          <div className="max-w-3xl space-y-14 pt-12 text-lg leading-relaxed text-muted-foreground md:space-y-16">
            <section aria-labelledby="problem">
              <h2 id="problem" className="font-display text-3xl font-black leading-tight text-foreground">The problem: everyday contributions go unnoticed</h2>
              <p className="mt-5">Recognition can become something saved for a performance review, an award or a major milestone. Meanwhile, a colleague helps unblock a task, shares context or quietly catches a mistake. Their peers notice; the formal process may not.</p>
              <p className="mt-4">HeyTaco founder Doug Dosberg describes starting a small Slack bot in 2016 because he knew what it felt like to be invisible at work. His aim was not to reinvent recognition but to make appreciation easier to express. In HeyTaco’s Deputy customer story, the problem is similarly concrete: big achievements were celebrated, while everyday wins were missed. <Source n={1} /> <Source n={5} /></p>
              <p className="mt-4">Peer recognition addresses a different gap from manager feedback. The people who see a helpful action can acknowledge it themselves, close to the moment it happens, instead of waiting for someone else to collect and approve the praise.</p>
            </section>

            <section aria-labelledby="mechanics">
              <h2 id="mechanics" className="font-display text-3xl font-black leading-tight text-foreground">How HeyTaco works: a thank-you with a small token</h2>
              <p className="mt-5">Once HeyTaco is installed, a teammate mentions a colleague, adds a 🌮 and writes why they appreciate them. The Slack Marketplace listing describes the core action as “Mention a teammate and add a :taco: to say thanks.” <Source n={3} /></p>
              <blockquote className="mt-6 border-l-2 border-primary pl-6 text-foreground">
                <p>“@Maya thanks for walking me through the release checklist 🌮”</p>
                <footer className="mt-2 text-sm text-muted-foreground">Illustrative example, not a customer message.</footer>
              </blockquote>
              <p className="mt-5">The documented default is five tacos per person per day. Unused giving allowances do not roll over; administrators can change the daily limit. Tacos a person receives accumulate, and teams can configure rewards and leaderboards. The giving allowance and the received balance serve different purposes: one sets a daily opportunity to appreciate; the other records recognition received over time. <Source n={2} /> <Source n={4} /></p>
              <p className="mt-4">The taco is a playful token, not a substitute for the words. “Thanks for helping me” identifies a contribution in a way that an unexplained point cannot. HeyTaco also offers milestones, values tags and other features, but its entry-level behavior remains a short act of peer appreciation. <Source n={1} /> <Source n={2} /></p>
            </section>

            <section aria-labelledby="slack-fit">
              <h2 id="slack-fit" className="font-display text-3xl font-black leading-tight text-foreground">Why it works inside Slack</h2>
              <p className="mt-5">A channel already contains the work conversation that gives the recognition its context. If someone helped with an incident or answered a question, the thank-you can sit alongside that exchange. Participants do not need to switch to a separate recognition destination just to express appreciation.</p>
              <p className="mt-4">Slack mentions direct attention to a person; emoji make the action recognizable; channel messages let others see, reply and join in. HeyTaco’s product materials describe recognition becoming visible where the team already talks. The Marketplace listing presents it as channel-based recognition without an extra login for the core interaction. These are product descriptions, not independent usability test results. <Source n={2} /> <Source n={3} /></p>
              <p className="mt-4">The interaction is also asynchronous. It does not require colleagues in different time zones to attend a recognition meeting at the same time. That makes Slack a useful starting point for distributed teams—but installing an app does not ensure that less-visible contributions will be noticed.</p>
            </section>

            <section aria-labelledby="simplicity">
              <h2 id="simplicity" className="font-display text-3xl font-black leading-tight text-foreground">Why the interaction is so simple</h2>
              <p className="mt-5">The core action reuses habits people already have: mention someone and send a message. Adding a taco is a small extension of that behavior, not a new form, nomination workflow or meeting to organize.</p>
              <p className="mt-4">That matters because appreciation is easy to postpone when the process is larger than the moment. The product gives a thank-you a recognizable shape without asking the sender to prepare a formal award. A team can understand the gesture by seeing a colleague use it.</p>
              <p className="mt-4">Playfulness can lower the stakes, but the specific message gives the gesture meaning. The daily default is intended to keep recognition timely and intentional; HeyTaco’s methodology explicitly says five is a design choice, not a universally proven optimum. A limit alone cannot prevent favoritism, reciprocal point-trading or shallow praise. <Source n={4} /></p>
            </section>

            <section aria-labelledby="habit">
              <h2 id="habit" className="font-display text-3xl font-black leading-tight text-foreground">How recognition becomes a habit</h2>
              <p className="mt-5">The loop is easy to recognize: notice something helpful, say thanks with a taco, see the recognition land and have another opportunity tomorrow. The daily reset supplies a recurring cue; colleagues’ messages supply examples of what to notice and how to express it.</p>
              <p className="mt-4">Deputy illustrates how the behavior can become a shared ritual rather than just a product feature. In HeyTaco’s customer story, Senior Software Engineering Manager Luis Sanchez describes an engineering initiative that began in a Slack channel called Taco Tuesday, later renamed Gratitude. Cross-functional colleagues modeled appreciation, and HR later supported the rollout. <Source n={5} /></p>
              <blockquote className="mt-6 border-l-2 border-accent pl-6 text-foreground">
                <p>“With daily tacos, it stays top of mind — and that’s when recognition becomes a habit.”</p>
                <footer className="mt-2 text-sm text-muted-foreground">Luis Sanchez, Deputy, quoted in HeyTaco’s customer story. <Source n={5} /></footer>
              </blockquote>
              <p className="mt-5">The same story describes quarterly town-hall shout-outs for top givers, not only recipients. That matters to the design lesson: a ritual can celebrate the act of appreciating, rather than only who accumulates the most tokens. It is a named customer’s account, not proof that the same configuration will work everywhere.</p>
              <p className="mt-4">The social environment still does much of the work. Leaders need to make sincere appreciation normal without setting a praise quota. Teams should consider quiet work, different roles and comfort with public recognition. An allowance creates an opportunity, not an obligation.</p>
            </section>

            <section aria-labelledby="evidence">
              <h2 id="evidence" className="font-display text-3xl font-black leading-tight text-foreground">Evidence of adoption: read the definitions, not just the headline</h2>
              <p className="mt-5">HeyTaco publishes definitions for its usage claims. That makes them more useful to a reader, while leaving them company-reported rather than independently audited:</p>
              <ul className="mt-6 space-y-5">
                <li><span className="font-semibold text-accent">5,000+ teams since 2016.</span> Its methodology, marked verified in October 2026 for this figure, counts distinct Slack workspaces and Microsoft Teams organizations that have ever used HeyTaco, including former customers. It is not a count of current paying customers or Slack-only teams. <Source n={4} /></li>
                <li><span className="font-semibold text-accent">46 million+ tacos sent.</span> Also marked verified in October 2026, this is a cumulative count of tacos people have given across HeyTaco workspaces since launch. It measures tokens given, not unique participants or employee satisfaction. <Source n={4} /></li>
                <li><span className="font-semibold text-accent">About 67% average daily participation.</span> The methodology marks this metric verified in August 2026 and defines it as a rolling 90-day average among recently active users in paid workspaces. “Recently active” means someone gave or received a taco in the previous 30 days; participation includes giving or receiving. This does not mean 67% of every employee actively gives recognition each day. <Source n={4} /></li>
                <li><span className="font-semibold text-accent">A documented customer ritual.</span> Deputy’s story provides a named manager, a channel-based launch and described cross-functional adoption. It offers context for how a program spreads, rather than an independently measured company-wide effect. <Source n={5} /></li>
              </ul>
              <p className="mt-6 border-l-2 border-accent pl-5 text-base">Product activity, employee sentiment and business results are different measures. These sources support reported adoption and repeated use. They do not establish that HeyTaco causes better retention, productivity or wellbeing, or that every recognition message is meaningful.</p>
            </section>

            <section aria-labelledby="lessons">
              <h2 id="lessons" className="font-display text-3xl font-black leading-tight text-foreground">What other Slack apps can learn from it</h2>
              <ul className="mt-6 space-y-5">
                <li><strong className="text-foreground">Make the smallest useful action obvious.</strong> A mention, a token and a reason are enough to start. The user does not need to understand every feature before doing something worthwhile.</li>
                <li><strong className="text-foreground">Stay close to the moment you serve.</strong> Recognition belongs near the conversation about the work, not behind an unrelated workflow.</li>
                <li><strong className="text-foreground">Give repetition a purpose.</strong> A daily cue can bring appreciation back to mind; it should not become pressure to manufacture activity.</li>
                <li><strong className="text-foreground">Let people model the behavior.</strong> Deputy’s example suggests that visible participation and local champions matter alongside product mechanics.</li>
                <li><strong className="text-foreground">Keep the human meaning ahead of the score.</strong> The message explains what mattered. Points and rewards can support a ritual, but should not replace its purpose.</li>
                <li><strong className="text-foreground">Publish the denominator.</strong> Lifetime workspaces, active users, givers and recipients answer different questions. Clear metric definitions make adoption claims easier to judge.</li>
              </ul>
              <p className="mt-5">Recognition is one part of <Link to="/slack/employee-engagement" className="font-semibold text-primary underline">employee engagement in Slack</Link>, alongside social connection, breaks and shared activities. Our <Link to="/slack/team-building" className="font-semibold text-primary underline">Slack team-building guide</Link> looks at a mix of formats rather than a single app as the answer to every team need.</p>
            </section>

            <section aria-labelledby="laughter-circle" className="border-t pt-10">
              <h2 id="laughter-circle" className="font-display text-3xl font-black leading-tight text-foreground">Where Laughter Circle fits</h2>
              <p className="mt-5">HeyTaco turns recognition into a simple, repeatable gesture inside Slack. Laughter Circle explores how small moments of shared laughter can become another kind of team ritual: a brief invitation, a guided session and an opportunity to take part again.</p>
              <p className="mt-4"><Link to="/slack" className="font-semibold text-primary underline">Laughter Circle for Slack</Link> starts with an invitation in a channel and opens a short guided laughter session in the browser. It is not better than HeyTaco, a substitute for appreciating a colleague or a claim to the same adoption or outcomes. The connection between the approaches is the design question: how can a small human action fit naturally into the team’s day?</p>
            </section>

            <section aria-labelledby="sources" className="border-t pt-10 text-sm">
              <h2 id="sources" className="font-display text-2xl font-black text-foreground">Sources and reading</h2>
              <p className="mt-3">Sources reviewed on November 1, 2026. Product metrics retain the verification dates and scope published by HeyTaco. The Marketplace listing is a product listing; the Deputy story is published by the vendor.</p>
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