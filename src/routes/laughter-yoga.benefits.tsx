import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Heart, Smile, Users, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Benefits of Laughter Yoga: What Research and Practice Suggest";
const DESCRIPTION = "Explore the benefits of laughter yoga for stress, mood, social connection and wellbeing — separating participant experiences, scientific evidence and what remains uncertain.";
const URL = "https://laughtercircle.com/laughter-yoga/benefits";

export const Route = createFileRoute("/laughter-yoga/benefits")({
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
  component: LaughterYogaBenefitsPage,
});

const SOURCES = [
  { title: "Group-based laughter yoga and mental health in adults", year: "2018", url: "https://pubmed.ncbi.nlm.nih.gov/30030938/", detail: "Bressington et al. — systematic review of six experimental studies specifically about laughter yoga; promising short-term findings, but weak overall evidence." },
  { title: "Laughter interventions for stress reduction in adults", year: "2026", url: "https://pubmed.ncbi.nlm.nih.gov/42001147/", detail: "Li et al. — meta-analysis of 15 randomized trials with 1,344 participants; includes laughter yoga, simulated laughter and comedy-based interventions. Results varied substantially between studies." },
  { title: "Laughter therapy, life satisfaction and anxiety", year: "2025", url: "https://link.springer.com/article/10.1007/s10902-025-00934-z", detail: "Porras-Jiménez et al. — systematic review and meta-analysis of randomized trials, including a laughter-yoga subgroup. Positive findings need to be read alongside differences between interventions and populations." },
  { title: "Spontaneous laughter and cortisol levels", year: "2023", url: "https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0286260", detail: "Kramer and Leitao — systematic review and meta-analysis of spontaneous laughter, not proof that every laughter-yoga session changes cortisol or produces a lasting health benefit." },
];

function Citation({ source }: { source: number }) {
  const item = SOURCES[source - 1];
  if (!item) return null;
  return <a href={item.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline" aria-label={`Source ${source}: ${item.title}`}>[{source}]</a>;
}

const EXPERIENCES = [
  { icon: Wind, title: "A pause from stress", text: "Feeling less tense or more relaxed after a session is one of the experiences people associate with the practice. A pause, gentle breathing and a change of activity may all contribute; it is not necessarily an effect of laughter alone." },
  { icon: Smile, title: "A lighter mood", text: "Enjoyment, playfulness or feeling a little more upbeat are reasonable things to notice. Some people feel awkward or unchanged instead. There is no required response, and nobody needs to force a positive feeling." },
  { icon: Users, title: "A shared social moment", text: "Following the same rhythm, making eye contact where comfortable and doing something playful together can feel connecting. That experience is different from proving that a session reduces loneliness or creates lasting team cohesion." },
  { icon: Heart, title: "An enjoyable wellbeing break", text: "Gentle movement, clapping and breathing can turn a passive break into a shared activity. Enjoying that activity can be worthwhile on its own, without describing it as a workout, a clinical intervention or a fix for workplace problems." },
];

function LaughterYogaBenefitsPage() {
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
          <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">Benefits of laughter yoga: <span className="text-primary">what research and practice suggest.</span></h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Laughter yoga is often associated with less stress, a lighter mood and feeling connected to others. Research offers encouraging signals, but not every claim is established — and a pleasant session is not the same as a proven health outcome.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-auto rounded-full px-6 py-3.5 font-bold"><a href="#evidence">What the evidence says <ArrowRight /></a></Button>
            <Button asChild variant="outline" size="lg" className="h-auto rounded-full px-6 py-3.5 font-bold"><Link to="/laughter-yoga">What is laughter yoga?</Link></Button>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">The short answer</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>The most defensible benefit is the opportunity for an enjoyable, shared break. Trials also suggest improvements in stress-related scores and some measures of mood and wellbeing, but study quality, different formats and limited follow-up make firm promises inappropriate. <Citation source={1} /> <Citation source={2} /> <Citation source={3} /></p>
            <p>Keep three things separate: what a participant feels, what a study measures and what has not been demonstrated. None of them guarantees how you will feel after trying a session.</p>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Perceived benefits: what people may notice</h2>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">These are possible personal experiences, not universal outcomes or testimonials collected by Laughter Circle.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {EXPERIENCES.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border bg-card p-6">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary"><Icon className="size-5" /></span>
                <h3 className="mt-4 font-display text-xl font-black">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">A self-reported feeling is meaningful to the person reporting it, but it cannot by itself establish cause. Expectations, the facilitator, the group and simply taking time away from a task can influence the experience.</p>
        </section>

        <section id="evidence" className="mt-24 scroll-mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Scientific evidence: promising, not definitive</h2>
          <div className="mt-8 max-w-3xl space-y-10 text-lg leading-relaxed text-muted-foreground">
            <div>
              <h3 className="font-display text-2xl font-black text-foreground">Stress and relaxation</h3>
              <p className="mt-3">A 2026 meta-analysis of 15 randomized trials involving 1,344 adults reported lower stress scores following laughter interventions. However, the interventions included laughter yoga, simulated laughter and comedy-based activities, and results differed greatly between studies. Programs lasted from one to sixteen weeks; this is not evidence that a single three-minute digital session produces the same result. <Citation source={2} /></p>
              <p className="mt-3">A separate review found reductions in cortisol after spontaneous laughter. That is broader laughter research, not a direct test of laughter yoga or Laughter Circle. A change in a stress-related hormone is also not proof of a lasting clinical benefit. <Citation source={4} /></p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-black text-foreground">Mood and emotional wellbeing</h3>
              <p className="mt-3">A laughter-yoga-specific review of six experimental studies found promising short-term improvements in depressive symptoms in two studies, but inconsistent results overall. The authors judged the evidence weak because of poor study quality and risk of bias, with insufficient evidence of superiority over other group activities. A symptom score in a trial is not a reason to call laughter yoga a treatment for depression. <Citation source={1} /></p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-black text-foreground">Life satisfaction and broader wellbeing</h3>
              <p className="mt-3">A 2025 review of randomized trials reported improvements in anxiety scores and life satisfaction across laughter-based interventions, including positive findings in a laughter-yoga subgroup. This adds to the encouraging evidence, but differences in participants, techniques and study results limit how confidently it applies to a particular person or session. <Citation source={3} /></p>
            </div>
            <div>
              <h3 className="font-display text-2xl font-black text-foreground">Social connection and group activity</h3>
              <p className="mt-3">Laughter yoga gives a group a shared task rather than requiring someone to tell a joke. It can be an enjoyable setting for interaction, but the reviews cited here do not establish that it creates lasting friendships, reduces loneliness or improves team performance. They also do not clearly separate laughter from the attention, breathing, movement and social contact that accompany it. <Citation source={1} /> <Citation source={2} /> <Citation source={3} /></p>
              <p className="mt-3">For <Link to="/laughter-yoga/for-teams" className="font-semibold text-primary underline">teams and groups</Link>, it is more useful to ask whether people enjoyed taking part than to promise a productivity or wellbeing result.</p>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">What is not well demonstrated</h2>
          <ul className="mt-7 max-w-3xl space-y-5 text-lg leading-relaxed text-muted-foreground">
            <li><strong className="text-foreground">Lasting effects.</strong> Short-term changes do not establish benefits months or years later, or the ideal frequency and length of sessions.</li>
            <li><strong className="text-foreground">Which ingredient matters.</strong> Laughter, gentle breathing, movement, encouragement and group attention often arrive together. The research does not reliably isolate each contribution.</li>
            <li><strong className="text-foreground">Broad medical claims.</strong> The evidence discussed here does not justify promises that laughter yoga cures illness, boosts immunity, prevents disease or replaces mental health care.</li>
            <li><strong className="text-foreground">Results for every setting.</strong> Findings in students or specific clinical populations cannot automatically be applied to every workplace, age group or online session.</li>
            <li><strong className="text-foreground">Results for this app.</strong> The cited studies did not evaluate Laughter Circle. Their findings cannot be presented as benefits demonstrated for an AI-led session.</li>
          </ul>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">Small samples, variable control groups, self-reported outcomes and the difficulty of hiding which activity participants receive can all affect confidence in the findings. Positive averages do not mean every participant benefits. <Citation source={1} /> <Citation source={2} /> <Citation source={3} /></p>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Trying it without expecting a cure</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Start gently, stay within your comfort and make participation optional. You can pause, watch or stop; there is no need to laugh harder or longer to make the session count. If an exercise causes discomfort, stop. If you have concerns about whether it is suitable for you, ask a qualified health professional.</p>
            <p>Try a few <Link to="/laughter-yoga/exercises" className="font-semibold text-primary underline">simple laughter yoga exercises</Link>, join a trained facilitator or explore how <Link to="/laughter-yoga/virtual" className="font-semibold text-primary underline">virtual laughter sessions</Link> work. A facilitator can adapt the session to the group; a digital guide cannot offer that same individual support.</p>
            <p>At work, keep it an invitation rather than a requirement. A shared laugh can be one break option, alongside movement or a quiet pause — not a solution to workload, burnout or organizational problems. See <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">laughter yoga at work</Link> for possible formats.</p>
          </div>
        </section>

        <section className="mt-24 border-y border-primary/30 bg-primary/10 px-6 py-10 md:px-10">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Laughter Circle</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">A way to join in, <span className="text-primary">not a treatment.</span></h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Laughter Circle offers short guided laughter sessions in your browser. An AI guide explains an exercise, laughs first and invites you to follow along, with gentle breathing at the end.</p>
            <p>It is one way to experience guided laughter, on your own or with other people. It has not been clinically evaluated, makes no medical or therapeutic claims and does not replace a trained laughter yoga professional or professional healthcare.</p>
          </div>
          <Button asChild variant="link" className="mt-6 h-auto px-0 font-bold"><Link to="/">Try a guided session <ArrowRight /></Link></Button>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Research and further reading</h2>
          <p className="mt-4 max-w-3xl text-muted-foreground">Selected peer-reviewed reviews, not an exhaustive literature review. Published findings should be read in the context of their methods and limitations.</p>
          <ol className="mt-8 space-y-6">
            {SOURCES.map((source, i) => (
              <li key={source.url} className="max-w-3xl border-b pb-6">
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">[{i + 1}] {source.title} ({source.year})</a>
                <p className="mt-2 leading-relaxed text-muted-foreground">{source.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Keep exploring</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Start with <Link to="/laughter-yoga" className="font-semibold text-primary underline">what laughter yoga is</Link>, explore the <Link to="/laughter-yoga/exercises" className="font-semibold text-primary underline">exercises</Link> or see how it fits <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">the workplace</Link>. You can also compare <Link to="/laughter-yoga/virtual" className="font-semibold text-primary underline">online formats</Link> and <Link to="/laughter-yoga/for-teams" className="font-semibold text-primary underline">shared activities for teams</Link>.</p>
        </section>
        <SiteFooter />
      </div>
    </main>
  );
}