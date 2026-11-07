import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Slack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { SlackLogo } from "@/components/SlackLogo";
import { ShareButton } from "@/components/ShareButton";
import { SiteFooter } from "@/components/SiteFooter";
import trivia from "@/assets/app-logos/trivia.svg.asset.json";

const TITLE = "Why Trivia Works: How Games Become Team Rituals in Slack";
const DESCRIPTION = "A sourced case study of Trivia for Slack: quick games, self-paced quizzes and scheduled game days, its ownership and adoption claims, limits and lessons.";
const URL = "https://laughteryoga.lovable.app/blog/trivia-slack";

const FAQ = [
  { q: "What is Trivia for Slack?", a: "Trivia is a Slack and Microsoft Teams app from trytrivia.co that runs quizzes and social games such as Pictionary, Hangman and Emoji Rebus inside channels, plus features like VirtualCoffee pairings, Water Cooler prompts and birthday celebrations." },
  { q: "Who owns Trivia today?", a: "Heron HR, a New Jersey-based company, announced that it acquired the Trivia app (trytrivia.co) from SpringRoll Inc. The Slack Marketplace lists support through heronhr.co. Trivia should not be confused with Ricotta, a different Slack games app, or with 'Tacos & Trivia'-style events." },
  { q: "Is Trivia free?", a: "The Slack Marketplace lists Trivia with 'free and paid plans available.' Trivia's site describes it as free to install. We did not find a public pricing page during our review, so check with the vendor for current plan details." },
  { q: "How many teams use Trivia?", a: "Trivia reports '600,000+ employees from 40,000+ organizations' and its Marketplace listing says '40,000+ workspaces.' These are company-reported figures without a published methodology; we did not find independent verification." },
  { q: "Does Trivia work for distributed teams?", a: "Its self-paced quizzes run on a 24-hour timeline, which the vendor describes as suited to teams across time zones. Real-time games still work best when several people are online at once." },
];

export const Route = createFileRoute("/blog/trivia-slack")({
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Article",
          headline: TITLE, description: DESCRIPTION, mainEntityOfPage: URL,
          author: { "@type": "Organization", name: "Laughter Circle" },
          publisher: { "@type": "Organization", name: "Laughter Circle" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
    ],
  }),
  component: TriviaSlackArticle,
});

const SOURCES = [
  { title: "Trivia: Official homepage", url: "https://trytrivia.co/" },
  { title: "Trivia: Trivia for Slack product page", url: "https://trytrivia.co/slack" },
  { title: "Slack Marketplace: Trivia Games, Birthday, Watercooler listing", url: "https://slack.com/marketplace/A012T9P9VQF-trivia" },
  { title: "Heron HR: Announcement of the Trivia app acquisition", url: "https://heronhr.co/" },
  { title: "Microsoft 365 App Certification: Trivia by Heron HR", url: "https://learn.microsoft.com/en-us/microsoft-365-app-certification/teams/heron-hr-trivia" },
];

function Source({ n }: { n: number }) {
  const source = SOURCES[n - 1];
  if (!source) return null;
  return <a href={source.url} className="font-semibold text-primary underline underline-offset-4" aria-label={`Source ${n}: ${source.title}`}>[{n}]</a>;
}

function TriviaSlackArticle() {
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
              <img src={trivia.url} alt="Trivia logo" width={48} height={48} className="size-12 shrink-0 rounded-md object-contain" />
              <span className="inline-flex items-center gap-2"><Slack className="size-4" aria-hidden="true" /> Slack app case study</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-tight md:text-5xl">Why Trivia Works: How Games Become <span className="text-primary">Team Rituals in Slack</span></h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">A quiz round in the channel, a winner announced with a GIF, and a few minutes of banter afterwards. Trivia’s bet is that a short game can do what a scheduled social call often struggles to: get people to show up because they want to.</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">We build Laughter Circle. This is an editorial case study of a different Slack app, not a claim that our product is better. Trivia’s figures are company-reported; we label them and separate them from evidence of outcomes.</p>
          </header>

          <div className="max-w-3xl space-y-14 pt-12 text-lg leading-relaxed text-muted-foreground md:space-y-16">
            <section aria-labelledby="problem">
              <h2 id="problem" className="font-display text-3xl font-black leading-tight text-foreground">The problem: distributed teams lose the casual moments</h2>
              <p className="mt-5">In an office, informal connection happens almost by accident: a joke before a meeting, a chat at the coffee machine. Remote and hybrid teams lose many of those moments, and the usual replacement—a scheduled video happy hour—can feel like one more meeting.</p>
              <p className="mt-4">Trivia positions itself directly against that pattern, promising “real-time team building minus forced Zoom happy hours” and a “quick 5-minute break right inside your workspace.” <Source n={1} /> The problem it targets is not a lack of fun content, but a lack of low-effort occasions for colleagues to interact outside their work threads.</p>
            </section>

            <section aria-labelledby="who">
              <h2 id="who" className="font-display text-3xl font-black leading-tight text-foreground">Which Trivia, and who owns it</h2>
              <p className="mt-5">Several products share similar names, so precision matters. This case study covers <strong className="text-foreground">Trivia at trytrivia.co</strong>, listed in the Slack Marketplace as “Trivia Games, Birthday, Watercooler.” <Source n={3} /> It is not Ricotta, a separate Slack games app, and it is unrelated to “Tacos &amp; Trivia”-style events or to HeyTaco.</p>
              <p className="mt-4">Trivia was originally built by Springworks; Microsoft’s app certification record still lists springworks.in as the company website while naming Heron HR as the partner company. <Source n={5} /> Heron HR, a New Jersey-based company, announced that it acquired the Trivia app from SpringRoll Inc. <Source n={4} /> Trivia’s own site now links “Back to Heron HR,” notes that SOC 2 compliance applied “under prior ownership” and that a new review is underway, and the Marketplace lists support at heronhr.co. <Source n={2} /> <Source n={3} /></p>
              <p className="mt-4">On business model, the Marketplace lists “free and paid plans available,” and Trivia’s site describes the app as free to install. <Source n={2} /> <Source n={3} /> We did not find a public pricing page during our review, so we do not quote prices.</p>
            </section>

            <section aria-labelledby="mechanics">
              <h2 id="mechanics" className="font-display text-3xl font-black leading-tight text-foreground">How Trivia works inside Slack</h2>
              <p className="mt-5">Setup follows a three-step pattern: install the app, choose a channel, start playing. <Source n={1} /> From there, the Marketplace listing describes a broad suite: <strong className="text-foreground">Slack trivia games</strong> (instant and custom quizzes, image quizzes, true or false), word and picture games (Pictionary, Hangman, Emoji Rebus, Spot the Difference, GIF Charades) and opinion games such as Unpopular Opinion. After each game, the winner is announced with a GIF. <Source n={3} /></p>
              <p className="mt-4">Beyond games, Trivia includes social features: <strong className="text-foreground">VirtualCoffee</strong> pairs colleagues one-to-one, <strong className="text-foreground">Water Cooler</strong> posts conversation prompts, <strong className="text-foreground">Know Your Team</strong> turns personal interests into quizzes about each other, and Celebrations announces birthdays and work anniversaries. <Source n={3} /></p>
              <p className="mt-4">Two features matter most for rituals. <strong className="text-foreground">Self-paced quizzes</strong> run on a 24-hour timeline, which the vendor recommends for teams split across time zones. <strong className="text-foreground">Auto-Schedule</strong> sets recurring sessions—the listing names “Fun Fridays” and “Trivia Tuesdays”—with the app handling notifications and winner announcements. <Source n={3} /></p>
            </section>

            <section aria-labelledby="voluntary">
              <h2 id="voluntary" className="font-display text-3xl font-black leading-tight text-foreground">Why short games invite voluntary participation</h2>
              <p className="mt-5">A quiz round has a clear start, a clear end and a low cost of entry. Nobody needs to turn on a camera, prepare anything or commit an hour. People can join one question, watch from the sidelines or skip entirely without it being noticed—which makes joining feel like a choice rather than an obligation.</p>
              <p className="mt-4">Games also give people something to talk about that is not work. Trivia says as much: “Trivia is about post-game banter &amp; friendly conversations. Well, that’s the whole point of playing it.” <Source n={3} /> The game is the pretext; the replies, jokes and reactions in the thread are where informal interaction happens.</p>
              <p className="mt-4">Real-time play adds shared presence: several people answering the same question at the same moment is closer to a live experience than asynchronous messages. The trade-off is that real-time games favor whoever is online; self-paced quizzes exist precisely to cover the rest.</p>
            </section>

            <section aria-labelledby="ritual">
              <h2 id="ritual" className="font-display text-3xl font-black leading-tight text-foreground">How repetition and friendly competition create rituals</h2>
              <p className="mt-5">A single quiz is an event. A quiz every Tuesday at the same time becomes something people anticipate. Scheduling removes the organizer’s burden of remembering to start the game, and naming it—Trivia Tuesday, Fun Friday—gives the team a shared reference point.</p>
              <p className="mt-4">Leaderboards and winner announcements add a light competitive thread that carries from week to week: rivalries, streaks, the colleague who always wins the geography round. Over time, these become small inside jokes, which is often what teams mean by “culture.”</p>
              <p className="mt-4">Customer testimonials on Trivia’s Slack page describe this kind of effect, for example calling it “the perfect ice-breaker for new joiners.” <Source n={2} /> These are vendor-selected quotes, useful as illustrations of how teams use it, not as measured outcomes.</p>
            </section>

            <section aria-labelledby="evidence">
              <h2 id="evidence" className="font-display text-3xl font-black leading-tight text-foreground">Evidence of adoption: large claims, few definitions</h2>
              <p className="mt-5">Trivia publishes headline numbers in several places. They are all company-reported and, as far as we found, come without a published methodology:</p>
              <ul className="mt-6 space-y-5">
                <li><span className="font-semibold text-accent">“600,000+ employees from 40,000+ organizations.”</span> Stated on Trivia’s homepage and Slack page. <Source n={1} /> <Source n={2} /> It does not specify whether these are lifetime or current users, or how Slack and Microsoft Teams are split.</li>
                <li><span className="font-semibold text-accent">“40,000+ workspaces,” including Quora, Uber, Workday and the NBA.</span> From the Marketplace listing. <Source n={3} /> “Workspaces” and “organizations” are used interchangeably across pages; named companies indicate some use, not company-wide adoption.</li>
                <li><span className="font-semibold text-accent">“More than 70 countries.”</span> A Slack-page claim without detail. <Source n={2} /></li>
                <li><span className="font-semibold text-accent">Question bank size varies by page.</span> The homepage cites 50,000+ questions across 50+ categories; the Marketplace listing says 70K+ questions and 50+ topics; the Slack page links to “5000+ Instant Quizzes.” <Source n={1} /> <Source n={2} /> <Source n={3} /> These may count different things or reflect different update dates; we report them as stated.</li>
              </ul>
              <p className="mt-6 border-l-2 border-accent pl-5 text-base">We found no independently audited usage data or controlled studies of Trivia. A homepage banner promotes a webinar about remote HR teams improving an engagement index to 90%; it is a marketing claim without published methodology, and we do not treat it as evidence. <Source n={1} /> The sources support broad distribution and a long feature list, not proven effects on retention, productivity or engagement.</p>
            </section>

            <section aria-labelledby="limits">
              <h2 id="limits" className="font-display text-3xl font-black leading-tight text-foreground">The limitations: when games stop being fun</h2>
              <ul className="mt-6 space-y-5">
                <li><strong className="text-foreground">Participation fatigue.</strong> A daily game can turn from a treat into channel noise. Frequency that suits enthusiasts may push others to mute the channel.</li>
                <li><strong className="text-foreground">Competitive pressure.</strong> Leaderboards energize some people and quietly exclude others—newcomers, non-native speakers, or anyone who dislikes being ranked. The same few winners can make the rest stop playing.</li>
                <li><strong className="text-foreground">Repetitive content.</strong> Even large question banks feel familiar over months, and general-knowledge quizzes can carry cultural bias for global teams.</li>
                <li><strong className="text-foreground">The risk of forced fun.</strong> Trivia markets itself against forced happy hours, but any activity becomes forced when managers track who joined or treat play as a proxy for engagement. Keeping it genuinely optional is a team decision, not a product feature.</li>
                <li><strong className="text-foreground">Games are not a fix.</strong> A quiz cannot repair workload, unclear priorities or poor management. It can make a healthy team’s week lighter; it cannot make an unhealthy team healthy.</li>
              </ul>
            </section>

            <section aria-labelledby="lessons">
              <h2 id="lessons" className="font-display text-3xl font-black leading-tight text-foreground">What other Slack apps can learn from Trivia</h2>
              <ul className="mt-6 space-y-5">
                <li><strong className="text-foreground">Make the first session instant.</strong> Install, pick a channel, play. Value before configuration.</li>
                <li><strong className="text-foreground">Treat the activity as a pretext for conversation.</strong> The thread after the game matters more than the score.</li>
                <li><strong className="text-foreground">Offer both live and asynchronous modes.</strong> Real-time play creates presence; self-paced modes include everyone else.</li>
                <li><strong className="text-foreground">Let scheduling carry the ritual.</strong> A named, recurring slot removes the organizer’s burden and gives the team something to anticipate.</li>
                <li><strong className="text-foreground">Design against exclusion.</strong> Optional participation, varied formats and gentle competition keep games welcoming.</li>
                <li><strong className="text-foreground">Keep claims consistent and defined.</strong> Different numbers for the same metric across pages make adoption hard to judge; HeyTaco’s published methodology is a useful contrast.</li>
              </ul>
              <p className="mt-5">Trivia completes a set of patterns we have studied: <Link to="/blog/donut-slack" className="font-semibold text-primary underline">Donut</Link> makes introductions recur, <Link to="/blog/heytaco-slack" className="font-semibold text-primary underline">HeyTaco</Link> turns appreciation into a daily gesture, and <Link to="/blog/polly-slack" className="font-semibold text-primary underline">Polly</Link> makes quick questions part of the flow of work. Our <Link to="/blog/best-slack-apps-team-building" className="font-semibold text-primary underline">comparison of Slack apps for team building</Link> places them side by side, our <Link to="/slack/team-building" className="font-semibold text-primary underline">virtual team building guide for Slack</Link> covers how to mix formats, and our page on <Link to="/slack/employee-engagement" className="font-semibold text-primary underline">employee engagement in Slack</Link> looks at where games fit among other approaches.</p>
            </section>

            <section aria-labelledby="laughter-circle" className="border-t pt-10">
              <h2 id="laughter-circle" className="font-display text-3xl font-black leading-tight text-foreground">Where Laughter Circle fits</h2>
              <p className="mt-5">Trivia builds rituals around play and friendly competition. Laughter Circle explores a complementary model with no scores or winners: short, audio-first sessions in which AI-voiced characters guide a group through shared laughter.</p>
              <p className="mt-4"><Link to="/slack" className="font-semibold text-primary underline">Laughter Circle for Slack</Link> starts with an invitation in a channel and opens the session in the browser. It is not a replacement for team games and makes no claim to Trivia’s adoption. The shared design question is the same: how can a small, voluntary moment become something a team returns to?</p>
            </section>

            <section aria-labelledby="faq" className="border-t pt-10">
              <h2 id="faq" className="font-display text-3xl font-black leading-tight text-foreground">FAQ</h2>
              <dl className="mt-6 space-y-6">
                {FAQ.map((f) => (
                  <div key={f.q}>
                    <dt className="font-semibold text-foreground">{f.q}</dt>
                    <dd className="mt-2">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section aria-labelledby="sources" className="border-t pt-10 text-sm">
              <h2 id="sources" className="font-display text-2xl font-black text-foreground">Sources and reading</h2>
              <p className="mt-3">Sources reviewed on November 7, 2026. All usage figures are reported by Trivia or its owner; the Marketplace listing is written by the vendor, and Slack states that it does not endorse or certify listed apps.</p>
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
