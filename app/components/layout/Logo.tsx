import Link from "next/link";

export default function Logo() {
  return (
    <Link href="">
      <img src="./logo.png" className="h-12 invert" />
    </Link>
  );
}
