import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { ShareButton } from "@/components/ShareButton";
import { SlackLogo } from "@/components/SlackLogo";
import { SiteFooter } from "@/components/SiteFooter";
import { ProfessionalApplicationForm } from "@/components/ProfessionalApplicationForm";

const TITLE = "Join Laughter Circle as a Laughter Yoga Professional";
const DESCRIPTION = "Apply to join Laughter Circle’s developing professional directory. Help people, groups and teams discover your online or in-person guided laughter sessions. Free to apply.";
const URL = "https://laughteryoga.lovable.app/professionals/join";

export const Route = createFileRoute("/professionals/join")({
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
  component: JoinProfessionalPage,
});

function JoinProfessionalPage() {
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
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground"><Users className="size-4" /> Help us build the circle</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">Join Laughter Circle <span className="text-primary">as a laughter yoga professional.</span></h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">For laughter yoga teachers, leaders, instructors and other guided laughter professionals who want to be discovered by people, groups and companies looking for a human-led session.</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">We are currently building our professional network. You can apply to be considered for the directory; public profiles and session requests are not available yet.</p>
          <Button asChild size="lg" className="mt-7 h-auto whitespace-normal rounded-full px-6 py-3.5 font-bold"><a href="#apply">Apply to join <ArrowRight /></a></Button>
        </section>

        <section className="mt-16 border-t pt-10">
          <h2 className="font-display text-3xl font-black md:text-5xl">Digital laughter. Human connection.</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Laughter Circle offers short, browser-based guided laughter sessions with AI characters, inspired by laughter yoga and shared laughter. A digital guide is one way to try a session, but it is not the same as a live professional who can listen, respond and adapt to a group.</p>
            <p>That is why we are building a <Link to="/professionals" className="font-semibold text-primary underline">network of laughter professionals</Link>: to help people move from curiosity to finding someone who can lead a session suited to their setting, language and needs.</p>
            <p>Whether you lead local groups, online sessions or workplace workshops, your experience brings a human dimension that an AI-guided session does not replace. Learn more about <Link to="/laughter-yoga" className="font-semibold text-primary underline">laughter yoga</Link> and the different ways it is practiced.</p>
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-black md:text-5xl">Make your work easier to discover</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">As the directory develops, we plan to help visitors explore professional profiles and send enquiries for sessions. These are planned opportunities, not live features or promised referrals.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { icon: MapPin, title: "Near their community", text: "Help people and local groups discover professionals offering in-person sessions in their city or area." },
              { icon: Globe, title: "Across locations", text: "Make online sessions discoverable by language and relevant professional information, even when participants are in different places." },
              { icon: Users, title: "For groups and teams", text: "Help companies and organisers explore facilitators for team breaks, shared activities and workshops." },
            ].map(({ icon: Icon, title, text }) => <div key={title} className="border-t py-6"><Icon className="size-6 text-primary" /><h3 className="mt-4 font-display text-xl font-black">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></div>)}
          </div>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">See what future visitors will look for on <Link to="/professionals/find" className="font-semibold text-primary underline">Find a laughter yoga professional</Link>, or explore <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">laughter yoga at work</Link> for workplace session formats.</p>
        </section>

        <section className="mt-20 border-y border-primary/30 bg-primary/10 px-6 py-10 md:px-10">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">A network in the making</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">An application, not a promise.</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Applying is free. We do not ask for payment details, and we do not promise a number of clients, paid work or session requests.</p>
            <p>Submitting your details expresses interest in joining. It does not automatically publish a profile, confirm a listing or create a booking. We may contact you to discuss your application and the developing directory.</p>
            <p>Titles and certification backgrounds vary. A laughter yoga certification does not by itself establish a healthcare qualification. Laughter Circle is not a medical or psychological treatment service.</p>
          </div>
        </section>

        <section id="apply" className="mt-20 scroll-mt-24">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">For teachers, leaders and facilitators</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">Apply to join the professional network</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Tell us the basics about your work. Certification details are optional if they do not apply to your background; your website or professional profile is optional too.</p>
          <ProfessionalApplicationForm />
        </section>

        <section className="mt-20">
          <h2 className="font-display text-3xl font-black md:text-5xl">Keep exploring</h2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Visit the <Link to="/professionals" className="font-semibold text-primary underline">professionals hub</Link>, see how we plan to help visitors <Link to="/professionals/find" className="font-semibold text-primary underline">find a laughter professional</Link>, read <Link to="/laughter-yoga" className="font-semibold text-primary underline">how laughter yoga works</Link> or explore <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">laughter sessions in the workplace</Link>.</p>
        </section>
        <SiteFooter />
      </div>
    </main>
  );
}