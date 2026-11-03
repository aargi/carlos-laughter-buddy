import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { SlackLogo } from "@/components/SlackLogo";
import { ShareButton } from "@/components/ShareButton";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "AI-Guided Laughter: How Laughter Circle Differs From a Traditional Laughter Yoga Session";
const DESCRIPTION = "How Laughter Circle works: AI characters with generated voices guide short laughter sessions through voice and a small avatar—no live instructor, scheduling or class required.";
const URL = "https://laughteryoga.lovable.app/blog/ai-guided-laughter";

export const Route = createFileRoute("/blog/ai-guided-laughter")({
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
  component: AiGuidedLaughterArticle,
});

function AiGuidedLaughterArticle() {
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
              <span className="inline-flex items-center gap-2"><Sparkles className="size-4" aria-hidden="true" /> How Laughter Circle works</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-tight md:text-5xl">AI-Guided Laughter: How Laughter Circle Differs From a <span className="text-primary">Traditional Session</span></h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">A traditional laughter yoga or laughter therapy session is led by a person, in a room or on a live video call. Laughter Circle asks a different question: what if the guide were a character with an AI-generated voice, available whenever you are?</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">We build Laughter Circle, so this article explains our own product. It is an honest description of what the format changes—and what it does not replace.</p>
          </header>

          <div className="max-w-3xl space-y-14 pt-12 text-lg leading-relaxed text-muted-foreground md:space-y-16">
            <section aria-labelledby="traditional">
              <h2 id="traditional" className="font-display text-3xl font-black leading-tight text-foreground">The traditional format: a person leads the room</h2>
              <p className="mt-5">In a typical <Link to="/laughter-yoga" className="font-semibold text-primary underline">laughter yoga</Link> session, a certified teacher guides a group through playful exercises: clapping rhythms, breathing, eye contact and laughter that starts simulated and often turns genuine. The same holds for most <Link to="/laughter-therapy" className="font-semibold text-primary underline">laughter therapy</Link> and guided laughter sessions—a facilitator sets the pace, reads the room and adapts.</p>
              <p className="mt-4">That human guidance is the format's strength. It is also its constraint: someone has to schedule the session, book the instructor, gather the group and show up at the same time. For a workplace team spread across time zones, that coordination is often where the idea quietly dies.</p>
            </section>

            <section aria-labelledby="characters">
              <h2 id="characters" className="font-display text-3xl font-black leading-tight text-foreground">What changes: characters with AI-generated voices</h2>
              <p className="mt-5">Laughter Circle replaces the live instructor with ten characters, each with their own personality, aura and unmistakable laugh. Carlos, Big Walt, Zoe and the rest of the circle are voiced with AI-generated speech: the guide explains each exercise aloud, then laughs with you in their own particular way.</p>
              <p className="mt-4">The voices and laughs are pre-generated audio, not synthesized on the fly. That keeps playback instant and the experience consistent: the character you picked yesterday sounds exactly the same today. You choose the guide whose energy fits your mood—calm, theatrical, deadpan or chaotic—and the session follows their style.</p>
              <p className="mt-4">The exercises themselves come from the same family as classic <Link to="/laughter-yoga/exercises" className="font-semibold text-primary underline">laughter yoga exercises</Link>: playful sounds, rhythmic laughter and free laughter, progressing from gentle to full-bodied. What is different is who—or what—is leading them.</p>
            </section>

            <section aria-labelledby="minimal">
              <h2 id="minimal" className="font-display text-3xl font-black leading-tight text-foreground">A deliberately minimal audiovisual experience</h2>
              <p className="mt-5">Laughter Circle is not a video call, a filmed class or an immersive app. The experience is almost entirely audio: the character's voice guides you, and a small illustrated avatar with a colored aura gives you something to look at. That is the whole stage.</p>
              <p className="mt-4">The minimalism is a design choice, not a limitation we are hiding. A video of a laughing instructor asks you to watch; a voice asks you to participate. There is no camera pointed at you, nothing to perform for and no screen demanding your attention while you are supposed to be laughing. You can close your eyes, look away or laugh at the ceiling—the session works the same.</p>
            </section>

            <section aria-labelledby="accessible">
              <h2 id="accessible" className="font-display text-3xl font-black leading-tight text-foreground">Short sessions, no scheduling</h2>
              <p className="mt-5">A session takes a few minutes and starts when you press a button. There is no calendar invite, no booking, no minimum group size and no instructor whose availability has to match yours. That changes when laughter exercises can realistically happen: before a meeting, after a hard call, or in the gap between two tasks.</p>
              <p className="mt-4">Brevity also lowers the threshold for trying. Committing to a 45-minute class with strangers is a decision; laughing along with a character for three minutes is closer to an impulse. The format trades the depth of a full facilitated session for something people will actually do on an ordinary Tuesday.</p>
            </section>

            <section aria-labelledby="workplace">
              <h2 id="workplace" className="font-display text-3xl font-black leading-tight text-foreground">Shared laughter between coworkers</h2>
              <p className="mt-5">The same format extends to teams. <Link to="/slack" className="font-semibold text-primary underline">Laughter Circle for Slack</Link> posts a short invitation in a channel; whoever wants to join opens a guided session in the browser and laughs along with the same character. Nobody needs to be in the same office, and nobody needs a facilitator on the payroll.</p>
              <p className="mt-4">The idea is not to replace <Link to="/slack/team-building" className="font-semibold text-primary underline">team-building activities</Link> but to add a smaller one to the mix: a shared moment of laughter that fits inside the workday instead of competing with it. Two colleagues laughing at the same ridiculous exercise, each at their own desk, is a different kind of connection than another trivia round.</p>
            </section>

            <section aria-labelledby="limits" className="border-t pt-10">
              <h2 id="limits" className="font-display text-3xl font-black leading-tight text-foreground">What this format is not</h2>
              <p className="mt-5">Honesty matters more than the pitch. Laughter Circle is not laughter therapy in the clinical sense, not a medical or psychological treatment, and not a substitute for a trained professional. A live facilitator reads the room, adapts to the people in it and brings something no pre-generated voice can: presence.</p>
              <p className="mt-4">If you are looking for a certified teacher—for a workshop, an offsite or regular guided sessions—our <Link to="/professionals" className="font-semibold text-primary underline">laughter professionals directory</Link> is being built for exactly that. Laughter Circle sits alongside that world, not above it: an accessible, always-available way to bring guided laughter into an ordinary day, inspired by the practices that came before it.</p>
              <p className="mt-4">The project itself started as an experiment—built by voice while running through Barcelona during a hackathon. You can read <Link to="/story" className="font-semibold text-primary underline">the full story</Link> if you are curious where the circle came from.</p>
            </section>
          </div>
          <Button asChild variant="link" className="mt-10 h-auto max-w-full justify-start px-0 whitespace-normal text-left"><Link to="/blog/best-slack-apps-team-building"><ArrowLeft aria-hidden="true" />Back to the seven-app comparison</Link></Button>
        </article>
        <SiteFooter />
      </div>
    </main>
  );
}
