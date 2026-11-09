import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Slack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { SlackLogo } from "@/components/SlackLogo";
import { ShareButton } from "@/components/ShareButton";
import { SiteFooter } from "@/components/SiteFooter";
import ricotta from "@/assets/app-logos/ricotta.png.asset.json";

const TITLE = "Why Ricotta Works: Turning Slack Into a Social Space for Teams";
const DESCRIPTION = "An evidence-based Ricotta Slack case study: asynchronous games, icebreakers, coffee chats and team rituals, with sourced pricing, adoption claims and limits.";
const URL = "https://laughteryoga.lovable.app/blog/ricotta-slack";

export const Route = createFileRoute("/blog/ricotta-slack")({
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
  component: RicottaSlackArticle,
});

const SOURCES = [
  { title: "Ricotta: Official homepage, features and headline figures", url: "https://www.ricotta.team/" },
  { title: "Ricotta: Games and trivia features", url: "https://www.ricotta.team/trivia-features" },
  { title: "Ricotta: Dedicated Slack pricing page and pricing FAQs", url: "https://www.ricotta.team/trivia-pricing" },
  { title: "Slack Marketplace: Ricotta Games, Trivia & Icebreakers", url: "https://slack.com/marketplace/A01H1G2MVJR-ricotta-trivia" },
  { title: "Ricotta: About the company and its origins", url: "https://www.ricotta.team/about" },
  { title: "Slack Marketplace: Trivia Games, Birthday, Watercooler", url: "https://slack.com/marketplace/A012T9P9VQF-trivia" },
];

function Source({ n }: { n: number }) {
  const source = SOURCES[n - 1];
  if (!source) return null;
  return <a href={source.url} className="font-semibold text-primary underline underline-offset-4" aria-label={`Source ${n}: ${source.title}`}>[{n}]</a>;
}

const FAQ = [
  { q: "What is Ricotta Games & Trivia?", a: "Ricotta is a Slack social team-building app offering trivia, picture quizzes, icebreakers, word games, two-player games and virtual coffee. Its advertised scheduler and leaderboards support recurring activities." },
  { q: "Can teammates play at different times?", a: "Ricotta advertises asynchronous trivia and picture contests, plus asynchronous or timed word games. This allows participation without everyone being online together; a coffee conversation still requires people to arrange a shared time." },
  { q: "Is Ricotta free?", a: "The dedicated pricing page offers a 14-day trial without a credit card and says a paid plan is required to keep playing after it ends. On November 8, 2026, Basic was listed at $34 per month, or $24 per month under the Yearly option, for up to 50 users. Confirm current billing terms with Ricotta." },
  { q: "Is Ricotta the same app as Trivia?", a: "No. Ricotta at ricotta.team and Trivia at trytrivia.co are separate products. Both offer games and social features, including coffee-related interactions; Ricotta's broad social positioning is not proof that these features are exclusive to it." },
  { q: "Do Ricotta's adoption figures prove better employee engagement?", a: "No. Ricotta reports 10,000+ teams on its homepage, but the pages reviewed do not define current active usage or provide independent verification. Team counts, scores and testimonials do not establish improvements in wellbeing, productivity or retention." },
];

function RicottaSlackArticle() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <div className="mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-12">
        <nav aria-label="Main navigation" className="-mx-5 mb-10 flex items-center justify-between gap-2 px-5 py-3 md:-mx-6 md:mb-12 md:px-6">
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
              <img src={ricotta.url} alt="Ricotta logo" width={48} height={48} className="size-12 shrink-0 rounded-md object-contain" />
              <span className="inline-flex items-center gap-2"><Slack className="size-4" aria-hidden="true" /> Slack app case study</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-tight md:text-5xl">Why Ricotta Works: Turning Slack Into a <span className="text-primary">Social Space for Teams</span></h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">A workplace channel can be busy all day without giving colleagues much space to know each other. Ricotta’s proposition is to put small social openings—an icebreaker, a word puzzle, a coffee invitation—where the team already spends time.</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">We build Laughter Circle. This is an editorial analysis of Ricotta’s product design, not a ranking or a claim that our app is better. “Works” refers to the coherence of its approach and reported adoption, not proven business or health outcomes.</p>
          </header>

          <div className="max-w-3xl space-y-14 pt-12 text-lg leading-relaxed text-muted-foreground md:space-y-16">
            <section aria-labelledby="problem">
              <h2 id="problem" className="font-display text-3xl font-black leading-tight text-foreground">The problem: a communication tool is not automatically a social space</h2>
              <p className="mt-5">Slack makes it easy to exchange work messages. It does not automatically supply the reason to talk about something else. A new colleague may be comfortable answering a project question but reluctant to start an unrelated conversation in a quiet channel.</p>
              <p className="mt-4">For distributed teams, recreating that opening through a social meeting brings its own coordination: a host, a calendar slot and another reason to be on camera. Ricotta Games &amp; Trivia positions itself as a collection of social games and icebreakers inside Slack, including asynchronous activities. The product addresses the missing invitation rather than asking everyone to adopt a separate social network. <Source n={1} /> <Source n={4} /></p>
              <p className="mt-4">That is a useful, bounded problem. Creating an occasion for conversation is not the same as creating trust, resolving isolation or fixing employee engagement.</p>
            </section>

            <section aria-labelledby="origins">
              <h2 id="origins" className="font-display text-3xl font-black leading-tight text-foreground">Origins: from work coordination to taking breaks together</h2>
              <p className="mt-5">Ricotta’s About page says it began during lockdown with OKRs in Slack, then added task boards, stand-ups, todos and kudos. In the company’s account, those tools still left social isolation unaddressed, prompting a move into asynchronous trivia, games and icebreakers. <Source n={5} /></p>
              <p className="mt-4">The interesting product shift is from organizing work to making room around work. Ricotta describes itself as a remote, asynchronous team; its games reflect that preference for interaction without a shared meeting. This is the company’s origin story, not an independently verified account of its effects.</p>
              <p className="mt-4">The About page also mentions “3000+ teams” and upcoming plans for 2022. Those details make it a historical source, not a reliable current usage count. We do not infer an exact founding or launch date from the page’s copyright notice. <Source n={5} /></p>
            </section>

            <section aria-labelledby="formats">
              <h2 id="formats" className="font-display text-3xl font-black leading-tight text-foreground">How Ricotta works: several ways to enter the conversation</h2>
              <p className="mt-5">Ricotta’s breadth matters because not everyone enjoys the same kind of social moment. Its official pages describe several entry points, with different levels of exposure and commitment:</p>
              <ul className="mt-6 space-y-5">
                <li><strong className="text-foreground">A shared challenge.</strong> Trivia and picture quizzes include weekly and custom contests. They give colleagues a common question to answer without requiring them to invent a topic. <Source n={2} /></li>
                <li><strong className="text-foreground">A personal opening.</strong> Icebreakers include This or That, Two Truths and a Lie, coworker questions and watercooler prompts. A preference or short story can start a conversation without testing specialist knowledge. <Source n={1} /> <Source n={2} /></li>
                <li><strong className="text-foreground">A collaborative thread.</strong> Word Chain, Word Building, Hangman and Story Building make the evolving activity itself the topic. The features page advertises word games in English, Spanish, German and French, with asynchronous or timed modes. <Source n={2} /></li>
                <li><strong className="text-foreground">A smaller interaction.</strong> Two-player games such as Tic-Tac-Toe, Connect4 and Rock Paper Scissors run in direct messages. These offer a one-to-one alternative to appearing in front of a channel. <Source n={2} /></li>
                <li><strong className="text-foreground">A conversation beyond the game.</strong> The homepage lists Virtual Coffee; the Marketplace describes scheduling virtual coffee and game sessions, alongside virtual catchups. Coffee is a different commitment from answering an asynchronous quiz: the conversation still needs a mutually workable time. <Source n={1} /> <Source n={4} /></li>
              </ul>
              <p className="mt-5">Leaderboards and scheduling sit around these formats. Ricotta advertises daily, weekly, monthly and all-time rankings, plus a game scheduler and dashboard. Those tools can make activities repeatable and results visible; they do not tell us whether participants feel more connected. <Source n={2} /></p>
            </section>

            <section aria-labelledby="async">
              <h2 id="async" className="font-display text-3xl font-black leading-tight text-foreground">Why asynchronous participation changes the invitation</h2>
              <p className="mt-5">A social call asks, “Can you be here at this time?” An asynchronous activity can ask, “Would you like to join when you have a moment?” Ricotta explicitly advertises asynchronous trivia and picture contests and auto-scheduled activities. <Source n={2} /> <Source n={4} /> That removes the need for every participant to be online simultaneously.</p>
              <p className="mt-4">The Slack setting reduces another kind of friction. People already know how to find a channel, read a prompt and respond. A quiz or icebreaker brings a reason to interact into that familiar setting rather than adding a new destination to check.</p>
              <p className="mt-4">There is a trade-off. Asynchronous play offers flexibility, not the same experience as laughing or talking together live. Teams should check activity windows and notifications against their time zones rather than assume every scheduled event is equally accessible. Two-player games and virtual coffee also involve another person’s availability.</p>
              <p className="mt-4">Our guide to <Link to="/slack/icebreakers" className="font-semibold text-primary underline">Slack icebreakers</Link> explores lighter prompts; our <Link to="/slack/team-building" className="font-semibold text-primary underline">Slack team building guide</Link> considers how to mix asynchronous and shared activities rather than treating them as interchangeable.</p>
            </section>

            <section aria-labelledby="rituals">
              <h2 id="rituals" className="font-display text-3xl font-black leading-tight text-foreground">From scheduled content to a recurring social ritual</h2>
              <p className="mt-5">Ricotta’s features page names a Wednesday weekly quiz and Friday watercooler icebreakers. <Source n={2} /> The combination offers something more flexible than a weekly competition alone: a recognizable rhythm with different ways to join.</p>
              <p className="mt-4">The scheduler supplies the cue. The activity supplies a small action. Replies, stories and ongoing references can give people a reason to return. This is our interpretation of the design—not evidence that every installation becomes a team ritual. A schedule is automated delivery; a ritual exists only when people attach meaning to it.</p>
              <p className="mt-4">The Marketplace quotes Krys Parsons, DEI and HR Coordinator at Education Analytics, saying colleagues particularly enjoyed the Weekly Trivia Contest. It also quotes Kelly Pritchard, Director People Ops at DarwinAI, describing friendly competition. These are named, vendor-selected customer accounts, not representative surveys or independently measured improvements. <Source n={4} /></p>
              <p className="mt-4">The strongest practical lesson is to keep the rhythm recognizable without making every round compulsory. A quieter participant may enjoy an occasional word game more than an always-visible ranking.</p>
            </section>

            <section aria-labelledby="evidence">
              <h2 id="evidence" className="font-display text-3xl font-black leading-tight text-foreground">Evidence of adoption: what the official numbers actually say</h2>
              <p className="mt-5">Ricotta publishes substantial headline figures, but its pages do not agree on all of them. In our November 8, 2026 review:</p>
              <ul className="mt-6 space-y-5">
                <li><span className="font-semibold text-accent">10,000+ teams.</span> The homepage says teams “love Ricotta” and “use” it. The Marketplace says 5,000+ teams; the historically worded About page says 3,000+. We found no definition of paid versus trial teams, current active versus lifetime usage, or unique organizations. These are source-specific claims, not three comparable measurements. <Source n={1} /> <Source n={4} /> <Source n={5} /></li>
                <li><span className="font-semibold text-accent">28+ games.</span> The homepage advertises this total but also retains a 15+ games section. The features page says 15+; the Marketplace describes 20+ games and trivia. Counting conventions or update dates may differ, but the pages reviewed do not reconcile them. <Source n={1} /> <Source n={2} /> <Source n={4} /></li>
                <li><span className="font-semibold text-accent">50,000+ questions.</span> The homepage also contains an older-looking 20,000+ question section. The features page advertises 25K+ questions, while the Marketplace says 30K+. Category counts likewise differ: 15+ and 30 on the homepage, 25 on the features page and 35+ on the Marketplace. We have not independently counted the library. <Source n={1} /> <Source n={2} /> <Source n={4} /></li>
              </ul>
              <p className="mt-6 border-l-2 border-accent pl-5 text-base">All these figures are company-reported. A vendor-written Slack Marketplace listing is not independent verification, and customer logos do not establish company-wide adoption. The sources reviewed do not provide independently audited usage or evidence that Ricotta causes better productivity, profitability, retention or wellbeing.</p>
              <p className="mt-4">The defensible conclusion is that Ricotta reports broad adoption and documents a substantial set of social features. Its promotional language about burnout and business performance should not be treated as demonstrated product outcomes.</p>
            </section>

            <section aria-labelledby="pricing">
              <h2 id="pricing" className="font-display text-3xl font-black leading-tight text-foreground">Pricing and business model: use the dedicated page</h2>
              <p className="mt-5">Ricotta sells tiered subscriptions with user caps rather than presenting the core paid plans as a per-person price. Its dedicated Slack pricing page lists the following dollar amounts, reviewed on November 8, 2026. The Yearly option displays monthly rates, not the total annual charge. <Source n={3} /></p>
              <dl className="mt-6 divide-y border-y text-base">
                <div className="py-4"><dt className="font-semibold text-foreground">Basic · up to 50 users</dt><dd className="mt-1">$34/month on Monthly; $24/month on Yearly.</dd></div>
                <div className="py-4"><dt className="font-semibold text-foreground">Standard · up to 50 users</dt><dd className="mt-1">$39/month on Monthly; $29/month on Yearly.</dd></div>
                <div className="py-4"><dt className="font-semibold text-foreground">Growth · up to 200 users</dt><dd className="mt-1">$59/month on Monthly; $44/month on Yearly.</dd></div>
                <div className="py-4"><dt className="font-semibold text-foreground">Enterprise · up to 500 users</dt><dd className="mt-1">$99/month on Monthly; $79/month on Yearly.</dd></div>
              </dl>
              <p className="mt-5">The homepage’s Growth figures differ: $54/month and $39/month, rather than the dedicated page’s $59 and $44. It also uses “Everything in Free” wording. We prioritize the dedicated pricing page, whose FAQ says the 14-day trial requires no credit card, does not automatically charge at the end and requires upgrading to keep playing. That is not a promise of a permanent free plan. <Source n={1} /> <Source n={3} /></p>
              <p className="mt-4">On that page, Basic excludes Daily Anagram and Weekly Connections; Standard adds them without raising the user cap. Growth raises the cap to 200, and Enterprise adds admins with a 500-user cap. Larger teams are directed to contact Ricotta; education and nonprofit discounts are also advertised. Confirm current billing and eligibility before purchasing, especially given the inconsistent pages. <Source n={3} /></p>
            </section>

            <section aria-labelledby="comparison">
              <h2 id="comparison" className="font-display text-3xl font-black leading-tight text-foreground">Ricotta versus Trivia: overlapping tools, a broader social framing</h2>
              <p className="mt-5">Ricotta is a separate product from Trivia at trytrivia.co, covered in our <Link to="/blog/trivia-slack" className="font-semibold text-primary underline">Trivia Slack case study</Link>. Ricotta’s positioning puts a collection of social interactions—icebreakers, coffee, word games and one-to-one play—alongside trivia rather than making the quiz the entire story.</p>
              <p className="mt-4">That is a difference in emphasis, not an exclusive feature boundary. Trivia also advertises self-paced quizzes, VirtualCoffee, Water Cooler prompts and other social features in its Marketplace listing. Both products extend beyond competitive trivia. <Source n={4} /> <Source n={6} /></p>
              <p className="mt-4">The useful comparison is therefore not “which has more games?” It is which formats teammates actually want, how scheduling works for them and whether the experience invites conversation or mostly records scores. Our <Link to="/blog/best-slack-apps-team-building" className="font-semibold text-primary underline">comparison of Slack apps for team building</Link> places both among other approaches to workplace participation.</p>
            </section>

            <section aria-labelledby="limits">
              <h2 id="limits" className="font-display text-3xl font-black leading-tight text-foreground">The limits: a social invitation can become another demand</h2>
              <ul className="mt-6 space-y-5">
                <li><strong className="text-foreground">Notification fatigue.</strong> A catalogue of activities is not an instruction to schedule all of them. Too many prompts can compete with work messages and make the social channel easy to ignore.</li>
                <li><strong className="text-foreground">Competition and exclusion.</strong> Leaderboards can motivate enthusiasts while discouraging people who dislike rankings. Language, cultural references and available time can influence scores; they are not measures of commitment to the team.</li>
                <li><strong className="text-foreground">Forced fun.</strong> A low-effort game stops being voluntary if managers expect attendance or ask why someone skipped it. Icebreakers should also leave room to avoid personal disclosures.</li>
                <li><strong className="text-foreground">Superficial engagement.</strong> An answer or a reaction shows an interaction, not necessarily belonging. A busy dashboard cannot establish that people feel listened to or supported.</li>
              </ul>
              <p className="mt-5">These are design and management risks, not findings from a study of Ricotta. The practical response is restraint: agree on the cadence, offer varied formats, allow silence and ask whether people want the activity to continue. Games cannot compensate for unreasonable workloads or poor treatment.</p>
            </section>

            <section aria-labelledby="lessons">
              <h2 id="lessons" className="font-display text-3xl font-black leading-tight text-foreground">What Laughter Circle and other Slack apps can learn</h2>
              <p className="mt-5">Ricotta suggests that low-friction participation is not only about making a button easy to click. It is about giving people an understandable reason to join, a manageable commitment and more than one socially comfortable way to take part.</p>
              <ul className="mt-6 space-y-5">
                <li><strong className="text-foreground">Meet the team in its existing context.</strong> A familiar channel is an invitation point, not a guarantee of attention. Respect what else happens there.</li>
                <li><strong className="text-foreground">Repeat the occasion, not the obligation.</strong> Scheduling should save organizer effort while preserving the participant’s choice.</li>
                <li><strong className="text-foreground">Leave room for the human response.</strong> The point may be the story after an icebreaker or the exchange after a game, not the completion metric.</li>
                <li><strong className="text-foreground">Keep evidence legible.</strong> State what a “team” count means, attach dates to totals and reconcile pricing pages. Credibility matters as much as feature breadth.</li>
              </ul>
              <p className="mt-5">Other apps illustrate different forms of the same design question: <Link to="/blog/donut-slack" className="font-semibold text-primary underline">Donut</Link> creates an opening through introductions, <Link to="/blog/heytaco-slack" className="font-semibold text-primary underline">HeyTaco</Link> through appreciation and <Link to="/blog/polly-slack" className="font-semibold text-primary underline">Polly</Link> through a quick question. None of these small actions is a complete culture strategy.</p>
            </section>

            <section aria-labelledby="laughter-circle" className="border-t pt-10">
              <h2 id="laughter-circle" className="font-display text-3xl font-black leading-tight text-foreground">Where Laughter Circle fits</h2>
              <p className="mt-5">Ricotta offers social openings through games, questions and conversations. Laughter Circle explores a complementary format: short, audio-first laughter sessions guided by characters with AI-generated voices and small visual avatars, rather than quizzes or competitive scores.</p>
              <p className="mt-4">The browser experience is available; the public <Link to="/slack" className="font-semibold text-primary underline">Laughter Circle for Slack</Link> page currently invites teams to join the waitlist. We do not claim Ricotta’s adoption, demonstrated workplace outcomes or superiority over games. The lesson is the value of a small, voluntary shared experience—not that every team needs the same kind of break.</p>
            </section>

            <section aria-labelledby="faq" className="border-t pt-10">
              <h2 id="faq" className="font-display text-3xl font-black leading-tight text-foreground">FAQ</h2>
              <dl className="mt-6 space-y-6">
                {FAQ.map((f) => <div key={f.q}><dt className="font-semibold text-foreground">{f.q}</dt><dd className="mt-2">{f.a}</dd></div>)}
              </dl>
            </section>

            <section aria-labelledby="sources" className="border-t pt-10 text-sm">
              <h2 id="sources" className="font-display text-2xl font-black text-foreground">Sources and reading</h2>
              <p className="mt-3">Primary pages reviewed on November 8, 2026. Pricing was checked against the dedicated page’s Monthly and Yearly options. Adoption, feature totals and customer quotes are vendor-reported; Marketplace descriptions are not independent evaluations.</p>
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