import { useEffect, useRef, useState } from "react";
import { Share2, Copy, Check, Facebook, Linkedin, Twitter, MessageCircle } from "lucide-react";

const CANONICAL_ORIGIN = "https://laughtercircle.com";

/** Current page URL on the production domain (preview URLs are mapped to the real domain). */
function shareUrl(): string {
  if (typeof window === "undefined") return CANONICAL_ORIGIN;
  const isPreview = window.location.origin.includes("lovable.app");
  const origin = isPreview ? CANONICAL_ORIGIN : window.location.origin;
  return `${origin}${window.location.pathname}`;
}
const SHARE_TEXT = "I just laughed my way through a guided laughter yoga session with 10 hilarious AI guides. Try it — it's contagious! 😂";

export function ShareButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const url = (medium: string) => `${shareUrl()}?utm_source=share&utm_medium=${medium}&utm_campaign=laughter_circle`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(url("copy_link")); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: "Laughter Circle", text: SHARE_TEXT, url: url("native") });
      setOpen(false);
    } catch { /* user cancelled */ }
  };

  const socials = [
    { label: "WhatsApp", icon: <MessageCircle className="size-4" />, href: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${url("whatsapp")}`)}` },
    { label: "X", icon: <Twitter className="size-4" />, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(url("x"))}` },
    { label: "Facebook", icon: <Facebook className="size-4" />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url("facebook"))}` },
    { label: "LinkedIn", icon: <Linkedin className="size-4" />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url("linkedin"))}` },
  ];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Share Laughter Circle"
        className="inline-flex shrink-0 items-center gap-2 rounded-full border bg-card/70 px-2.5 py-1.5 text-sm font-semibold backdrop-blur transition hover:bg-muted sm:px-4 sm:py-2"
      >
        <Share2 className="size-4" /> <span className="hidden sm:inline">Share</span>
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-2 w-60 rounded-2xl border bg-card p-3 shadow-xl">
          <button onClick={copy} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted">
            {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
            {copied ? "Link copied!" : "Copy link"}
          </button>
          {typeof navigator !== "undefined" && "share" in navigator && (
            <button onClick={nativeShare} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted">
              <Share2 className="size-4" /> Share via…
            </button>
          )}
          <div className="my-1.5 border-t" />
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted">
              {s.icon} {s.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
