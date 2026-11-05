import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { SlackLogo } from "@/components/SlackLogo";
import { ShareButton } from "@/components/ShareButton";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Why We Built Laughter Circle Around Voice, Not Screens";
const DESCRIPTION = "Our product philosophy: why Laughter Circle is an audio-first experience, using expressive AI voices and minimal avatars for short, screen-light laughter breaks at work.";
const URL = "https://laughteryoga.lovable.app/blog/voice-not-screens";

export const Route = createFileRoute("/blog/voice-not-screens")({
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
  component: VoiceNotScreensArticle,
});

const linkCls = "font-semibold text-primary underline";
const h2Cls = "font-display text-3xl font-black leading-tight text-foreground";

function VoiceNotScreensArticle() {
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
              <span className="inline-flex items-center gap-2"><AudioLines className="size-4" aria-hidden="true" /> Product philosophy</span>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-4xl font-black leading-tight md:text-5xl">Why We Built Laughter Circle Around <span className="text-primary">Voice, Not Screens</span></h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">Most digital products compete for your eyes. When we started designing short laughter breaks, we kept arriving at the opposite conclusion: the best version of this experience asks you to look at less, and listen more.</p>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">This is not a pitch. It is an explanation of the choices behind an audio-first product, including the trade-offs we accepted.</p>
          </header>

          <div className="max-w-3xl space-y-14 pt-12 text-lg leading-relaxed text-muted-foreground md:space-y-16">
            <section aria-labelledby="voice">
              <h2 id="voice" className={h2Cls}>A voice carries more than words</h2>
              <p className="mt-5">Think of the last time you recognized a friend on the phone from a single “hey”. Tone, rhythm, hesitation and warmth arrive before meaning does. A voice tells you whether someone is calm or excited, teasing or sincere, long before you have parsed the sentence.</p>
              <p className="mt-4">Laughter is the clearest example. A laugh is almost pure sound: you can hear a giggle, a wheeze or a booming belly laugh and picture the person behind it without seeing them. Most of us have caught ourselves laughing at someone else's laugh with no idea what the joke was. That is the quality we wanted to build on—not a picture of someone laughing, but the sound of it, close enough to join.</p>
              <p className="mt-4">So each character in Laughter Circle is defined first by how they sound: the pace of their explanations, the energy in their encouragement, and above all a laugh that belongs only to them.</p>
            </section>

            <section aria-labelledby="ai-voice">
              <h2 id="ai-voice" className={h2Cls}>What AI voice makes possible</h2>
              <p className="mt-5">A few years ago, giving ten distinct characters convincing, expressive voices would have meant casting and recording ten actors. Modern AI voice generation has made it practical for a small team to design a whole cast—each with a recognizable timbre, personality and style of laughter—and to keep them consistent.</p>
              <p className="mt-4">We use that capability deliberately narrowly. The guides' phrases and laughs are generated ahead of time and played as fixed audio, rather than synthesized live for every session. That keeps playback quick, makes each character sound the same every time you return, and avoids treating AI as a spectacle. The technology is there to serve the character, not the other way round.</p>
              <p className="mt-4">We are cautious about where this goes next. AI voice is improving, but we do not think the interesting question is how realistic it can become. It is whether a voice can make a three-minute break feel warm and a little absurd. For a closer look at how sessions work, see <Link to="/blog/ai-guided-laughter" className={linkCls}>how AI-guided laughter differs from a traditional session</Link>.</p>
            </section>

            <section aria-labelledby="screens">
              <h2 id="screens" className={h2Cls}>A break that does not feel like more screen time</h2>
              <p className="mt-5">For many people, a “break” at work means switching from one screen to another: from a spreadsheet to a feed, from a call to a video. The eyes stay busy and attention stays pulled forward.</p>
              <p className="mt-4">We wanted a laughter break to feel different. Once a session starts, there is nothing you need to watch. A small illustrated avatar with a colored aura shows who is guiding you, but the session works the same if you lean back, close your eyes, look out of the window or stand up and move. There is no camera on you and nothing to perform for.</p>
              <p className="mt-4">We call this screen-light rather than screen-free wellness: you still press a button on a device to begin. But the experience itself lives in your ears and your body, not in your attention span. We make no clinical claims about this; it simply matches what a short pause should feel like.</p>
            </section>

            <section aria-labelledby="workday">
              <h2 id="workday" className={h2Cls}>Audio fits into the cracks of a workday</h2>
              <p className="mt-5">Audio-first experiences have a practical advantage: they need less from you. You do not have to rearrange windows, find good lighting or be presentable. A voice-first app can be used with headphones at a desk, in a quiet corner of the office or in a kitchen at home between calls.</p>
              <p className="mt-4">That matters most for remote and hybrid teams, who already spend much of the day on camera. Inviting colleagues to another video session for a laughter break adds to the very fatigue the break is meant to relieve. With <Link to="/slack" className={linkCls}>Laughter Circle for Slack</Link>, an invitation appears in a channel and anyone who wants to join opens a short session in their browser. Workplace laughter becomes something that slips into the day rather than another meeting on the calendar.</p>
            </section>

            <section aria-labelledby="connection">
              <h2 id="connection" className={h2Cls}>Connection over visual complexity</h2>
              <p className="mt-5">We could have built richer visuals: animated 3D characters, scenes, effects. Each would have made the product more impressive in a demo and, we suspect, less effective in practice. Every extra element on screen is something to look at instead of something to do.</p>
              <p className="mt-4">The tradition we draw from points the same way. <Link to="/laughter-yoga" className={linkCls}>Laughter yoga</Link> works through simple, playful exercises and the contagious effect of laughing alongside others—not through production value. Our job is to keep that simplicity intact: a voice that invites you in, a companion laugh or two from the circle, and the knowledge that teammates may be laughing at the same silly exercise from their own desks.</p>
              <p className="mt-4">Human connection is the goal; the voice is just the shortest path to it we have found.</p>
            </section>

            <section aria-labelledby="limits" className="border-t pt-10">
              <h2 id="limits" className={h2Cls}>What we are not claiming</h2>
              <p className="mt-5">An AI voice is not a person in the room. Laughter Circle is not therapy or a medical treatment, and it does not replace trained laughter professionals, who can read a group and adapt in ways a pre-generated voice cannot. Audio-first is a design choice for short, everyday breaks—not a verdict that screens or live sessions are bad.</p>
              <p className="mt-4">It is simply the version of guided laughter we wanted to exist: quick to start, easy on the eyes, and built around the most human sound there is.</p>
            </section>
          </div>
          <Button asChild variant="link" className="mt-10 h-auto max-w-full justify-start px-0 whitespace-normal text-left"><Link to="/blog/ai-guided-laughter"><ArrowLeft aria-hidden="true" />Read: how AI-guided laughter works</Link></Button>
        </article>
        <SiteFooter />
      </div>
    </main>
  );
}
