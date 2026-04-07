import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  variant?: "dark" | "light";
}

const sizeMap = {
  sm: 24,
  md: 28,
  lg: 36,
};

export default function Logo({ size = "md", href = "/yacht", variant = "dark" }: LogoProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-2">
      <div
        className="flex items-center justify-center rounded-[8px]"
        style={{
          width: sizeMap[size] + 4,
          height: sizeMap[size] + 4,
          background: "linear-gradient(135deg, var(--color-blue), var(--color-opal))",
        }}
      >
        <span
          className="font-serif font-bold text-white"
          style={{ fontSize: sizeMap[size] * 0.45 }}
        >
          BC
        </span>
      </div>
      <span
        className={`font-serif font-bold ${variant === "light" ? "text-white" : "text-navy"}`}
        style={{ fontSize: sizeMap[size] * 0.55 }}
      >
        Blue Cover
      </span>
    </Link>
  );
}
