import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>hi. Click:</div>
      <Link href="/music/fractionpad">Fraction Pad</Link>
      <br />
      <Link href="/music/explorer">Explorer</Link>
    </>
  );
}
