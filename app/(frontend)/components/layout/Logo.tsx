import { Link } from "@/navigation";

type LogoProps = {
  src?: string;
  alt?: string;
};

export default function Logo({ src, alt = "Chaka" }: LogoProps) {
  const logoSrc = src || "/logo.png";

  return (
    <Link href="/home">
      <img src={logoSrc} alt={alt} className="h-12" />
    </Link>
  );
}
