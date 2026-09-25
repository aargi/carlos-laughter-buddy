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
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Laughter Circle</p>
      </div>
    </footer>
  );
}
