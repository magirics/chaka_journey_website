import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/home">
      <img src="./logo.png" className="h-12 invert" />
    </Link>
  );
}
