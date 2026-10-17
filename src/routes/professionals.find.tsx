import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Globe, Mail, MapPin, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { ShareButton } from "@/components/ShareButton";
import { SlackLogo } from "@/components/SlackLogo";
import { SiteFooter } from "@/components/SiteFooter";
import { plannedProfessionalRequest } from "@/lib/professional-requests";

const TITLE = "Find a Laughter Yoga Professional Near You";
const DESCRIPTION = "Looking for a laughter yoga teacher near you or an online guided laughter session? Learn what to consider while Laughter Circle builds its professional directory.";
const URL = "https://laughteryoga.lovable.app/professionals/find";

export const Route = createFileRoute("/professionals/find")({
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
      isPartOf: { "@type": "WebSite", name: "Laughter Circle", url: "https://laughteryoga.lovable.app" },
    }) }],
  }),
  component: FindProfessionalPage,
});

function FindProfessionalPage() {
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
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground"><Search className="size-4" /> Human-led laughter</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">Find a laughter yoga professional <span className="text-primary">near you.</span></h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">A local session for your group, an online teacher for your team, or a facilitator for your next workshop. Finding the right person starts with the kind of experience you want to share.</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Laughter Circle is building a directory of laughter yoga teachers, leaders and guided laughter professionals. The directory is coming soon: there are no professional profiles, map results or session bookings available here yet.</p>
          <Button asChild size="lg" className="mt-7 h-auto whitespace-normal rounded-full px-6 py-3.5 font-bold"><a href="#planning">Plan your session <ArrowRight /></a></Button>
        </section>

        <section className="mt-16 border-t pt-10">
          <h2 className="font-display text-3xl font-black md:text-5xl">Looking for laughter yoga near you?</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>If you are searching for “laughter yoga near me”, think about your location, travel distance and whether you would prefer a recurring group, a private session or a one-off event. A nearby laughter yoga teacher may offer different formats for individuals, community groups and workplaces; ask what is actually available rather than assuming every teacher offers all three.</p>
            <p>An online session can also be a practical option when there is no suitable local session or your group is spread across locations. Language, time zone, accessibility and a facilitator’s experience with online groups matter as much as geography.</p>
            <p>New to the practice? Read <Link to="/laughter-yoga" className="font-semibold text-primary underline">what laughter yoga is</Link> before deciding which format suits you.</p>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-black md:text-5xl">Choose the setting first</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { icon: MapPin, title: "In person", text: "For a local group, community gathering or workplace. Discuss the venue, travel, space, accessibility and how the activities can be adapted for your participants." },
              { icon: Globe, title: "Online", text: "For individuals or groups joining from different places. Check language, time zones, the video platform and options for people who prefer to keep their camera off." },
              { icon: Users, title: "Teams and workshops", text: "For a shared break, meeting, workshop or offsite. Agree the purpose and duration with the facilitator and keep participation optional, including the option to watch." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="border-t py-6"><Icon className="size-6 text-primary" /><h3 className="mt-4 font-display text-xl font-black">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></div>
            ))}
          </div>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Organising something for colleagues? Explore <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">laughter yoga at work</Link> for session formats and practical considerations.</p>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-black md:text-5xl">What to ask a laughter yoga teacher</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Teacher, leader, instructor and facilitator can describe different training and experience. When choosing a laughter yoga instructor, ask who provided their training, when they became certified, whether they continue their learning and what experience they have with groups like yours. A certification date is useful context, not a guarantee of quality or a healthcare qualification.</p>
            <p>Ask which languages they facilitate in, what a session includes, how they handle accessibility and personal boundaries, and whether they offer online or in-person sessions. Discuss fees, travel costs and cancellation terms directly before agreeing to take part.</p>
            <p>A professional should be comfortable explaining how people can opt out or adapt an activity. Nobody should be pressured to laugh, make eye contact, move in a particular way or share personal information.</p>
          </div>
        </section>

        <section className="mt-20 border-y border-primary/30 bg-primary/10 px-6 py-10 md:px-10">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Directory coming soon</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">A clearer way to find your facilitator</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">We are preparing a directory to bring the details you need into one place. Planned features include:</p>
          <ul className="mt-6 grid gap-x-8 gap-y-4 text-muted-foreground sm:grid-cols-2">
            {[
              "A map of professionals and their locations",
              "Online and in-person session availability",
              "Certification details, including since when",
              "Languages used for sessions",
              "Individual profiles with training and experience",
              "A Book a session action to request a session",
            ].map((item) => <li key={item} className="flex items-start gap-3"><ArrowRight className="mt-1 size-4 shrink-0 text-primary" /><span>{item}</span></li>)}
          </ul>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted-foreground">These features are not live yet. We are not showing sample people, invented certifications or availability that has not been confirmed.</p>
        </section>

        <section id="planning" className="mt-20 scroll-mt-24">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-primary"><CalendarDays className="size-4" /> Plan ahead</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">How a future session request will work</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">When session requests become available, Book a session will let you send an enquiry without a credit card. The planned request will ask for:</p>
          <ol className="mt-6 max-w-3xl list-decimal space-y-3 pl-6 text-lg leading-relaxed text-muted-foreground">
            <li>Your email or contact details so the professional can respond.</li>
            <li>A proposed date at least <strong className="text-foreground">{plannedProfessionalRequest.minimumNoticeDays} days in advance</strong>.</li>
            <li>A preferred time, if you have one — this will be optional.</li>
            <li>Whether the session is {plannedProfessionalRequest.formats.join(" or ").toLowerCase()}, with location details for an in-person session.</li>
            <li>The number of participants.</li>
          </ol>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">A request will not be an instant confirmed booking or a promise of availability. The professional will need to discuss suitability, timing, pricing and terms with you before you agree on a session. No request form or Book a session button is active today.</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">For now, you can email us about what you are looking for. This is an enquiry while the directory develops, not a booking.</p>
          <Button asChild variant="outline" size="lg" className="mt-7 h-auto whitespace-normal rounded-full px-6 py-3.5"><a href="mailto:hello@laughtercircle.com?subject=Looking%20for%20a%20laughter%20professional"><Mail />Enquire about a future session</a></Button>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-black md:text-5xl">Searching for laughter therapy near you?</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>“Laughter therapy near me” is sometimes used to search for a laughter group or guided session. The word therapy does not automatically mean an activity is clinical care, and a laughter yoga professional is not necessarily a qualified medical or psychological practitioner.</p>
            <p>Laughter Circle offers recreational guided laughter sessions, not medical or psychological treatment. Neither this directory nor an AI-guided session replaces healthcare or professional facilitation. If you are looking for treatment rather than a shared activity, speak with an appropriately qualified healthcare professional.</p>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-black md:text-5xl">Keep exploring</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Visit our <Link to="/professionals" className="font-semibold text-primary underline">laughter yoga professionals hub</Link> for both discovery and professional participation. If you are a teacher, leader or facilitator, <Link to="/professionals" hash="join" className="font-semibold text-primary underline">express interest in joining Laughter Circle</Link> through the hub while a dedicated joining page is being prepared.</p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">You can also learn <Link to="/laughter-yoga" className="font-semibold text-primary underline">how laughter yoga works</Link> or explore <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">workplace laughter sessions</Link>. A short <Link to="/" className="font-semibold text-primary underline">digital session with a Laughter Circle AI guide</Link> is another way to try guided laughter, but it is different from a live professional who can respond to your group.</p>
        </section>
        <SiteFooter />
      </div>
    </main>
  );
}