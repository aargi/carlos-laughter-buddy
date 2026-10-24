import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Slack } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { SlackLogo } from "@/components/SlackLogo";
import { ShareButton } from "@/components/ShareButton";
import { SiteFooter } from "@/components/SiteFooter";
import donut from "@/assets/app-logos/donut.png.asset.json";

const TITLE = "Why Donut Works: How a Slack App Turned Introductions Into a Team Ritual";
const DESCRIPTION = "How Donut made coffee chats a repeatable team ritual inside Slack: the problem, product mechanics, adoption evidence and lessons for other Slack apps.";
const URL = "https://laughteryoga.lovable.app/blog/donut-slack";

export const Route = createFileRoute("/blog/donut-slack")({
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
  component: DonutSlackArticle,
});

const SOURCES = [
  { title: "Slack: How Donut built a Slack-first business that boosts team culture", url: "https://slack.com/blog/developers/donut-built-slack-first-business" },
  { title: "Slack: Setting new hires up for success", url: "https://slack.com/blog/collaboration/setting-new-hires-up-for-success" },
  { title: "Donut: Donut acquires Gatheround (2024)", url: "https://www.donut.com/blog/donut-acquires-gatheround/" },
  { title: "Donut: How Okta’s dynamic workforce stays connected", url: "https://www.donut.com/blog/how-oktas-dynamic-workforce-stays-connected/" },
  { title: "Donut: Homepage and Buffer customer testimonial", url: "https://www.donut.com/" },
];

function Source({ n }: { n: number }) {
  const source = SOURCES[n - 1];
  if (!source) return null;
  return <a href={source.url} className="font-semibold text-primary underline underline-offset-4" aria-label={`Source ${n}: ${source.title}`}>[{n}]</a>;
}

function DonutSlackArticle() {
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
              <img src={donut.url} alt="Donut logo" width={48} height={48} className="size-12 shrink-0 rounded-md object-contain" />
              <span className="inline-flex items-center gap-2"><Slack className="size-4" aria-hidden="true" /> Slack app case study</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-tight md:text-5xl">Why Donut Works: How a Slack App Turned Introductions Into a <span className="text-primary">Team Ritual</span></h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">Donut did not invent the coffee chat. It made the awkward, easily forgotten work around it easier: choosing someone to meet, making the introduction and remembering to do it again.</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">An editorial look at the product’s design and reported adoption—not a claim that an introduction automatically creates belonging. We build Laughter Circle; Donut is a useful case study, not a rival to dismiss.</p>
          </header>

          <div className="max-w-3xl space-y-14 pt-12 text-lg leading-relaxed text-muted-foreground md:space-y-16">
            <section aria-labelledby="problem">
              <h2 id="problem" className="font-display text-3xl font-black leading-tight text-foreground">The problem: connection stops happening by accident</h2>
              <p className="mt-5">In a small team, people often get to know each other without a program. As the organization grows, the people you work with every day become a smaller part of the people who work there. Remote work makes the gaps more visible: there is no shared elevator or lunch table to introduce you to another department.</p>
              <p className="mt-4">In Slack’s account of Donut’s origins, co-founder Dan Manian describes interviewing hundreds of people about culture as their companies scaled. Teams were already running coffee or lunch roulettes, often with spreadsheets and manual instructions about who should contact whom. The idea was not missing; the repeated coordination was the bottleneck. <Source n={1} /></p>
              <p className="mt-4">That is a more specific problem than “fix employee engagement.” Donut gave someone a reason and a low-pressure opening to meet a colleague they might otherwise never approach.</p>
            </section>

            <section aria-labelledby="mechanics">
              <h2 id="mechanics" className="font-display text-3xl font-black leading-tight text-foreground">How Donut works: automate the introduction, not the relationship</h2>
              <p className="mt-5">The classic Donut Intros flow starts with a Slack channel and a recurring introduction program. Slack’s onboarding guide describes participation through joining or leaving the channel. Donut introduces teammates in direct messages and can provide conversation starters; the people then arrange their coffee, lunch or virtual chat. <Source n={1} /> <Source n={2} /></p>
              <ol className="mt-6 space-y-3 border-l-2 border-primary pl-6">
                <li><span className="font-semibold text-foreground">1. Create a shared pool.</span> A channel gives the program a home and makes participation understandable.</li>
                <li><span className="font-semibold text-foreground">2. Make the introduction.</span> The app handles matching and starts the conversation in a familiar place.</li>
                <li><span className="font-semibold text-foreground">3. Give people a next step.</span> A prompt removes the blank-message problem; teammates still decide when and how to meet.</li>
                <li><span className="font-semibold text-foreground">4. Repeat the invitation.</span> A chosen cadence keeps the program from depending on an organizer remembering each round.</li>
              </ol>
              <p className="mt-5">Coffee chats are only one use case. Slack describes introductions across departments and seniority levels, peer learning, remote-work buddies and even colleagues exchanging mail from their hometowns. The same mechanism can support different social purposes. Donut has since expanded into onboarding, recognition and other employee programs; this article focuses on its introduction loop. <Source n={1} /> <Source n={3} /></p>
            </section>

            <section aria-labelledby="slack-fit">
              <h2 id="slack-fit" className="font-display text-3xl font-black leading-tight text-foreground">Why it worked inside Slack</h2>
              <p className="mt-5">Slack was more than a place to advertise Donut. It was where the action could begin. Manian told Slack: “Slack kept coming up as the place where culture happened, no matter if people work remotely or in offices.” <Source n={1} /></p>
              <p className="mt-4">Three advantages follow from that fit. First, an introduction reaches people in a workspace they already check, rather than asking them to adopt another social destination. Second, channels and direct messages are familiar: participants do not need to learn a new interaction model just to say hello. Third, Slack’s App Directory gave Donut a distribution route to organizations already looking for ways to enrich their workspace. Slack explicitly identifies adoption, familiarity and distribution as reasons for the Slack-first approach. <Source n={1} /></p>
              <p className="mt-4">The important distinction is that Donut starts a connection in Slack; it does not require every connection to stay there. The conversation might become a video call, lunch or a walk. Its value lies in initiating the human exchange, not maximizing time inside the app.</p>
            </section>

            <section aria-labelledby="ritual">
              <h2 id="ritual" className="font-display text-3xl font-black leading-tight text-foreground">What made it habitual: a predictable invitation</h2>
              <p className="mt-5">A one-off pairing is an activity. A recognizable channel, a recurring prompt and a shared expectation can make it a team ritual. Donut removes some of the work that normally causes the second and third rounds to disappear: rebuilding the list, choosing pairs and asking someone to send the introductions.</p>
              <p className="mt-4">The repeatable structure stays familiar while the colleague changes. That gives the program both predictability and variety. The “why are you messaging me?” awkwardness is reduced because the invitation comes from an agreed team practice rather than an unexplained cold approach.</p>
              <p className="mt-4">Buffer offers a concrete example. In a testimonial on Donut’s homepage, Senior People Operations Specialist Jenna Meindertsma describes the fully remote team’s biweekly intros as “a beloved part of our culture.” That is an attributed customer experience—not evidence that biweekly pairing is the right schedule for every organization. <Source n={5} /></p>
              <p className="mt-4">Automation still needs a hospitable environment. People need permission to take the time, flexibility across time zones and a real option not to participate. A scheduled nudge cannot by itself make a team inclusive, and a coffee chat still needs scheduling.</p>
            </section>

            <section aria-labelledby="evidence">
              <h2 id="evidence" className="font-display text-3xl font-black leading-tight text-foreground">Evidence of adoption—and what the numbers do not prove</h2>
              <p className="mt-5">The reported scale is substantial, but the dates and definitions matter:</p>
              <ul className="mt-6 space-y-5">
                <li><span className="font-semibold text-accent">10 million+ connections, 20,000 companies.</span> Slack’s profile reports these totals since Donut’s 2016 launch and names Slack itself as a user. These are figures reported in that historical profile, not a fresh 2026 count. <Source n={1} /></li>
                <li><span className="font-semibold text-accent">16 million+ connections, 20,000+ teams.</span> Donut reports these figures in its 2024 Gatheround acquisition announcement. The same announcement separately reports more than 400,000 employees enrolled in onboarding, mentorship and learning Journeys. Those enrollments are not an extra count of coffee chats. <Source n={3} /></li>
                <li><span className="font-semibold text-accent">Named workplace examples.</span> Donut’s Okta interview describes connection programs for a dynamic workforce. Buffer describes recurring intros in a remote team, and Slack reports using Donut itself. These examples show applications beyond an abstract product pitch. <Source n={4} /> <Source n={5} /> <Source n={1} /></li>
              </ul>
              <p className="mt-6 border-l-2 border-accent pl-5 text-base">These are vendor- or platform-reported figures and customer accounts, not independently audited outcome studies. “Connections” is the sources’ metric; it should not be read as verified completed meetings, lasting friendships or unique users. Nor do these sources establish that Donut caused better retention, productivity or wellbeing.</p>
              <p className="mt-4">The defensible success claim is narrower: a repeatable introduction mechanism found broad reported adoption and recognizable uses in real organizations. That is enough to learn from without treating every marketing number as proof of impact.</p>
            </section>

            <section aria-labelledby="lessons">
              <h2 id="lessons" className="font-display text-3xl font-black leading-tight text-foreground">What other Slack apps can learn from it</h2>
              <ul className="mt-6 space-y-5">
                <li><strong className="text-foreground">Start with an existing human behavior.</strong> Donut improved a coffee-roulette practice teams were already trying to run. A clear coordination problem is easier to solve than an abstract promise to improve culture.</li>
                <li><strong className="text-foreground">Remove the work around the moment.</strong> Automate the invitation, matching or reminder. Leave room for humans to decide what happens next.</li>
                <li><strong className="text-foreground">Design the second use, not just installation.</strong> A manageable cadence and familiar starting point matter more to a ritual than a clever first notification.</li>
                <li><strong className="text-foreground">Use Slack as a starting point, not a constraint.</strong> Some activities belong in a thread; others belong in a call, a browser or the physical world. Meet people in Slack, then send them to the right place.</li>
                <li><strong className="text-foreground">Offer choice and listen.</strong> Slack’s profile describes Watercooler emerging from requests for lighter, asynchronous interaction. Not everyone wants a coffee meeting; one successful format need not become the only format. <Source n={1} /></li>
                <li><strong className="text-foreground">Measure honestly.</strong> Invitations, introductions, participation and relationship quality are different things. Reporting one should not imply proof of another.</li>
              </ul>
              <p className="mt-5">For teams choosing a mix of activities, the practical question is what kind of moment is missing. Our guides to <Link to="/slack/team-building" className="font-semibold text-primary underline">Slack team building</Link> and <Link to="/slack/employee-engagement" className="font-semibold text-primary underline">employee engagement in Slack</Link> explore several formats rather than treating one app as the whole answer.</p>
            </section>

            <section aria-labelledby="laughter-circle" className="border-t pt-10">
              <h2 id="laughter-circle" className="font-display text-3xl font-black leading-tight text-foreground">Where Laughter Circle fits</h2>
              <p className="mt-5">Donut uses Slack to facilitate human connections between colleagues, often through an introduction that becomes a conversation. Laughter Circle explores another kind of connection: guided laughter sessions and small shared moments within the life of a team.</p>
              <p className="mt-4">The <Link to="/slack" className="font-semibold text-primary underline">Laughter Circle for Slack</Link> approach uses a Slack invitation to open a short guided session in the browser. It is not a replacement for getting to know a colleague, and we are not claiming it is better than Donut or has demonstrated the same adoption or outcomes. The shared lesson is simpler: make an invitation easy to encounter, keep participation voluntary and give teams a small moment they can return to.</p>
            </section>

            <section aria-labelledby="sources" className="border-t pt-10 text-sm">
              <h2 id="sources" className="font-display text-2xl font-black text-foreground">Sources and reading</h2>
              <p className="mt-3">Primary sources from Slack and Donut. Historical totals remain attached to their source context; customer testimonials are attributed accounts.</p>
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