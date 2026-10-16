import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Clock, Users, Globe, Video, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { ShareButton } from "@/components/ShareButton";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Laughter Therapy at Work: Guided Laughter for Workplace Wellbeing";
const DESCRIPTION = "Explore laughter therapy at work through optional guided laughter breaks, team sessions and workshops for in-person, hybrid and remote teams — without clinical claims.";
const URL = "https://laughtercircle.com/laughter-therapy/at-work";

export const Route = createFileRoute("/laughter-therapy/at-work")({
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
  component: LaughterTherapyAtWorkPage,
});

const FORMATS = [
  { icon: Clock, title: "A short laugh break", text: "Invite colleagues to step away from a task for a few minutes of gentle breathing and playful laughter. Keep it optional, give it a clear end and offer the same space for a quiet break instead." },
  { icon: Users, title: "A guided team session", text: "Set aside time for a shared sequence: a welcome, an easy warm-up, a few laughter prompts and a calm finish. A host can explain what to expect before anyone decides whether to join." },
  { icon: Sparkles, title: "A facilitated workshop", text: "For an offsite or a longer group activity, consider a trained laughter yoga facilitator. Discuss the group's needs, accessibility and boundaries in advance rather than treating the workshop as a performance." },
  { icon: Building2, title: "An activity for connection", text: "A voluntary session can sit alongside other social options at a team day or gathering. It gives people something playful to do together without asking them to be funny, disclose feelings or compete." },
];

const SETTINGS = [
  { icon: Building2, title: "In person", text: "Use a space where laughter will not disturb colleagues. Leave room to sit or stand comfortably, avoid required touch and let people join at their own volume and pace." },
  { icon: Video, title: "Remote", text: "Give people the duration and format before the call. Cameras and microphones can remain optional. Video-call audio may suppress overlapping laughter, so hearing every person is not a requirement." },
  { icon: Globe, title: "Hybrid", text: "Include remote colleagues in the introduction and prompts, not just the room. Make instructions easy to hear, avoid exercises that require a nearby partner and offer an equal choice to observe or sit out." },
];

function LaughterTherapyAtWorkPage() {
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
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Building2 className="size-4" /> A guide from Laughter Circle</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">Laughter therapy at work: <span className="text-primary">guided laughter for workplace wellbeing.</span></h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">At work, “laughter therapy” often describes a guided laughter activity rather than clinical care. It might be a short break, a team session or a workshop: an invitation to share something playful, not a prescription to feel better.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-auto whitespace-normal rounded-full px-6 py-3.5 font-bold"><a href="#formats">Explore the formats <ArrowRight /></a></Button>
            <Button asChild variant="outline" size="lg" className="h-auto whitespace-normal rounded-full px-6 py-3.5 font-bold"><Link to="/">Try a guided session</Link></Button>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">What “therapy” means here — and what it does not</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Laughter therapy is a broad, popular label for activities that invite laughter. The label alone does not mean a session is delivered by a health professional, uses a clinical protocol or treats a condition. Ask what is actually offered and who is leading it.</p>
            <p>Guided workplace laughter may borrow breathing, gentle movement and playful prompts from laughter yoga. It is different from psychological therapy or medical treatment, which require appropriate professional assessment and care. Read our <Link to="/laughter-therapy" className="font-semibold text-primary underline">guide to laughter therapy and related terms</Link> for the full distinction.</p>
            <p>Laughter Circle offers guided laughter sessions for participation and enjoyment. It does not assess mental health, diagnose conditions or provide treatment, and it is not a substitute for healthcare or a trained professional.</p>
          </div>
        </section>

        <section id="formats" className="mt-24 scroll-mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Four ways to bring laughter into the workplace</h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">Choose a format that fits the time, setting and people involved. A brief digital break and a facilitated workshop serve different purposes.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {FORMATS.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-3xl border bg-card p-6"><span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary"><Icon className="size-5" /></span><h3 className="mt-4 font-display text-xl font-black">{title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{text}</p></div>)}
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">For related approaches, explore <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">laughter yoga at work</Link> and <Link to="/laughter-yoga/for-teams" className="font-semibold text-primary underline">laughter activities for teams</Link>.</p>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">In the same room, online or somewhere in between</h2>
          <div className="mt-10 space-y-4">
            {SETTINGS.map(({ icon: Icon, title, text }) => <div key={title} className="flex gap-4 rounded-3xl border bg-card p-6 sm:gap-6"><span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary sm:flex"><Icon className="size-5" /></span><div><h3 className="font-display text-xl font-black">{title}</h3><p className="mt-2 leading-relaxed text-muted-foreground">{text}</p></div></div>)}
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">A remote session does not need everyone audible at once to count as a shared activity. What matters is that people understand the invitation, can follow comfortably and can leave without explanation.</p>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">A simple plan for a first session</h2>
          <ol className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
            <li><strong className="text-foreground">1. Set a modest purpose.</strong> Offer a playful pause or a shared activity. Do not announce it as a cure for stress, a morale fix or a way to improve performance.</li>
            <li><strong className="text-foreground">2. Explain the invitation.</strong> Share the duration, who will lead and what people will do. Make clear that taking part, watching and choosing another break are equally acceptable.</li>
            <li><strong className="text-foreground">3. Begin gently.</strong> Start with comfortable breathing and an easy prompt, such as a few soft “ha, ha, ha” sounds or an imaginary funny phone call. No forced eye contact, physical contact or personal disclosures.</li>
            <li><strong className="text-foreground">4. Let people set their pace.</strong> Allow sitting, standing, lower volume and pauses. Stop any exercise that causes discomfort. People with suitability concerns should seek qualified health advice, not an assessment from a team host.</li>
            <li><strong className="text-foreground">5. Close without judging.</strong> Return to normal breathing and let people move on. Optional feedback can ask whether the format suited them, rather than requiring a positive mood report.</li>
          </ol>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Workplace wellbeing needs more than a laugh</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Some people may enjoy the change of pace or the chance to do something playful with colleagues. Others may feel awkward, prefer quiet or simply not want to join. These are all legitimate responses; a session should never become another workplace expectation.</p>
            <p>Enjoyment is not evidence of a medical benefit. Laughter Circle has not been clinically evaluated, and this activity should not be presented as preventing burnout, treating anxiety or improving productivity.</p>
            <p>A laughter break cannot replace manageable workloads, respectful management, proper rest or access to professional support. Treat it as one option alongside movement, quiet breaks and other <Link to="/slack/wellness" className="font-semibold text-primary underline">workplace wellbeing activities</Link>.</p>
          </div>
        </section>

        <section className="mt-24 border-y border-primary/30 bg-primary/10 px-6 py-10 md:px-10">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Laughter Circle</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">A guided laugh, <span className="text-primary">shared with your team.</span></h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Laughter Circle is a platform for short guided laughter sessions, inspired by laughter yoga and shared laughter. An AI character explains the exercise, demonstrates it with pre-recorded voice and laughter, then gives you a turn before a calm breathing finish.</p>
            <p>A team can follow a session together as an optional break, whether colleagues share a room or join from different places. The guide provides a sequence to follow; it does not observe individual needs or offer the adaptation and human support of a professional facilitator.</p>
            <p>For teams organizing activities around Slack, see <Link to="/slack/team-building" className="font-semibold text-primary underline">simple Slack team-building activities</Link>. Guided laughter is one choice among many, not a clinical service.</p>
          </div>
          <Button asChild variant="link" className="mt-6 h-auto whitespace-normal px-0 font-bold"><Link to="/">Try a guided session <ArrowRight /></Link></Button>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">When to choose a professional</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>For a longer workshop or a group that needs tailored activities, consider a trained laughter yoga facilitator. Ask about their experience, accessibility, consent and how they handle people who prefer not to participate. Facilitator training is not the same as a healthcare qualification.</p>
            <p>If someone needs help with a medical or psychological concern, direct them to an appropriately qualified healthcare professional. Neither a team host nor a digital laughter guide should take on that role.</p>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Keep exploring</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Understand <Link to="/laughter-therapy" className="font-semibold text-primary underline">what laughter therapy means</Link>, compare <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">laughter yoga at work</Link> or explore <Link to="/laughter-yoga/for-teams" className="font-semibold text-primary underline">group laughter formats</Link>. For more workplace options, read our guides to <Link to="/slack/team-building" className="font-semibold text-primary underline">Slack team building</Link> and <Link to="/slack/wellness" className="font-semibold text-primary underline">Slack wellness</Link>.</p>
        </section>
        <SiteFooter />
      </div>
    </main>
  );
}