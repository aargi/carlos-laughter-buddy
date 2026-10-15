import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Smile, Users, Wind, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { ShareButton } from "@/components/ShareButton";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "What Is Laughter Therapy? Meaning, Uses and How It Differs From Laughter Yoga";
const DESCRIPTION = "Understand laughter therapy and laugh therapy: their meaning, common exercises and uses, and how they differ from laughter yoga and guided laughter sessions.";
const URL = "https://laughtercircle.com/laughter-therapy";

export const Route = createFileRoute("/laughter-therapy/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "Article", headline: TITLE,
      description: DESCRIPTION, url: URL,
      publisher: { "@type": "Organization", name: "Laughter Circle" },
    }) }],
  }),
  component: LaughterTherapyPage,
});

const FORMATS = [
  { icon: Users, title: "Community groups and social sessions", text: "People can meet in a club, a local group or a one-off event to share a playful activity. A facilitator may use greetings, simple rhythms and group laughter rather than asking anyone to tell a joke." },
  { icon: Building2, title: "Workplaces, workshops and team breaks", text: "A session can be an optional break, an offsite activity or part of a workshop. The useful question is whether the format suits the group — not whether it will solve stress, burnout or team conflict." },
  { icon: Smile, title: "At home and online", text: "You can try a short exercise alone, join a live online group or follow a digital guide. These are different experiences: a live facilitator can respond to people, while a digital session follows a predefined sequence." },
  { icon: Wind, title: "Wellbeing and care settings", text: "Laughter-based activities also appear in wellbeing programs and research involving clinical populations. That context does not make every laughter session a treatment. Any use alongside healthcare should be directed by appropriately qualified professionals." },
];

function LaughterTherapyPage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <div className="mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-12">
        <nav aria-label="Main navigation" className="sticky top-0 z-50 -mx-5 mb-10 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-5 py-3 sm:mb-12 sm:gap-3 md:-mx-6 md:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2 font-display text-base font-black md:text-xl">
            <LogoMark size={28} className="hidden sm:block" />
            <span className="whitespace-nowrap">Laughter<span className="text-primary">Circle</span></span>
          </Link>
          <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold sm:gap-2 sm:text-sm">
            <Button asChild variant="ghost" size="sm"><Link to="/slack">For Slack</Link></Button>
            <Button asChild variant="ghost" size="sm"><Link to="/story">Our story</Link></Button>
            <ShareButton />
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex"><Link to="/auth">Sign in</Link></Button>
          </div>
        </nav>

        <section>
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"><BookOpen className="size-4" /> A guide from Laughter Circle</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">What is laughter therapy? <span className="text-primary">Meaning, uses and how it differs from laughter yoga.</span></h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Laughter therapy is a broad term for activities that intentionally invite laughter, often for enjoyment, connection or wellbeing. What happens in a session varies. The word “therapy” alone does not tell you whether it is healthcare, a facilitated group activity or simply a guided laugh.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-auto whitespace-normal rounded-full px-6 py-3.5 font-bold"><a href="#differences">Compare the terms <ArrowRight /></a></Button>
            <Button asChild variant="outline" size="lg" className="h-auto whitespace-normal rounded-full px-6 py-3.5 font-bold"><Link to="/">Try a guided session</Link></Button>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">A term, not a promise of treatment</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>You may see “laughter therapy” or “laugh therapy” used for deliberate laughter exercises, humor-based activities or group sessions that mix laughter, breathing and play. Research also uses the term for different laughter-based interventions. It does not describe one identical method everywhere.</p>
            <p>A session does not automatically involve a psychologist or a health professional. Equally, research conducted in a healthcare setting should not be confused with a casual activity in a browser. Check who is leading the session, what it includes and what claims are being made.</p>
            <p>On this site, Laughter Circle means guided laughter sessions: a recreational experience inspired by laughter yoga and shared laughter. It is not medical therapy, psychological treatment or a substitute for qualified healthcare.</p>
          </div>
        </section>

        <section id="differences" className="mt-24 scroll-mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Laughter therapy, laughter yoga or a laughter session?</h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">These terms overlap, but they describe different things. The label matters less than the actual activity and the support available.</p>
          <dl className="mt-8 divide-y">
            <div className="grid gap-3 py-6 md:grid-cols-[14rem_1fr]"><dt className="font-display text-xl font-black">Laughter therapy</dt><dd className="leading-relaxed text-muted-foreground">A broad label used for laughter-based activities or interventions. It can include deliberate laughter or humor. Do not infer a clinical service, a standardized protocol or proven treatment from the name alone.</dd></div>
            <div className="grid gap-3 py-6 md:grid-cols-[14rem_1fr]"><dt className="font-display text-xl font-black">Laughter yoga</dt><dd className="leading-relaxed text-muted-foreground">A particular practice combining intentional laughter exercises with breathing, often clapping, playful movement and group interaction. It does not depend on jokes or conventional yoga poses. Read <Link to="/laughter-yoga" className="font-semibold text-primary underline">what laughter yoga is and how it works</Link>.</dd></div>
            <div className="grid gap-3 py-6 md:grid-cols-[14rem_1fr]"><dt className="font-display text-xl font-black">Guided laughter</dt><dd className="leading-relaxed text-muted-foreground">Describes how you take part: a person or digital guide gives prompts and demonstrates laughter. The content may be inspired by laughter yoga, but guidance alone does not make it therapy or a professional service.</dd></div>
            <div className="grid gap-3 py-6 md:grid-cols-[14rem_1fr]"><dt className="font-display text-xl font-black">Laughter sessions</dt><dd className="leading-relaxed text-muted-foreground">Describes the event or time set aside for the activity. A session might be a short browser experience, a community gathering or a longer facilitator-led workshop. The term does not specify a method or a medical purpose.</dd></div>
          </dl>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">What happens during a session?</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Many exercise-based sessions start with a gentle warm-up. A guide introduces a playful prompt, demonstrates it and gives people time to follow. Activities may build in energy before ending with quieter breathing. Humor-based sessions may instead use entertaining material; not every format follows the same sequence.</p>
            <p>You might start by laughing deliberately rather than because something is funny. It can become spontaneous, or it can remain a playful exercise. Neither response is a test you need to pass. Watching, pausing or declining should always be acceptable.</p>
            <p>Duration depends on the format. A short break and a longer group workshop offer different levels of interaction and support; a longer or louder session is not automatically better.</p>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Laughter therapy exercises: simple examples</h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">People searching for laughter therapy exercises often find activities used in laughter yoga. These are examples of playful participation, not a treatment plan.</p>
          <ol className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
            <li><strong className="text-foreground">1. Gentle breathing.</strong> Take a comfortable breath and let it out softly. Keep it easy rather than deep or forceful; pause if you feel uncomfortable or lightheaded.</li>
            <li><strong className="text-foreground">2. A simple “ha, ha, ha”.</strong> Try a few gentle laughter syllables at your own pace. Relax your shoulders and stop before it feels strained.</li>
            <li><strong className="text-foreground">3. Greeting laughter.</strong> With a willing partner or group, offer a friendly wave and a short playful laugh. Eye contact is optional; nobody needs to perform.</li>
            <li><strong className="text-foreground">4. The imaginary phone call.</strong> Pretend to answer a funny call and add a few giggles. You can remain seated, move gently or simply watch.</li>
            <li><strong className="text-foreground">5. A quiet finish.</strong> Let the activity settle and return to normal breathing. Notice how you feel without expecting a particular mood.</li>
          </ol>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">For more examples and formats for individuals, pairs and groups, explore our <Link to="/laughter-yoga/exercises" className="font-semibold text-primary underline">laughter yoga exercises guide</Link>. Stop if an activity causes pain, breathlessness or other discomfort. Ask a qualified health professional if you are unsure whether it is suitable for you.</p>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Where laughter-based activities are used</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {FORMATS.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-3xl border bg-card p-6"><span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary"><Icon className="size-5" /></span><h3 className="mt-4 font-display text-xl font-black">{title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{text}</p></div>)}
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">For workplace groups, participation should be voluntary and alternatives should be welcome. <Link to="/slack" className="font-semibold text-primary underline">Laughter Circle for Slack</Link> presents shared laughter as a team activity, not a workplace health intervention.</p>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Enjoyment, evidence and limits</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>People may describe a session as enjoyable, relaxing or connecting. These are possible experiences, not guaranteed outcomes. Studies have investigated laughter-based interventions, but they differ in activities, populations, duration and study quality.</p>
            <p>For example, a <a href="https://pubmed.ncbi.nlm.nih.gov/30030938/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">2018 systematic review of group-based laughter yoga</a> found promising signals but judged the evidence weak. A <a href="https://link.springer.com/article/10.1007/s10902-025-00934-z" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">2025 review of laughter therapy trials</a> examines specific interventions and participant groups — not this app.</p>
            <p>Our <Link to="/laughter-yoga/benefits" className="font-semibold text-primary underline">guide to laughter yoga benefits</Link> separates reported experiences, scientific findings and what remains uncertain. None of those studies establishes a clinical benefit for Laughter Circle or makes an AI-led session a replacement for care.</p>
          </div>
        </section>

        <section className="mt-24 border-y border-primary/30 bg-primary/10 px-6 py-10 md:px-10">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Laughter Circle</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">Guided laughter. <span className="text-primary">Not a medical service.</span></h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Laughter Circle is a platform for short guided laughter sessions, inspired by laughter yoga and shared laughter. Pick an AI character in your browser, hear the explanation, laugh along during your turn and finish with gentle breathing.</p>
            <p>You can take part on your own or alongside other people. The guide uses pre-recorded voice and laughter; it does not assess your health, diagnose conditions or provide psychological treatment. A trained facilitator or healthcare professional offers human support that this experience cannot replace.</p>
            <p>The project began during a running hackathon in Barcelona. <Link to="/story" className="font-semibold text-primary underline">Read Our Story</Link> for its origins.</p>
          </div>
          <Button asChild variant="link" className="mt-6 h-auto whitespace-normal px-0 font-bold"><Link to="/">Start a guided session <ArrowRight /></Link></Button>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Choosing the right kind of session</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>For a light break, a short guided experience may be enough. For a group workshop, look for a facilitator who explains their training, adapts activities and respects people's boundaries. If your goal involves a medical condition or mental health concern, speak to a qualified healthcare professional rather than relying on a laughter session.</p>
            <p>Before joining, ask what the session involves, whether participation is optional and what happens if you want to stop. Be cautious of promises to cure illness or replace treatment. You do not have to feel happier afterwards for your choice to pause or participate to be valid.</p>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Keep exploring</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Start with <Link to="/laughter-yoga" className="font-semibold text-primary underline">laughter yoga</Link>, explore <Link to="/laughter-yoga/exercises" className="font-semibold text-primary underline">guided exercises</Link> or read about <Link to="/laughter-yoga/benefits" className="font-semibold text-primary underline">research and its limits</Link>. For teams, visit <Link to="/slack" className="font-semibold text-primary underline">Laughter Circle for Slack</Link>; for the people behind the project, read <Link to="/story" className="font-semibold text-primary underline">Our Story</Link>.</p>
        </section>
        <SiteFooter />
      </div>
    </main>
  );
}