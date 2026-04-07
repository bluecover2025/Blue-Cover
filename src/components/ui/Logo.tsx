import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  href?: string;
}

const heightMap = {
  sm: 24,
  md: 28,
  lg: 36,
};

export default function Logo({ size = "md", href = "/yacht" }: LogoProps) {
  return (
    <Link href={href} className="inline-flex items-center">
      <Image
        src="/logos/Color logo - no background.png"
        alt="Blue Cover"
        height={heightMap[size]}
        width={heightMap[size] * 4}
        style={{ height: heightMap[size], width: "auto", objectFit: "contain" }}
        priority
      />
    </Link>
  );
}
