import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
  variant?: "dark" | "light";
}

const heightMap = {
  sm: 24,
  md: 32,
  lg: 40,
};

export default function Logo({ size = "md", href = "/yacht", variant = "dark" }: LogoProps) {
  const src = variant === "light"
    ? "/logos/White logo - no background.png"
    : "/logos/Color logo - no background.png";

  return (
    <Link href={href} className="inline-flex items-center">
      <Image
        src={src}
        alt="Blue Cover"
        height={heightMap[size]}
        width={heightMap[size] * 4}
        style={{ height: heightMap[size], width: "auto", objectFit: "contain" }}
        priority
      />
    </Link>
  );
}
