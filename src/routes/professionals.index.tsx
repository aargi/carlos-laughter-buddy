import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, MapPin, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { ShareButton } from "@/components/ShareButton";
import { SlackLogo } from "@/components/SlackLogo";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Laughter Yoga Professionals: Find a Teacher or Join Laughter Circle";
const DESCRIPTION = "Looking for a laughter yoga teacher or guided laughter facilitator? Explore session options for individuals and teams, or express interest in joining Laughter Circle’s upcoming professional directory.";
const URL = "https://laughtercircle.com/professionals";

export const Route = createFileRoute("/professionals/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "WebPage", name: TITLE,
      description: DESCRIPTION, url: URL,
      isPartOf: { "@type": "WebSite", name: "Laughter Circle", url: "https://laughtercircle.com" },
    }) }],
  }),
  component: ProfessionalsPage,
});

function ProfessionalsPage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <div className="mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-12">
        <nav aria-label="Main navigation" className="sticky top-0 z-50 -mx-5 mb-10 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-5 py-3 sm:mb-12 sm:gap-3 md:-mx-6 md:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2 font-display text-base font-black md:text-xl">
            <LogoMark size={28} className="hidden sm:block" />
            <span className="whitespace-nowrap">Laughter<span className="text-primary">Circle</span></span>
          </Link>
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex"><Link to="/story">Our story</Link></Button>
            <ShareButton />
            <Button asChild variant="slack" size="sm"><Link to="/slack"><SlackLogo className="size-4" />Slack</Link></Button>
          </div>
        </nav>

        <section>
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground"><Users className="size-4" /> People behind the laughter</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">Laughter yoga professionals: <span className="text-primary">find a teacher or join Laughter Circle.</span></h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">For people and teams looking for a human-led laughter session — and for the teachers, leaders and facilitators who make those moments possible.</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Our professional directory is coming soon. We are building a way to discover laughter yoga professionals, explore online and in-person sessions, and request a session that fits your group.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-auto whitespace-normal rounded-full px-6 py-3.5 font-bold"><Link to="/professionals/find">Find a laughter professional <ArrowRight /></Link></Button>
            <Button asChild variant="outline" size="lg" className="h-auto whitespace-normal rounded-full px-6 py-3.5 font-bold"><Link to="/professionals/join">Join Laughter Circle <ArrowRight /></Link></Button>
          </div>
        </section>

        <section id="find" className="mt-20 scroll-mt-24 border-t pt-10">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary"><Search className="size-4" /> For individuals, teams and companies</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">Find a laughter professional</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>A laughter yoga teacher, leader or guided laughter facilitator can bring human interaction to a session: introducing exercises, responding to the group and adapting the pace. A short team break, community gathering and facilitated workshop may each need a different approach.</p>
            <p>We plan to help you discover professionals by location, online or in-person availability, languages, experience and the kinds of groups they work with. You will be able to explore relevant information and request a session; those discovery and request features are not available yet.</p>
            <p>There are no professional listings or confirmed bookings on this page today. If you would like to share what you are looking for, you can email us while we develop the directory. An enquiry is not a booking or a promise that a suitable professional is available.</p>
          </div>
          <Button asChild variant="outline" size="lg" className="mt-7 h-auto whitespace-normal rounded-full px-6 py-3.5"><Link to="/professionals/find">Explore finding a professional <ArrowRight /></Link></Button>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-black md:text-5xl">A session that fits your setting</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { icon: MapPin, title: "In person", text: "A local session for a group, community event or workplace. Consider the venue, accessibility, group size and travel arrangements when discussing a session." },
              { icon: Globe, title: "Online", text: "A live facilitator-led session for people joining from different places. Ask about time zones, language, camera preferences and how everyone can take part comfortably." },
              { icon: Users, title: "Workshops and team sessions", text: "A guided activity for a meeting, offsite or shared break. Agree the duration and purpose, keep participation optional and make space for people who prefer to watch." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-t py-6"><Icon className="size-6 text-primary" /><h3 className="mt-4 font-display text-xl font-black">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Explore <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">laughter yoga at work</Link> and <Link to="/laughter-yoga/for-teams" className="font-semibold text-primary underline">shared laughter activities for teams</Link> for ideas before choosing a format.</p>
        </section>

        <section id="join" className="mt-20 scroll-mt-24 border-y border-primary/30 bg-primary/10 px-6 py-10 md:px-10">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">For laughter yoga teachers, leaders and facilitators</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">Join Laughter Circle</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Do you lead laughter yoga, laughter sessions or other guided laughter activities? We would like to hear from professionals interested in being discovered through Laughter Circle as the directory develops.</p>
            <p>Tell us where you work, which languages you use, whether you offer online or in-person sessions, and a little about your training, experience and session formats. A link to your professional website can help us understand your work.</p>
            <p>You can now submit a free application to join our developing professional network. This is not an automatic listing: professional profiles and session requests are still being developed. Applying does not guarantee publication, referrals or paid work.</p>
          </div>
          <Button asChild size="lg" className="mt-7 h-auto whitespace-normal rounded-full px-6 py-3.5 font-bold"><Link to="/professionals/join">Apply to join <ArrowRight /></Link></Button>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-black md:text-5xl">Choose a facilitator with care</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Ask about training, experience with groups like yours, what the session includes, pricing and cancellation terms. Titles such as teacher, leader and facilitator can describe different backgrounds; do not assume a title alone establishes a healthcare qualification.</p>
            <p>A good conversation also covers accessibility, personal boundaries and how activities can be adapted. Nobody should be pressured to laugh, make eye contact or disclose how they feel.</p>
            <p>Laughter Circle offers recreational guided laughter experiences, not medical or psychological treatment. A professional-led laughter session is not automatically clinical therapy either. If you need healthcare, speak with an appropriately qualified healthcare professional.</p>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-black md:text-5xl">Human guidance and digital laughter</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">You can already try a short browser-based session with a Laughter Circle AI guide. It is a different experience from a live teacher who can respond to your group, and it does not replace professional facilitation. While the directory is being built, it remains one optional way to explore guided laughter.</p>
          <Button asChild variant="link" className="mt-5 h-auto whitespace-normal px-0 font-bold"><Link to="/">Try a guided laughter session <ArrowRight /></Link></Button>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-black md:text-5xl">Keep exploring</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Read <Link to="/laughter-yoga" className="font-semibold text-primary underline">what laughter yoga is</Link>, explore <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">workplace session formats</Link> and <Link to="/laughter-yoga/for-teams" className="font-semibold text-primary underline">laughter yoga for teams</Link>, or learn how <Link to="/laughter-therapy" className="font-semibold text-primary underline">laughter therapy differs from guided laughter and clinical care</Link>.</p>
        </section>
        <SiteFooter />
      </div>
    </main>
  );
}