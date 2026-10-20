import { Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/LogoMark";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t pt-10 pb-12">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-3">
          <LogoMark size={44} />
          <p className="font-display text-2xl font-black tracking-tight">
            Laughter<span className="text-primary">Circle</span>
          </p>
        </div>
        <p className="max-w-sm text-sm text-muted-foreground">
          Laughter therapy with AI guides — each with their own unmistakable laugh.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm font-semibold">
          <Link to="/" className="text-muted-foreground transition hover:text-primary">Start a session</Link>
          <Link to="/story" className="text-muted-foreground transition hover:text-primary">Our story</Link>
          <Link to="/slack" className="text-muted-foreground transition hover:text-primary">For Slack</Link>
          <Link to="/professionals" className="text-muted-foreground transition hover:text-primary">Laughter professionals</Link>
          <Link to="/laughter-therapy" className="text-muted-foreground transition hover:text-primary">What is laughter therapy?</Link>
          <Link to="/blog/best-slack-apps-team-building" className="text-muted-foreground transition hover:text-primary">Best Slack apps 2026</Link>
        </div>
        <nav aria-label="Legal information" className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-xs text-muted-foreground">
          <Link to="/privacy" className="transition hover:text-primary">Privacy</Link><span aria-hidden="true">·</span>
          <Link to="/terms" className="transition hover:text-primary">Terms</Link><span aria-hidden="true">·</span>
          <Link to="/legal" className="transition hover:text-primary">Legal</Link><span aria-hidden="true">·</span>
          <Link to="/cookies" className="transition hover:text-primary">Cookies</Link><span aria-hidden="true">·</span>
          <Link to="/contact" className="transition hover:text-primary">Contact</Link>
        </nav>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Laughter Circle</p>
      </div>
    </footer>
  );
}
