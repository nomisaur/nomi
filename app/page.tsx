import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>hi</div>
      <Link href="/gungirl">
        Click here to read Gun Girl, a silly little book I'm writing
      </Link>
      <br />
      <Link href="/music/fractionpad">Click here to play with music</Link>
    </>
  );
}
