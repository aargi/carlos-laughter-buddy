import carlos from "@/assets/carlos.png";

export function LogoMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={carlos}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`shrink-0 rounded-full ring-2 ring-primary/50 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
