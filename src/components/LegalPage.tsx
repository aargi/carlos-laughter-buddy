import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/LogoMark";
import { ShareButton } from "@/components/ShareButton";
import { SlackLogo } from "@/components/SlackLogo";
import { SiteFooter } from "@/components/SiteFooter";

export function LegalPage({ title, children, updated = false }: { title: string; children: ReactNode; updated?: boolean }) {
  return (
    <main className="min-h-screen overflow-x-clip">
      <div className="mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-12">
        <nav aria-label="Main navigation" className="sticky top-0 z-50 -mx-5 mb-10 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-5 py-3 sm:mb-12 sm:gap-3 md:-mx-6 md:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2 font-display text-base font-black md:text-xl"><LogoMark size={28} className="hidden sm:block" /><span className="whitespace-nowrap">Laughter<span className="text-primary">Circle</span></span></Link>
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex"><Link to="/story">Our story</Link></Button>
            <ShareButton />
            <Button asChild variant="slack" size="sm"><Link to="/slack"><SlackLogo className="size-4" />Slack</Link></Button>
          </div>
        </nav>
        <article lang="es" className="max-w-3xl">
          <h1 className="font-display text-4xl font-black leading-tight md:text-6xl">{title}</h1>
          {updated && <p className="mt-5 text-sm text-muted-foreground">Última actualización: 19 de octubre de 2026</p>}
          <div className="mt-10 space-y-10 text-base leading-relaxed text-muted-foreground [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-foreground [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_a]:text-primary [&_a]:underline [&_strong]:text-foreground">{children}</div>
        </article>
        <SiteFooter />
      </div>
    </main>
  );
}

export function LegalContact() { return <a href="mailto:hello@laughtercircle.com">hello@laughtercircle.com</a>; }

export function legalHead(path: string, title: string, description: string) {
  const url = `https://laughtercircle.com/${path}`;
  return {
    meta: [
      { title: `${title} — Laughter Circle` }, { name: "description", content: description },
      { property: "og:title", content: `${title} — Laughter Circle` }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { property: "og:url", content: url }, { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}